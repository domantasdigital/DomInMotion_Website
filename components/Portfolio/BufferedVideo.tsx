"use client";

import { useEffect, useState, type RefObject } from "react";
import { PlayIcon } from "@heroicons/react/24/solid";
import type { PortfolioPiece } from "@/lib/portfolio";
import styles from "./Portfolio.module.css";

const STARTUP_BUFFER_SECONDS = 5;

type BufferedVideoProps = {
  piece: PortfolioPiece;
  videoRef: RefObject<HTMLVideoElement | null>;
  onError: () => void;
};

export default function BufferedVideo({ piece, videoRef, onError }: BufferedVideoProps) {
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [started, setStarted] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [canStartEarly, setCanStartEarly] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // Restore the source after React's development effect cleanup/replay.
    if (video.getAttribute("src") !== piece.src) video.src = piece.src;

    function checkBuffer() {
      if (!video || video.error) return;
      const target = Number.isFinite(video.duration)
        ? Math.min(STARTUP_BUFFER_SECONDS, video.duration - video.currentTime)
        : STARTUP_BUFFER_SECONDS;
      let ahead = 0;
      // Seeking can produce disjoint ranges; only count the current range.
      for (let index = 0; index < video.buffered.length; index++) {
        if (video.buffered.start(index) <= video.currentTime + 0.05 && video.buffered.end(index) > video.currentTime) {
          ahead = video.buffered.end(index) - video.currentTime;
          break;
        }
      }
      setProgress(target > 0 ? Math.min(100, Math.round(ahead / target * 100)) : 0);
      if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA && target > 0 && ahead >= target - 0.1) {
        setReady(true);
      }
    }

    const events = ["progress", "loadedmetadata", "loadeddata", "canplay", "canplaythrough", "suspend"];
    events.forEach((event) => video.addEventListener(event, checkBuffer));
    checkBuffer();
    // Some mobile/data-saving browsers ignore preload until a user presses play.
    const fallback = window.setTimeout(() => setCanStartEarly(true), 8000);

    return () => {
      window.clearTimeout(fallback);
      events.forEach((event) => video.removeEventListener(event, checkBuffer));
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [piece.src, videoRef]);

  async function play() {
    const video = videoRef.current;
    if (!video) return;
    setStarted(true);
    setWaiting(video.readyState < HTMLMediaElement.HAVE_FUTURE_DATA);
    try {
      await video.play();
    } catch {
      // A browser may require another direct tap after an interrupted play request.
      if (video.isConnected && !video.error) {
        setStarted(false);
        setWaiting(false);
        setCanStartEarly(true);
      }
    }
  }

  const loading = !failed && ((!started && !ready) || waiting);

  return (
    <div className={styles.videoStage} aria-busy={loading}>
      <video
        ref={videoRef}
        src={piece.src}
        poster={piece.thumbnail || piece.preview || undefined}
        controls={started}
        playsInline
        preload="auto"
        aria-label={`${piece.title}. ${piece.alt}`}
        onPlay={() => setStarted(true)}
        onPlaying={() => setWaiting(false)}
        onWaiting={() => setWaiting(true)}
        onSeeking={(event) => { if (!event.currentTarget.paused) setWaiting(true); }}
        onSeeked={(event) => { if (event.currentTarget.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) setWaiting(false); }}
        onPause={() => setWaiting(false)}
        onEnded={() => setWaiting(false)}
        onError={() => { setFailed(true); setWaiting(false); onError(); }}
      >Your browser does not support embedded video. <a href={piece.src}>Open the video</a>.</video>

      {!failed && (!started || waiting) && (
        <div className={styles.videoOverlay}>
          <div className={styles.videoPrompt}>
            {loading ? (
              <>
                <span className={styles.videoLoader} aria-hidden="true"><span /><span /><span /></span>
                <p role="status">{started ? "Buffering video…" : "Getting your video ready…"}</p>
                {!started && <>
                  <progress className={styles.videoProgress} value={progress} max={100} aria-label="Video startup buffer" />
                  <span className={styles.videoHint}>Loading a few seconds ahead for smoother playback.</span>
                </>}
              </>
            ) : <p>Ready when you are.</p>}
            {!started && (ready || canStartEarly) && (
              <button type="button" className={styles.videoPlay} onClick={play}>
                <PlayIcon aria-hidden="true" />{ready ? "Play video" : "Play while loading"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
