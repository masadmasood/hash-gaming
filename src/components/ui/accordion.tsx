"use client";

import * as React from "react";
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

type AccordionValue = string | string[];

type AccordionProps = Omit<
  React.ComponentProps<typeof AccordionPrimitive.Root<string>>,
  "defaultValue" | "value" | "onValueChange" | "multiple"
> & {
  type?: "single" | "multiple";
  collapsible?: boolean;
  defaultValue?: AccordionValue;
  value?: AccordionValue;
  onValueChange?: (value: AccordionValue) => void;
};

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ type = "single", collapsible, defaultValue, value, onValueChange, ...props }, ref) => {
    void collapsible;
    const multiple = type === "multiple";
    const normalize = (nextValue: AccordionValue | undefined) =>
      Array.isArray(nextValue) ? nextValue : nextValue ? [nextValue] : undefined;

    return (
      <AccordionPrimitive.Root
        ref={ref}
        multiple={multiple}
        defaultValue={normalize(defaultValue)}
        value={normalize(value)}
        onValueChange={(nextValue) => onValueChange?.(multiple ? nextValue : nextValue[0] ?? "")}
        {...props}
      />
    );
  },
);
Accordion.displayName = "Accordion";

const AccordionItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("border-b", className)} {...props} />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-panel-open]>svg]:rotate-180 [&>svg]:transition-transform [&>svg]:duration-300 [&>svg]:ease-in-out",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof AccordionPrimitive.Panel>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Panel
    ref={ref}
    className="h-[var(--accordion-panel-height)] overflow-hidden text-sm opacity-100 transition-[height,opacity] duration-300 ease-in-out data-[ending-style]:h-0 data-[ending-style]:opacity-0 data-[starting-style]:h-0 data-[starting-style]:opacity-0"
    {...props}
  >
    <div className={cn("pb-4 pt-0 transition-opacity duration-300 ease-in-out", className)}>{children}</div>
  </AccordionPrimitive.Panel>
));
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
