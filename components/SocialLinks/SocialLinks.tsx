type SocialLinksProps = {
  className?: string;
  onLinkClick?: () => void;
};

export default function SocialLinks({
  className = "",
  onLinkClick,
}: SocialLinksProps) {
  const linkClassName =
    "inline-flex items-center gap-1.5 decoration-2 underline-offset-4 transition-colors duration-200 hover:text-coral hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral";

  return (
    <nav aria-label="Social media" className={className}>
      <a
        href="https://www.linkedin.com/in/domantas-dzikavi%C4%8Dius-203175273/"
        target="_blank"
        rel="noreferrer"
        onClick={onLinkClick}
        className={linkClassName}
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-4 w-4 fill-current sm:h-[1.125rem] sm:w-[1.125rem]"
        >
          <path d="M5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28Z" />
        </svg>
        LinkedIn
      </a>
      <a
        href="https://www.behance.net/domantadzikavi"
        target="_blank"
        rel="noreferrer"
        onClick={onLinkClick}
        className={linkClassName}
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-4 w-4 fill-current sm:h-[1.125rem] sm:w-[1.125rem]"
        >
          <path d="M1.5 4h6.2c3.15 0 5.1 1.25 5.1 4.15 0 1.5-.75 2.6-2.05 3.2 1.85.55 2.75 1.95 2.75 3.85 0 3.1-2.5 4.8-5.6 4.8H1.5V4ZM5 10.35h2.2c1.25 0 2.1-.55 2.1-1.75S8.45 6.9 7.2 6.9H5v3.45Zm0 6.75h2.55c1.45 0 2.35-.55 2.35-1.95 0-1.35-.9-1.9-2.35-1.9H5v3.85ZM15.5 5.25h6v2h-6v-2Zm7 10.25h-6.2c.15 1.8 1.1 2.7 2.6 2.7 1.1 0 1.85-.5 2.2-1.25h1.25c-.55 2.15-1.8 3.55-3.6 3.55-3.5 0-5.3-2.25-5.3-5.55 0-3.15 2.05-5.55 5.25-5.55 3.55 0 4.95 2.95 4.6 6.1h-.8Zm-6.2-1.8h4.2c-.2-1.45-.9-2.15-2-2.15-1.35 0-2.05.8-2.2 2.15Z" />
        </svg>
        Behance
      </a>
    </nav>
  );
}
