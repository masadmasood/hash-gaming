"use client";

import * as React from "react";
import { Toaster as Sonner, toast } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      duration={3000}
      toastOptions={{
        duration: 3000,
        classNames: {
          toast:
            "group toast group-[.toaster]:!rounded-card group-[.toaster]:!border group-[.toaster]:!border-white/10 group-[.toaster]:!bg-[hsl(224_18%_12%)] group-[.toaster]:!text-foreground group-[.toaster]:!shadow-[0_24px_70px_-30px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.06)] group-[.toaster]:!backdrop-blur-xl",
          description: "group-[.toast]:!text-muted-foreground",
          actionButton:
            "group-[.toast]:!rounded-button group-[.toast]:!bg-foreground group-[.toast]:!text-background",
          cancelButton:
            "group-[.toast]:!rounded-button group-[.toast]:!bg-muted group-[.toast]:!text-muted-foreground",
          success: "group-[.toaster]:!bg-[hsl(166_28%_13%)] group-[.toaster]:!text-emerald-50",
          error: "group-[.toaster]:!bg-[hsl(350_28%_13%)] group-[.toaster]:!text-red-50",
          info: "group-[.toaster]:!bg-[hsl(220_24%_13%)] group-[.toaster]:!text-sky-50",
          warning: "group-[.toaster]:!bg-[hsl(35_28%_13%)] group-[.toaster]:!text-amber-50",
        },
      }}
      {...props}
    />
  );
};

export { Toaster, toast };
