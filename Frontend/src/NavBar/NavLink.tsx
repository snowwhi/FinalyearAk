import { NavLink as RouterNavLink, type NavLinkProps } from "react-router-dom";
import { forwardRef } from "react";
import { cn } from "../lib/utils"; // Assuming this is your Tailwind merger

// Extend the original props but make our custom classes optional
interface NavLinkCompatProps extends Omit<NavLinkProps, "className"> {
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, ...props }, ref) => {
    return (
      <RouterNavLink
        {...props}
        ref={ref}
        className={({ isActive, isPending }) =>
          cn(
            "transition-all duration-300", // Global transition for the gold theme
            className, 
            isActive && activeClassName, 
            isPending && pendingClassName
          )
        }
      />
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };