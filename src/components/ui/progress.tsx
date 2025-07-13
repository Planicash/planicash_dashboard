import { forwardRef, type JSX } from "preact/compat";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/utils/cn";

// Tipado compatible con Preact
type ProgressProps = JSX.IntrinsicElements["div"] & {
  value?: number;
};

const Progress = forwardRef<HTMLDivElement, ProgressProps>(({ className, value = 0, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    value={value}
    className={cn("relative h-4 w-full overflow-hidden rounded-full bg-secondary", className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - value}%)` }}
    />
  </ProgressPrimitive.Root>
));

Progress.displayName = "Progress";

export { Progress };
