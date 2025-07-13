import type { JSX } from "preact/jsx-runtime";
import { cn } from "@/utils/cn";

type DivProps = JSX.HTMLAttributes<HTMLDivElement>;
type HeadingProps = JSX.HTMLAttributes<HTMLHeadingElement>;
type ParagraphProps = JSX.HTMLAttributes<HTMLParagraphElement>;

// Card Container
export function Card(props: DivProps) {
  return (
    <div
      {...props}
      className={cn("card", props.className)}
    />
  );
}

// Card Header
export function CardHeader(props: DivProps) {
  return (
    <div
      {...props}
      className={cn("flex flex-col space-y-1.5 p-6", props.className)}
    />
  );
}

// Card Title
export function CardTitle(props: HeadingProps) {
  return (
    <h3
      {...props}
      className={cn("subtitle", props.className)}
    />
  );
}

// Card Description
export function CardDescription(props: ParagraphProps) {
  return (
    <p
      {...props}
      className={cn("text-sm text-muted-foreground", props.className)}
    />
  );
}

// Card Content
export function CardContent(props: DivProps) {
  return (
    <div
      {...props}
      className={cn("p-6 pt-0", props.className)}
    />
  );
}

// Card Footer
export function CardFooter(props: DivProps) {
  return (
    <div
      {...props}
      className={cn("flex items-center p-6 pt-0", props.className)}
    />
  );
}
