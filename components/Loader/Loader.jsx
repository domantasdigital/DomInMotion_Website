"use client";

export default function Loader({ isReady }) {
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
        <p>Loading avatar</p>
      </div>
    </div>
  );
}
