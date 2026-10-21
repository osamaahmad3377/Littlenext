"use client";

import { usePathname } from "next/navigation";

/** Section links ("#divisions") point at the home page when used on another page ("/#divisions"). */
export function useNavHref() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  return {
    pathname,
    isHome,
    href: (href: string) => (href.startsWith("#") && !isHome ? `/${href}` : href),
  };
}
