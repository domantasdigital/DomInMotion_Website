"use client";

import { useEffect } from "react";
import { useProgress } from "@react-three/drei";

export default function Loader({ isReady }) {
  const { progress } = useProgress();
  const displayedProgress = isReady ? 100 : Math.min(99, Math.round(progress));

  useEffect(() => {
    if (isReady) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isReady]);

  return (
    <div
      className="loader-screen"
      data-ready={isReady}
      role="status"
      aria-live="polite"
      aria-busy={!isReady}
      aria-hidden={isReady}
    >
      <div className="loader-content">
        <div className="loader-dots" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <p>Loading portfolio</p>
        <div className="loader-progress">
          <div
            className="loader-progress-bar"
            role="progressbar"
            aria-label="Loading portfolio"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow={displayedProgress}
          >
            <span style={{ width: `${displayedProgress}%` }} />
          </div>
          <span className="loader-progress-value" aria-hidden="true">
            {displayedProgress}%
          </span>
        </div>
      </div>
    </div>
  );
}
