"use client";

import type { ComponentProps } from "react";
import Link from "next/link";

type SectionLinkProps = Omit<ComponentProps<typeof Link>, "href" | "onNavigate"> & {
  href: string;
};

export default function SectionLink({ href, ...props }: SectionLinkProps) {
  return (
    <Link
      {...props}
      href={href}
      onNavigate={(event) => {
        const url = new URL(href, window.location.href);
        if (
          url.pathname !== window.location.pathname ||
          url.search !== window.location.search
        ) return;

        const section = document.getElementById(decodeURIComponent(url.hash.slice(1)));
        if (!section) return;

        // Keep same-page navigation out of the router's instant scroll handling.
        event.preventDefault();
        if (window.location.hash !== url.hash) {
          window.history.pushState(null, "", url.href);
        }
        section.scrollIntoView({
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "instant"
            : "smooth",
          block: "start",
        });
      }}
    />
  );
}
