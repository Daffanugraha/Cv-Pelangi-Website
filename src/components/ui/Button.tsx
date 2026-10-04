import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "whatsapp" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-cta-pill transition-all duration-300 rounded-full font-semibold cursor-pointer active:scale-95",
          {
            "bg-bracket-border text-on-primary hover:bg-primary shadow-[0_4px_14px_rgba(246,84,86,0.39)] hover:shadow-[0_6px_20px_rgba(246,84,86,0.65)]":
              variant === "primary",
            "border border-white/30 text-white hover:bg-white/20 hover:border-bracket-border":
              variant === "outline",
            "bg-action-whatsapp text-on-primary hover:bg-action-whatsapp-hover shadow-md":
              variant === "whatsapp",
            "hover:bg-surface-canvas/10 text-on-surface": variant === "ghost",
            "px-3 py-1.5 text-xs": size === "sm",
            "px-5 py-2.5 text-sm": size === "md",
            "px-6 py-3 text-base": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
