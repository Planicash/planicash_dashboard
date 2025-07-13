import type { JSX } from "preact/jsx-runtime";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white hover:bg-blue-700", // Botón principal fuerte y claro
        destructive: "bg-red-600 text-white hover:bg-red-700", // Rojo vivo y marcado
        outline: "border border-blue-500 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950", // Azul suave y limpio
        secondary: "bg-slate-200 text-slate-900 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600", // Buen contraste en ambos temas
        ghost: "text-slate-600 hover:bg-blue-100 dark:text-slate-400 dark:hover:bg-blue-950", // Ligeramente teñido
        link: "text-blue-600 hover:text-blue-700 underline underline-offset-4", // Estilo link tradicional mejorado
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type ButtonProps = {
  asChild?: boolean;
} & JSX.HTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp: any = asChild ? Slot : "button";
  return (
    <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />
  );
}
