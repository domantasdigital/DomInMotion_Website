"use client";

import { useEffect, useRef, useState } from "react";
import { PlayIcon } from "@heroicons/react/24/solid";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Introduction.module.css";

export default function Introduction() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playRef = useRef<HTMLButtonElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [playbackError, setPlaybackError] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const media = gsap.matchMedia();

    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        })
          .from("[data-intro-heading]", {
            y: 24,
            opacity: 0,
            duration: 0.55,
            ease: "power3.out",
          })
          .from("[data-intro-panel]", {
            y: 65,
            rotation: -3,
            scale: 0.94,
            opacity: 0,
            duration: 0.85,
            ease: "back.out(1.3)",
          }, "-=0.3")
          .from("[data-intro-sticker]", {
            scale: 0,
            rotation: -16,
            duration: 0.6,
            stagger: 0.12,
            ease: "back.out(2.5)",
          }, "-=0.4");
      }, sectionRef);

      return () => context.revert();
    });

    return () => media.revert();
  }, []);

  async function playIntroduction() {
    const video = videoRef.current;
    if (!video) return;

    setPlaybackError(false);

    try {
      await video.play();
    } catch {
      setPlaybackError(true);
    }
  }

  function handlePlay() {
    // Keep keyboard focus in the player when its launch button disappears.
    if (document.activeElement === playRef.current) {
      videoRef.current?.focus({ preventScroll: true });
    }
    setHasStarted(true);
    setPlaybackError(false);
  }

  return (
    <section
      ref={sectionRef}
      id="introduction"
      aria-labelledby="introduction-heading"
      className={styles.section}
    >
      <div className={styles.inner}>
        <div className={styles.heading} data-intro-heading>
          <h2 id="introduction-heading">Hello there!</h2>
          <p>A quick introduction before the projects</p>
        </div>

        <div className={styles.panel} data-intro-panel>
          <div className={styles.speechBubble} data-intro-sticker>
            Dom In Motion
          </div>

          <svg
            className={styles.spark}
            data-intro-sticker
            viewBox="0 0 100 100"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M50 5 60 34 87 15 72 43 96 52 69 61 84 89 57 73 46 97 39 69 10 82 28 57 4 43 34 38Z"
              fill="#30BCED"
              stroke="#311847"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
          </svg>

          <div className={styles.player}>
            <video
              ref={videoRef}
              className={styles.video}
              controls
              playsInline
              preload="none"
              poster="/images/introduction_thmbnail.png"
              aria-label="An introduction to Dom, the human behind DOM IN MOTION"
              tabIndex={0}
              onPlay={handlePlay}
              onError={() => setPlaybackError(true)}
            >
              <source src="/videos/introductions_animation.mp4" type="video/mp4" />
              Your browser does not support embedded video.{' '}
              <a href="/videos/introductions_animation.mp4">Watch the introduction.</a>
            </video>

          </div>

          <div className={styles.caption}>
            <span>Hello, my name is Domantas and I do 3D animation, 3D web integrations, motion design, video editing &amp; more.</span>
            <svg viewBox="0 0 66 18" fill="none" aria-hidden="true">
              <path d="m2 14 17-9-3 9L37 4l-4 10L63 3" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>

        {!hasStarted && (
          <div className={styles.playActions}>
            <button
              ref={playRef}
              type="button"
              className={styles.playButton}
              onClick={playIntroduction}
              aria-label="Play introduction video"
            >
              <PlayIcon aria-hidden="true" />
              <span>Meet Dom</span>
            </button>
          </div>
        )}

        {playbackError && (
          <p className={styles.error} role="alert">
            The video couldn’t play. Try the player controls or{' '}
            <a href="/videos/introductions_animation.mp4">open the video directly</a>.
          </p>
        )}
      </div>
    </section>
  );
}
