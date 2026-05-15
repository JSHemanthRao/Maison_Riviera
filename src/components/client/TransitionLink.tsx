"use client";

import Link, { type LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import React, { type ReactNode, useCallback } from "react";

interface TransitionLinkProps extends Omit<LinkProps, "href"> {
  children: ReactNode;
  className?: string;
  href: string;
}

export default function TransitionLink({
  children,
  className,
  href,
  ...props
}: TransitionLinkProps) {
  const router = useRouter();

  const handleTransition = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();

      if (window.location.pathname === href) return;

      if (!document.startViewTransition) {
        router.push(href);
        return;
      }

      document.startViewTransition(() => {
        router.push(href);
      });
    },
    [href, router]
  );

  return (
    <Link className={className} href={href} onClick={handleTransition} {...props}>
      {children}
    </Link>
  );
}
