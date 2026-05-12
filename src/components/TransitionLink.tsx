"use client";

import Link, { LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

export const triggerPageTransition = () => {
  window.dispatchEvent(new Event("page-transition-start"));
};

interface TransitionLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
  href: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export default function TransitionLink({ children, href, className, onClick, ...props }: TransitionLinkProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleTransition = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    onClick?.(e);
    if (
      e.defaultPrevented ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      e.button !== 0
    ) {
      return;
    }

    const targetPathname = new URL(href, window.location.href).pathname;
    if (targetPathname === pathname) {
      return;
    }

    e.preventDefault();
    triggerPageTransition();

    setTimeout(() => {
      router.push(href);
    }, 420);
  };

  return (
    <Link href={href} className={className} onClick={handleTransition} {...props}>
      {children}
    </Link>
  );
}
