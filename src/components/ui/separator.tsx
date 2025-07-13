// "use client" // si usas Next.js con Preact, si no, puedes omitirlo

import { forwardRef, type JSX } from "preact/compat";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
import { cn } from "@/utils/cn";

type SeparatorProps = JSX.IntrinsicElements["div"] & {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
};

const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  ({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border",
        orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        className
      )}
      {...props}
    />
  )
);

Separator.displayName = "Separator";

export { Separator };
