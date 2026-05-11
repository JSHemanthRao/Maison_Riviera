"use client";

import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export const triggerPageTransition = () => {
  window.dispatchEvent(new Event("page-transition-start"));
};

interface TransitionLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
  href: string;
}

export default function TransitionLink({ children, href, className, ...props }: TransitionLinkProps) {
  const router = useRouter();

  const handleTransition = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    
    // Trigger the exit curtain
    triggerPageTransition();
    
    // Wait for the curtain to cover the screen, then navigate
    setTimeout(() => {
      router.push(href);
    }, 600); // 600ms matches the curtain animation duration
  };

  return (
    <Link href={href} className={className} onClick={handleTransition} {...props}>
      {children}
    </Link>
  );
}
