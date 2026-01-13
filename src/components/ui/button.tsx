import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        // Premium gold variants
        gold: "bg-gradient-to-r from-[hsl(43,56%,38%)] via-[hsl(43,74%,52%)] to-[hsl(43,56%,38%)] text-background font-semibold tracking-wide shadow-gold hover:shadow-[0_0_60px_hsla(43,74%,52%,0.25)] hover:scale-[1.02] active:scale-[0.98]",
        goldOutline: "border-2 border-[hsl(43,74%,52%)] bg-transparent text-[hsl(43,74%,52%)] font-semibold tracking-wide hover:bg-[hsl(43,74%,52%)] hover:text-background hover:shadow-[0_0_20px_hsla(43,74%,52%,0.4)] transition-all duration-300",
        hero: "border border-[hsl(43,74%,52%)]/60 bg-transparent text-[hsl(43,74%,52%)] font-medium tracking-widest uppercase text-xs px-8 py-4 hover:bg-[hsl(43,74%,52%)] hover:text-background hover:border-[hsl(43,74%,52%)] hover:shadow-[0_0_20px_hsla(43,74%,52%,0.4)] transition-all duration-500",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-14 rounded-md px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
