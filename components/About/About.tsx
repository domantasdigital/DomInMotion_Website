"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import portrait from "@/public/images/aboutmephotopng.png";
import styles from "./About.module.css";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        })
          .from("[data-about-title]", {
            x: -35,
            rotation: -4,
            opacity: 0,
            duration: 0.6,
            clearProps: "transform,opacity",
          })
          .from("[data-about-portrait]", {
            y: 55,
            rotation: -9,
            scale: 0.92,
            opacity: 0,
            duration: 0.85,
            ease: "back.out(1.4)",
            clearProps: "transform,opacity",
          }, "-=0.35")
          .from("[data-about-bubble]", {
            scale: 0,
            rotation: 14,
            duration: 0.5,
            ease: "back.out(2.5)",
            clearProps: "transform",
          }, "-=0.4")
          .from("[data-about-copy]", {
            opacity: 0,
            x: 25,
            duration: 0.65,
            clearProps: "transform,opacity",
          }, "-=0.7")
          .from("[data-about-spark]", {
            scale: 0,
            rotation: -90,
            duration: 0.5,
            ease: "back.out(2)",
            clearProps: "transform",
          }, "-=0.25");

        // The toolkit gets its own trigger so it reveals in view on phones too.
        gsap.from("[data-about-tool]", {
          "--highlight-scale": 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: "[data-about-toolkit]",
            start: "top 85%",
            once: true,
          },
        });
      }, sectionRef);

      return () => context.revert();
    });

    return () => media.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      aria-labelledby="about-heading"
      className={styles.section}
    >
      <div className={styles.inner}>
        <h2 id="about-heading" className={styles.heading} data-about-title>
          About me<span aria-hidden="true">.</span>
        </h2>

        <div className={styles.layout}>
          <div className={styles.portraitWrap}>
            <figure className={styles.portrait} data-about-portrait>
              <div className={styles.photo}>
                <Image
                  src={portrait}
                  alt="Domantas smiling, in a black polo shirt against a colorful mint and pink background"
                  fill
                  sizes="(max-width: 600px) 90vw, (max-width: 960px) 440px, 40vw"
                  placeholder="blur"
                />
              </div>
              <figcaption className={styles.caption}>
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
                  <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="2" />
                </svg>
                Lithuania, Europe
              </figcaption>
            </figure>

            <span className={styles.bubble} data-about-bubble>
              blender is my passion!
            </span>

            <svg className={styles.spark} data-about-spark viewBox="0 0 110 110" aria-hidden="true">
              <path d="m55 5 10 28 26-17-12 28 26 11-28 10 17 26-29-12-10 26-10-28-26 17 12-29L5 55l28-10-17-26 28 12Z" fill="currentColor" stroke="#311847" strokeWidth="3" strokeLinejoin="round" />
              <path d="m45 55 7 8 15-19" fill="none" stroke="#311847" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div className={styles.story}>
            <div className={styles.copy} data-about-copy>
              <p className={styles.lead}>
                Hey, my name is <strong>Domantas</strong>, and I work in 3D
                animation, 3D web integration, motion design, and video editing.
              </p>

              <p>
                I&apos;m from <strong>Lithuania, Europe</strong>, and my visual
                production journey started when I was just a kid. I still
                remember watching countless After Effects{" "}
                tutorials, trying to replicate Hollywood VFX in my own bedroom —
                fun times! Alongside that, I studied business and marketing, so I
                bring both creative and strategic thinking to every project.
              </p>
            </div>

            <div className={styles.toolkit} data-about-toolkit>
              <p>
                My main toolkit includes{" "}
                <span className={`${styles.tool} ${styles.mint}`} data-about-tool>Blender</span>,{" "}
                <span className={`${styles.tool} ${styles.sky}`} data-about-tool>React Three Fiber (Three.js)</span>,{" "}
                <span className={`${styles.tool} ${styles.coral}`} data-about-tool>After Effects</span>,{" "}
                <span className={`${styles.tool} ${styles.sun}`} data-about-tool>DaVinci Resolve</span>,{" "}
                and more — a well-rounded production stack.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
