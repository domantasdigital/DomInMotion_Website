/** Accept Vimeo share/player URLs, retaining the privacy hash for unlisted videos. */
export function getVimeoUrls(value: string) {
  try {
    const url = new URL(value.trim().replace(/&amp;/g, "&"));
    if (url.protocol !== "https:" && url.protocol !== "http:") return null;

    const match = url.hostname === "player.vimeo.com"
      ? url.pathname.match(/^\/video\/(\d+)\/?$/)
      : ["vimeo.com", "www.vimeo.com"].includes(url.hostname)
        ? url.pathname.match(/^\/(\d+)(?:\/([a-zA-Z0-9]+))?\/?$/)
        : null;
    if (!match) return null;

    const [, id, pathHash] = match;
    const hash = url.searchParams.get("h") || pathHash;
    if (hash && !/^[a-zA-Z0-9]+$/.test(hash)) return null;

    const embed = new URL(`https://player.vimeo.com/video/${id}`);
    if (hash) embed.searchParams.set("h", hash);
    // Use consistent player settings rather than share/tracking URL parameters.
    embed.searchParams.set("autoplay", "0");
    embed.searchParams.set("playsinline", "1");
    embed.searchParams.set("badge", "0");

    return {
      embedUrl: embed.toString(),
      watchUrl: `https://vimeo.com/${id}${hash ? `/${hash}` : ""}`,
    };
  } catch {
    return null;
  }
}
