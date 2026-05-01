"use client";

import * as React from "react";
import { Slider as SliderPrimitive } from "@base-ui/react/slider";

import { cn } from "@/lib/utils";

type SliderProps = React.ComponentProps<typeof SliderPrimitive.Root<number | readonly number[]>>;

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ className, value, defaultValue, min = 0, max = 100, ...props }, ref) => {
    const rawValue = value ?? defaultValue ?? [min];
    const values = Array.isArray(rawValue) ? rawValue : [rawValue];

    return (
      <SliderPrimitive.Root
        ref={ref}
        value={value}
        defaultValue={defaultValue}
        min={min}
        max={max}
        className={cn("relative flex w-full touch-none select-none items-center", className)}
        {...props}
      >
        <SliderPrimitive.Control className="relative flex h-5 w-full items-center">
          <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
            <SliderPrimitive.Indicator className="absolute h-full bg-primary" />
          </SliderPrimitive.Track>
          {values.map((_, index) => (
            <SliderPrimitive.Thumb
              key={index}
              index={index}
              className="block h-5 w-5 rounded-full border-2 border-primary bg-background outline-none transition-colors focus:outline-none focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-foreground/55 disabled:pointer-events-none disabled:opacity-50"
            />
          ))}
        </SliderPrimitive.Control>
      </SliderPrimitive.Root>
    );
  },
);
Slider.displayName = "Slider";

export { Slider };