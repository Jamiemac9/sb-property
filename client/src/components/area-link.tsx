import { Link } from "wouter";
import type { ReactNode } from "react";

interface AreaLinkProps {
  slug: string;
  children: ReactNode;
  className?: string;
}

export default function AreaLink({ slug, children, className = "" }: AreaLinkProps) {
  return (
    <Link
      href={`/areas/${slug}`}
      className={`font-semibold text-brand-green underline decoration-brand-green/40 underline-offset-2 hover:text-brand-green-light hover:decoration-brand-green-light transition-colors ${className}`}
    >
      {children}
    </Link>
  );
}