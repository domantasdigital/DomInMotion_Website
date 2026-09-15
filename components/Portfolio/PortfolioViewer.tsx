"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowsPointingOutIcon, ChevronLeftIcon, ChevronRightIcon, MagnifyingGlassMinusIcon, MagnifyingGlassPlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import type { PortfolioPiece } from "@/lib/portfolio";
import styles from "./Portfolio.module.css";

function ViewerMedia({ piece }: { piece: PortfolioPiece }) {
  const [zoom, setZoom] = useState(1);
  const [imageRatio, setImageRatio] = useState(16 / 9);
  const [mediaError, setMediaError] = useState(false);
  const [fullscreenError, setFullscreenError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  function changeZoom(value: number) {
    setZoom(value);
    if (value === 1) viewportRef.current?.scrollTo({ left: 0, top: 0 });
  }

  async function fullscreen() {
    const video = videoRef.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    if (!video) return;
    setFullscreenError(false);
    try {
      if (video.requestFullscreen) await video.requestFullscreen();
      else if (video.webkitEnterFullscreen) video.webkitEnterFullscreen();
      else setFullscreenError(true);
    } catch {
      setFullscreenError(true);
    }
  }

  return (
    <>
      <div className={styles.mediaTools}>
        <span>{piece.type === "video" ? "Press play to watch" : "Zoom in to explore the details"}</span>
        {piece.type === "image" ? (
          <div className={styles.zoomTools} role="group" aria-label="Image zoom controls">
            <button type="button" className={styles.iconButton} aria-label="Zoom out" disabled={zoom === 1 || mediaError} onClick={() => changeZoom(Math.max(1, zoom - 0.5))}><MagnifyingGlassMinusIcon aria-hidden="true" /></button>
            <button type="button" className={styles.zoomReset} aria-label="Reset zoom to 100 percent" onClick={() => changeZoom(1)}>{Math.round(zoom * 100)}%</button>
            <button type="button" className={styles.iconButton} aria-label="Zoom in" disabled={zoom === 3 || mediaError} onClick={() => changeZoom(Math.min(3, zoom + 0.5))}><MagnifyingGlassPlusIcon aria-hidden="true" /></button>
          </div>
        ) : (
          <button type="button" className={styles.fullscreenButton} onClick={fullscreen} disabled={mediaError}><ArrowsPointingOutIcon aria-hidden="true" />Fullscreen</button>
        )}
      </div>

      {piece.type === "video" ? (
        <div className={styles.videoStage}>
          <video
            ref={videoRef}
            src={piece.src}
            poster={piece.thumbnail || piece.preview || undefined}
            controls
            playsInline
            preload="metadata"
            aria-label={`${piece.title}. ${piece.alt}`}
            onError={() => setMediaError(true)}
          >Your browser does not support embedded video. <a href={piece.src}>Open the video</a>.</video>
        </div>
      ) : (
        <div ref={viewportRef} className={styles.imageViewport} style={{ aspectRatio: imageRatio }} data-zoom-viewport tabIndex={0} role="region" aria-label="Image viewer. When zoomed, scroll to explore the image.">
          <button
            type="button"
            className={styles.imageCanvas}
            style={{ width: `${zoom * 100}%`, height: `${zoom * 100}%`, cursor: zoom > 1 ? "zoom-out" : "zoom-in" }}
            onClick={() => changeZoom(zoom > 1 ? 1 : 2)}
            aria-label={zoom > 1 ? "Reset image zoom" : "Zoom image to 200 percent"}
            disabled={mediaError}
          >
            <Image src={piece.src} alt={piece.alt} fill sizes="100vw" unoptimized onLoad={(event) => setImageRatio(event.currentTarget.naturalWidth / event.currentTarget.naturalHeight)} onError={() => setMediaError(true)} />
          </button>
        </div>
      )}

      {piece.type === "image" && <span className={styles.srOnly} role="status">Image zoom: {Math.round(zoom * 100)} percent</span>}
      {(mediaError || fullscreenError) && <p className={styles.error} role="alert">{mediaError ? "This media couldn't load." : "Fullscreen isn't available here. Try the player's fullscreen control."} <a href={piece.src} target="_blank" rel="noreferrer">Open the original {piece.type === "video" ? "video" : "image"}</a>.</p>}
    </>
  );
}

type ViewerProps = {
  piece: PortfolioPiece;
  index: number;
  total: number;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
};

export default function PortfolioViewer({ piece, index, total, onClose, onPrevious, onNext }: ViewerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      opener?.focus({ preventScroll: true });
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby="portfolio-viewer-title"
      aria-describedby="portfolio-viewer-description"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose();
      }}
      onKeyDown={(event) => {
        // Leave native video seeking/volume and zoomed-image scrolling intact.
        if ((event.target as HTMLElement).closest("video, input, [data-zoom-viewport]")) return;
        if (event.key === "ArrowLeft" && index > 0) { event.preventDefault(); onPrevious(); }
        if (event.key === "ArrowRight" && index < total - 1) { event.preventDefault(); onNext(); }
      }}
    >
      <div className={styles.viewerHeader}>
        <div className={styles.viewerNavigation} role="group" aria-label="Browse portfolio pieces">
          <button type="button" className={styles.iconButton} aria-label="Previous piece" disabled={index === 0} onClick={onPrevious}><ChevronLeftIcon aria-hidden="true" /></button>
          <span aria-live="polite" aria-atomic="true">{index + 1} / {total}</span>
          <button type="button" className={styles.iconButton} aria-label="Next piece" disabled={index === total - 1} onClick={onNext}><ChevronRightIcon aria-hidden="true" /></button>
        </div>
        <button ref={closeRef} type="button" className={styles.closeButton} onClick={onClose}><span>Close</span><XMarkIcon aria-hidden="true" /></button>
      </div>

      <div className={styles.viewerBody}>
        <ViewerMedia key={piece.id} piece={piece} />

        <div className={styles.viewerDetails}>
          <div>
            <div className={styles.viewerTags}>{piece.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            <h3 id="portfolio-viewer-title">{piece.title}</h3>
          </div>
          <p id="portfolio-viewer-description">{piece.description}</p>
        </div>
      </div>
    </dialog>
  );
}
