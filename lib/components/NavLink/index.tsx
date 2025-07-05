"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentProps, PropsWithChildren, useMemo } from "react";

type NavLinkProps = ComponentProps<typeof Link> & {
  activeClassName?: string;
  inactiveClassName?: string;
  exact?: boolean;
};

export function NavLink({
  href,
  activeClassName = "text-primary",
  inactiveClassName = "",
  exact = false,
  className,
  children,
  ...linkProps
}: PropsWithChildren<NavLinkProps>) {
  const pathname = usePathname();

  // determine active state
  const isActive = useMemo(() => {
    // Special case for home route "/"
    if (href === "/") {
      // Check if pathname is exactly "/en" or "/ar" or "/" (root)
      return (
        pathname === "/" ||
        pathname === "/en" ||
        pathname === "/ar" ||
        // Check if it's a language root like "/en/" or "/ar/"
        pathname === "/en/" ||
        pathname === "/ar/"
      );
    }

    // For other routes, strip out the language prefix for comparison
    const pathnameWithoutLang = pathname.replace(/^\/([a-z]{2})(?:\/|$)/, "/");

    if (exact) {
      return pathnameWithoutLang === href;
    }

    // Check if current path starts with the href
    return pathnameWithoutLang === href || pathnameWithoutLang.startsWith(`${href}/`);
  }, [pathname, href, exact]);
  return (
    <Link
      href={href}
      className={clsx("link link-hover", className, { [inactiveClassName]: !isActive, [activeClassName]: isActive })}
      {...linkProps}
    >
      {children}
    </Link>
  );
}
