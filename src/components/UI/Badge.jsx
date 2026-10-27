/**
 * Badge.jsx
 * Reusable badge / pill component.
 * Variants: default (primary), secondary, destructive, outline.
 */

const variantClasses = {
  default: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  destructive: "bg-destructive text-destructive-foreground",
  outline: "border border-border text-foreground bg-transparent",
};

export default function Badge({ children, variant = "default", className = "" }) {
  const base = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors";
  return (
    <span className={`${base} ${variantClasses[variant] || variantClasses.default} ${className}`}>
      {children}
    </span>
  );
}
