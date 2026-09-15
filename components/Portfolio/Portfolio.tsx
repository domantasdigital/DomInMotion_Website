"use client";

import { useCallback, useLayoutEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import { ArrowUpRightIcon, PhotoIcon, PlusIcon } from "@heroicons/react/24/outline";
import { PlayIcon } from "@heroicons/react/24/solid";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { portfolioPageSize, portfolioPieces, portfolioTags, type PortfolioPiece } from "@/lib/portfolio";
import PortfolioViewer from "./PortfolioViewer";
import styles from "./Portfolio.module.css";

const sortedPieces = [...portfolioPieces].sort((a, b) => b.priority - a.priority);
const tags = [...new Set([...portfolioTags, ...portfolioPieces.flatMap((piece) => piece.tags)])];

function Preview({ piece }: { piece: PortfolioPiece }) {
  const candidates = [...new Set([piece.thumbnail, piece.preview, piece.type === "image" ? piece.src : null].filter((src): src is string => Boolean(src)))];
  const [candidate, setCandidate] = useState(0);
  const [videoFailed, setVideoFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const src = candidates[candidate];

  // New videos without a supplied poster only request a frame near the viewport.
  useLayoutEffect(() => {
    const video = videoRef.current;
    if (!video || src || videoFailed) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        video.src = `${piece.src}#t=0.1`;
        observer.disconnect();
      }
    }, { rootMargin: "200px" });
    observer.observe(video);
    return () => observer.disconnect();
  }, [piece.src, src, videoFailed]);

  if (src) {
    return (
      <Image
        src={src}
        alt={piece.alt}
        fill
        sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
        // Catalog URLs may also be externally hosted custom thumbnails.
        unoptimized
        onError={() => setCandidate((index) => index + 1)}
      />
    );
  }

  if (piece.type === "video" && !videoFailed) {
    return <video ref={videoRef} muted playsInline preload="metadata" aria-label={piece.alt} onError={() => setVideoFailed(true)} />;
  }

  return <span className={styles.previewFallback}><PhotoIcon aria-hidden="true" />Preview unavailable<span>Open to view the original</span></span>;
}

export default function Portfolio() {
  const [filter, setFilter] = useState("All work");
  const [visibleCount, setVisibleCount] = useState(portfolioPageSize);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLUListElement>(null);
  const flipState = useRef<ReturnType<typeof Flip.getState> | null>(null);
  const cardRefs = useRef(new Map<string, HTMLButtonElement>());
  const pendingFocus = useRef<string | null>(null);

  const filteredPieces = useMemo(() => sortedPieces.filter((piece) => filter === "All work" || piece.tags.includes(filter)), [filter]);
  const visiblePieces = filteredPieces.slice(0, visibleCount);
  const selectedIndex = filteredPieces.findIndex((piece) => piece.id === selectedId);
  const selectedPiece = filteredPieces[selectedIndex];
  const hasMore = visibleCount < filteredPieces.length;
  const closeViewer = useCallback(() => setSelectedId(null), []);

  useLayoutEffect(() => {
    gsap.registerPlugin(Flip, ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.from(gridRef.current, {
          opacity: 0,
          scale: 0.985,
          duration: 0.65,
          ease: "power2.out",
          clearProps: "all",
          scrollTrigger: { trigger: gridRef.current, start: "top 92%", once: true },
        });
      }, sectionRef);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);

  useLayoutEffect(() => {
    let animation: gsap.core.Timeline | undefined;
    if (flipState.current) {
      animation = Flip.from(flipState.current, {
        targets: gridRef.current?.children,
        duration: 0.45,
        ease: "power2.inOut",
        stagger: 0.025,
        scale: true,
        onEnter: (elements) => gsap.fromTo(elements, { opacity: 0, scale: 0.94 }, { opacity: 1, scale: 1, duration: 0.35, stagger: 0.035, clearProps: "opacity,transform" }),
      });
      flipState.current = null;
    }
    if (pendingFocus.current) {
      const card = cardRefs.current.get(pendingFocus.current);
      card?.focus({ preventScroll: true });
      card?.scrollIntoView({ block: "nearest", behavior: "instant" });
      pendingFocus.current = null;
    }
    // The page's existing scroll-driven scenes must use the new section height.
    ScrollTrigger.refresh();
    return () => { animation?.kill(); };
  }, [filter, visibleCount]);

  function captureGrid() {
    if (gridRef.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      flipState.current = Flip.getState(gridRef.current.children);
    }
  }

  function selectFilter(tag: string) {
    if (tag === filter) return;
    captureGrid();
    setFilter(tag);
    setVisibleCount(portfolioPageSize);
  }

  function loadMore() {
    captureGrid();
    pendingFocus.current = filteredPieces[visibleCount]?.id ?? null;
    setVisibleCount((count) => count + portfolioPageSize);
  }

  return (
    <section ref={sectionRef} id="portfolio" aria-labelledby="portfolio-heading" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.heading}>
          <div className={styles.titleWrap}>
            <h2 id="portfolio-heading">Portfolio</h2>
            <svg className={styles.headingMark} viewBox="0 0 120 34" fill="none" aria-hidden="true">
              <path d="m4 22 28-13-9 19L60 6l-8 20L90 8l-8 19 33-13" stroke="currentColor" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <p>From playful 3D worlds to the final cut.<br />Pick a piece. Take a closer look.</p>
        </div>

        <div className={styles.filters} role="group" aria-label="Filter portfolio by tag">
          {["All work", ...tags].map((tag, index) => {
            const count = tag === "All work" ? sortedPieces.length : sortedPieces.filter((piece) => piece.tags.includes(tag)).length;
            return (
              <button
                key={tag}
                type="button"
                className={styles.filter}
                style={{ "--tag-color": ["#FFE74C", "#47E5BC", "#FF5376", "#30BCED", "#FFE74C", "#47E5BC"][index % 6] } as CSSProperties}
                aria-pressed={filter === tag}
                aria-controls="portfolio-grid"
                onClick={() => selectFilter(tag)}
              >
                {tag}<span aria-hidden="true">{count}</span>
              </button>
            );
          })}
        </div>

        <ul ref={gridRef} id="portfolio-grid" className={styles.grid} aria-label={`${filter} portfolio pieces`}>
          {visiblePieces.map((piece) => (
            <li key={piece.id} data-flip-id={piece.id} className={styles.gridItem}>
              <button
                ref={(node) => { if (node) cardRefs.current.set(piece.id, node); else cardRefs.current.delete(piece.id); }}
                type="button"
                className={styles.card}
                aria-label={`Open ${piece.type === "video" ? "video" : "image"}: ${piece.title}`}
                aria-haspopup="dialog"
                onClick={() => setSelectedId(piece.id)}
              >
                <span className={styles.media}>
                  <Preview piece={piece} />
                  <span className={styles.mediaBadge} aria-hidden="true">
                    {piece.type === "video" ? <PlayIcon /> : <PhotoIcon />}
                    <span>{piece.type === "video" ? "Video" : "Image"}</span>
                  </span>
                  <span className={styles.openHint} aria-hidden="true"><ArrowUpRightIcon /></span>
                </span>
                <span className={styles.cardCaption}>
                  <span className={styles.cardTitle}>{piece.title}</span>
                  <span className={styles.cardTags}>{piece.tags.join(" / ")}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>

        {filteredPieces.length === 0 && <p className={styles.empty}>No pieces with this tag yet. Choose another tag to explore the work.</p>}

        <div className={styles.footer}>
          <p role="status" aria-live="polite" aria-atomic="true">Showing {Math.min(visibleCount, filteredPieces.length)} of {filteredPieces.length} pieces{filter !== "All work" ? ` in ${filter}` : ""}</p>
          {hasMore && <button type="button" className={styles.loadMore} onClick={loadMore} aria-controls="portfolio-grid"><PlusIcon aria-hidden="true" />Load more<span className={styles.loadCount}>+{Math.min(portfolioPageSize, filteredPieces.length - visibleCount)}</span></button>}
          {!hasMore && filteredPieces.length > 0 && <span className={styles.endNote}>You&apos;re all caught up.</span>}
        </div>
      </div>

      {selectedPiece && (
        <PortfolioViewer
          piece={selectedPiece}
          index={selectedIndex}
          total={filteredPieces.length}
          onClose={closeViewer}
          onPrevious={() => setSelectedId(filteredPieces[selectedIndex - 1]?.id ?? selectedId)}
          onNext={() => setSelectedId(filteredPieces[selectedIndex + 1]?.id ?? selectedId)}
        />
      )}
    </section>
  );
}
