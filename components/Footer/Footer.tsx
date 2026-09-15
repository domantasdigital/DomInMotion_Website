import { ArrowUpIcon, ArrowUpRightIcon } from "@heroicons/react/24/outline";
import SocialLinks from "@/components/SocialLinks/SocialLinks";
import SectionLink from "@/components/SectionLink/SectionLink";
import styles from "./Footer.module.css";

function StarSticker() {
  return (
    <div className={styles.sticker} aria-hidden="true">
      <svg viewBox="0 0 220 200" fill="none" className={styles.star}>
        <path d="m18 63 24 9M10 93h26m-14 30 20-9" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
        <path d="m117 13 24 46 51-1-31 41 17 49-49-15-41 32-1-51-43-28 49-16Z" fill="#311847" stroke="#311847" strokeWidth="10" strokeLinejoin="round" transform="translate(5 7)" />
        <path d="m117 13 24 46 51-1-31 41 17 49-49-15-41 32-1-51-43-28 49-16Z" fill="#FFE74C" stroke="#311847" strokeWidth="3" strokeLinejoin="round" />
        <g stroke="#311847" strokeWidth="4" strokeLinecap="round">
          <path d="m110 78-2 10m26-12-2 10" />
          <path d="M108 102q11 19 25-1" />
        </g>
        <ellipse cx="99" cy="96" rx="7" ry="4" fill="#FF5376" transform="rotate(-8 99 96)" />
        <ellipse cx="143" cy="94" rx="7" ry="4" fill="#FF5376" transform="rotate(-8 143 94)" />
        <path d="m180 24 3-12m10 22 12-4M61 145l-8 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <span className={styles.stickerLabel}>That&apos;s a wrap!</span>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className={styles.footer} aria-label="Site footer">
      <svg className={styles.edge} viewBox="0 0 1440 40" preserveAspectRatio="none" fill="none" aria-hidden="true">
        <path d="M-5 19Q85-9 180 19T360 19T540 19T720 19T900 19T1080 19T1260 19T1445 19V42H-5Z" fill="#47E5BC" />
        <path d="M-5 19Q85-9 180 19T360 19T540 19T720 19T900 19T1080 19T1260 19T1445 19" stroke="#311847" strokeWidth="3" />
      </svg>

      <div className={styles.inner}>
        <div className={styles.top}>
          <div className={styles.intro}>
            <h2>Good ideas<br />keep moving.</h2>
            <p>3D animation, motion design &amp; video editing.</p>
            <a className={styles.contact} href="mailto:domantasdigital@gmail.com">
              Say hello <ArrowUpRightIcon aria-hidden="true" />
            </a>
          </div>

          <nav className={styles.navigation} aria-label="Footer navigation">
            <SectionLink href="/#portfolio">The work</SectionLink>
            <SectionLink href="/#about">About me</SectionLink>
            <SectionLink href="/#contact">Let&apos;s talk</SectionLink>
          </nav>

          <div className={styles.socialColumn}>
            <StarSticker />
            <SocialLinks className={styles.socials} />
          </div>
        </div>

        <SectionLink className={styles.wordmark} href="/#home" aria-label="DOM IN MOTION home">
          DOM IN MOTION<span className={styles.wordmarkDot} aria-hidden="true">✦</span>
        </SectionLink>

        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} DOM IN MOTION</p>
          <a className={styles.backToTop} href="#top">Back to top <span><ArrowUpIcon aria-hidden="true" /></span></a>
        </div>
      </div>
    </footer>
  );
}
