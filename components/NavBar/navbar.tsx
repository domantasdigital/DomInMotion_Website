"use client";

import { useEffect, useState } from "react";
import {
  ArrowLongRightIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import SocialLinks from "@/components/SocialLinks/SocialLinks";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

const Logo = () => (
  <svg
    width="46"
    height="77"
    viewBox="0 0 46 77"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="h-11 w-auto lg:h-12"
  >
    <path
      d="M1.26562 55V46.9141H5.01562V25.7734H1.26562V17.6875H18.2812C25.2031 17.6875 30.4688 19.2812 34.0781 22.4688C37.6875 25.6406 39.4922 30.2812 39.4922 36.3906C39.4922 42.4844 37.6953 47.1094 34.1016 50.2656C30.5078 53.4219 25.2266 55 18.2578 55H1.26562ZM17.2031 47.1484H18.4922C21.2422 47.1484 23.2109 46.3203 24.3984 44.6641C25.5859 42.9922 26.1797 40.2109 26.1797 36.3203C26.1797 32.4453 25.5859 29.6797 24.3984 28.0234C23.2109 26.3672 21.2422 25.5391 18.4922 25.5391H17.2031V47.1484Z"
      fill="black"
    />
    <circle cx="37" cy="21" r="9" fill="#FF335C" />
  </svg>
);

const LetsCreateLink = ({ onClick }: { onClick?: () => void }) => (
  <a
    href="#contact"
    onClick={onClick}
    className="group inline-flex items-center gap-3 rounded-full bg-black px-4 py-2.5 text-[0.64rem] font-bold uppercase tracking-[0.3em] text-white transition duration-300 hover:bg-coral focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral sm:px-6 sm:text-[0.7rem] lg:px-7"
  >
    <span>Let&apos;s create!</span>
    <ArrowLongRightIcon className="h-6 w-6 transition duration-300 group-hover:translate-x-1" />
  </a>
);

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <nav
        aria-label="Primary navigation"
        className={`relative z-[120] font-sans font-bold transition-all duration-500 ${
          isScrolled
            ? "bg-white shadow-[0_18px_70px_rgba(49,24,71,0.18)] ring-1 ring-white/70 backdrop-blur-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto grid h-16 w-full grid-cols-[auto_1fr_auto] items-center gap-3 px-6 sm:h-[4.5rem] sm:px-10 lg:h-20 lg:grid-cols-[1fr_auto_1fr] lg:px-11">
          <a
            href="#home"
            aria-label="DOM IN MOTION home"
            className="inline-flex w-fit items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral"
            onClick={() => setIsOpen(false)}
          >
            <Logo />
          </a>

          <div className="hidden items-center gap-12 justify-self-center lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-bold uppercase tracking-[0.12em] text-black decoration-2 underline-offset-4 transition duration-300 hover:text-coral hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="justify-self-end lg:hidden">
            <LetsCreateLink onClick={() => setIsOpen(false)} />
          </div>

          <div className="hidden justify-self-end lg:block">
            <LetsCreateLink />
          </div>

          <button
            type="button"
            aria-label={
              isOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsOpen((open) => !open)}
            className="relative grid h-11 w-11 place-items-center justify-self-end text-black transition hover:text-coral focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral lg:hidden"
          >
            <Bars3Icon
              className={`absolute h-9 w-9 transition duration-300 ${
                isOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
              }`}
            />
            <XMarkIcon
              className={`absolute h-9 w-9 transition duration-300 ${
                isOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
              }`}
            />
          </button>
        </div>
      </nav>

      <div
        id="mobile-navigation"
        className={`fixed inset-0 z-[110] h-dvh overflow-y-auto bg-[radial-gradient(circle_at_50%_22%,rgba(223,217,232,0.94)_0%,rgba(186,176,202,0.94)_68%)] px-6 pt-20 font-sans font-bold backdrop-blur-2xl transition duration-500 sm:px-10 sm:pt-24 lg:hidden ${
          isOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-6 opacity-0"
        }`}
      >
        <div className="flex min-h-full flex-col">
          <div className="flex min-h-0 flex-1 flex-col justify-center gap-[clamp(0.65rem,2.5vh,2rem)] py-4 text-[clamp(2.15rem,min(10vw,8vh),4.5rem)]">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="uppercase leading-[0.95] tracking-[0.12em] text-black decoration-[0.12em] underline-offset-[0.14em] transition duration-300 hover:translate-x-3 hover:text-coral hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral"
              >
                {item.label}
              </a>
            ))}
          </div>

          <SocialLinks
            onLinkClick={() => setIsOpen(false)}
            className="flex shrink-0 items-center gap-6 border-t-2 border-black/15 py-5 text-base font-bold"
          />
        </div>
      </div>
    </>
  );
}
