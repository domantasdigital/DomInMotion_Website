"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import contactArtwork from "@/public/images/7.png";
import styles from "./Contact.module.css";

const contactLinks = [
  {
    name: "WhatsApp",
    detail: "+370 679 49742",
    href: "https://wa.me/37067949742",
    style: "whatsapp",
    icon: "M20.5 11.7a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.4-5a8.4 8.4 0 1 1 16.1-3.8Z M8.1 7.5c-.6.4-.8 1.3-.4 2.3 1 2.8 3.1 4.8 5.9 5.7 1 .3 1.9-.1 2.3-.8l.3-1-2.5-1.2-.9 1c-1.5-.6-2.6-1.7-3.2-3.1l.8-.9-1.1-2.3Z",
  },
  {
    name: "LinkedIn",
    detail: "Let’s connect",
    href: "https://www.linkedin.com/in/domantas-dzikavi%C4%8Dius-203175273/",
    style: "linkedin",
    icon: "M5 9v11 M5 4v.5 M10 20V9h4v1.5c1.5-2.5 6-2.3 6 2.5v7 M14 20v-7",
  },
  {
    name: "Upwork",
    detail: "Let’s work together",
    href: "https://www.upwork.com/freelancers/~015a3d27b3da76ee2f",
    style: "upwork",
    icon: "M3 7v6a4 4 0 0 0 8 0V7c1 4 3 8 6.5 8A3.5 3.5 0 1 0 14 11.5L11 21",
  },
];

export default function Contact({ standalone = false }: { standalone?: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const artworkRef = useRef<HTMLDivElement>(null);
  const Heading = standalone ? "h1" : "h2";

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        })
          .from("[data-contact-heading]", {
            yPercent: 110,
            rotation: 5,
            duration: 0.8,
            stagger: 0.1,
            clearProps: "transform",
          })
          .from("[data-contact-art]", {
            scale: 0.8,
            rotation: -10,
            opacity: 0,
            duration: 1,
            ease: "back.out(1.5)",
            clearProps: "transform,opacity",
          }, "<")
          .from("[data-contact-bubble]", {
            scale: 0,
            rotation: -20,
            duration: 0.55,
            ease: "back.out(2.5)",
            clearProps: "transform",
          }, "-=0.35")
          .from("[data-contact-spark]", {
            scale: 0,
            rotation: -100,
            duration: 0.5,
            ease: "back.out(2)",
            clearProps: "transform",
          }, "<");

        gsap.from("[data-contact-channels]", {
          opacity: 0,
          y: 24,
          duration: 0.65,
          clearProps: "transform,opacity",
          scrollTrigger: {
            trigger: "[data-contact-channels]",
            start: "top 92%",
            once: true,
          },
        });
      }, sectionRef);

      return () => context.revert();
    });

    media.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const artwork = artworkRef.current;
      if (!artwork) return;

      const context = gsap.context(() => {
        const rotateX = gsap.quickTo(artwork, "rotationX", { duration: 0.6, ease: "power2.out" });
        const rotateY = gsap.quickTo(artwork, "rotationY", { duration: 0.6, ease: "power2.out" });
        const onMove = (event: PointerEvent) => {
          const bounds = artwork.getBoundingClientRect();
          rotateX(-((event.clientY - bounds.top) / bounds.height - 0.5) * 10);
          rotateY(((event.clientX - bounds.left) / bounds.width - 0.5) * 10);
        };
        const onLeave = () => { rotateX(0); rotateY(0); };

        artwork.addEventListener("pointermove", onMove);
        artwork.addEventListener("pointerleave", onLeave);
        return () => {
          artwork.removeEventListener("pointermove", onMove);
          artwork.removeEventListener("pointerleave", onLeave);
        };
      }, sectionRef);

      return () => context.revert();
    });

    return () => media.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      aria-labelledby="contact-heading"
      className={`${styles.section} ${standalone ? styles.standalone : ""}`}
    >
      <div className={styles.inner}>
        <div className={styles.layout}>
          <div className={styles.intro}>
            <Heading id="contact-heading" className={styles.heading}>
              <span className={styles.headingLine}><span data-contact-heading>Let&apos;s</span></span>
              <span className={styles.headingLine}><span data-contact-heading>talk!</span></span>
            </Heading>
            <p className={styles.description}>
              Got an idea that needs a little motion?<br />
              Tell me what you have in mind. Let&apos;s make it happen.
            </p>
          </div>

          <div className={styles.artworkWrap}>
            <div className={styles.artworkEntrance} data-contact-art>
              <div className={styles.artwork} ref={artworkRef}>
                <Image
                  src={contactArtwork}
                  alt="A bright red rotary telephone with glass CONTACT lettering on a turquoise background"
                  sizes="(max-width: 760px) 90vw, (max-width: 1280px) 45vw, 550px"
                  placeholder="blur"
                  preload={standalone}
                  draggable={false}
                  className={styles.photo}
                />
                <div className={styles.artworkCaption}>
                  <span>Good things start with a hello.</span>
                  <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
                    <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="2" />
                    <path d="M10 18c2 7 10 7 12 0M11 10v3m10-3v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>
            <span className={styles.bubble} data-contact-bubble aria-hidden="true">Ring, ring!</span>
            <svg className={styles.spark} data-contact-spark viewBox="0 0 100 100" aria-hidden="true">
              <path d="m50 4 10 27 26-17-13 28 23 8-27 10 17 26-28-13-8 23-10-27-26 17 13-28L4 50l27-10-17-26 28 13Z" fill="currentColor" stroke="#311847" strokeWidth="2.5" strokeLinejoin="round" />
            </svg>
          </div>

          <div className={styles.channels} data-contact-channels>
            <a className={styles.email} href="mailto:domantasdigital@gmail.com">
              <span className={styles.emailTop}>
                <EnvelopeIcon aria-hidden="true" />
                <span>Drop me an email</span>
                <ArrowUpRightIcon className={styles.arrow} aria-hidden="true" />
              </span>
              <span className={styles.emailAddress}>domantasdigital@gmail.com</span>
            </a>

            <p className={styles.channelPrompt}>Or say hello your way</p>

            <ul className={styles.linkList}>
              {contactLinks.map((link) => (
                <li key={link.name}>
                  <a className={`${styles.contactLink} ${styles[link.style]}`} href={link.href} target="_blank" rel="noopener noreferrer">
                    <span className={styles.channelIcon}>
                      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d={link.icon} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span className={styles.channelName}>{link.name}</span>
                    <span className={styles.channelDetail}>{link.detail}</span>
                    <ArrowUpRightIcon className={styles.arrow} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
            <p className={styles.signoff}>From Lithuania, with imagination. Working worldwide.</p>
          </div>
        </div>

        <footer className={styles.footer}>
          <Link href="/#home" className={styles.wordmark} aria-label="DOM IN MOTION home">DOM IN MOTION<span aria-hidden="true">✦</span></Link>
          <p>3D animation. Motion design. Video editing.</p>
          <Link href="/#portfolio" className={styles.portfolioLink}>Take a look at my work <ArrowUpRightIcon aria-hidden="true" /></Link>
        </footer>
      </div>
    </section>
  );
}
