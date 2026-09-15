/**
 * PORTFOLIO CONTENT — edit this file to update the entire portfolio section.
 *
 * Each object below is ONE clickable piece. The grid starts with 9 pieces; Load more adds the next 9.
 *
 * HOW TO EDIT
 * - id: unique, permanent identifier. Never give two pieces the same id.
 * - src: full image/video URL. Files in public use a leading /, NOT /public/.
 * - type: "image" or "video". This selects the zoom viewer or video player.
 * - thumbnail: your custom image URL, or null to use the default preview.
 *   A video thumbnail should be a JPG, PNG, WebP, etc., not another video.
 * - preview: lightweight default image for the grid and video poster.
 *   Existing previews live in /videos/portfolio/thumbnails/. For a new piece,
 *   omit preview to use the image itself or an on-demand video frame.
 * - tags: one or more exact labels, e.g. ["3D animation", "Motion design"].
 *   Use the standard labels below, or add your own: new labels automatically
 *   become filters. A piece appears under EVERY tag assigned to it.
 *
 *   STANDARD TAGS — copy these labels exactly (capitalization and spaces matter):
 *   - "3D animation": 3D animations, character work, product renders,
 *     and still 3D illustrations.
 *   - "Motion design": animated graphics, logo reveals, kinetic typography,
 *     and motion-graphics explainers.
 *   - "Video editing": edited footage, reels, promotional videos,
 *     and mixed-media edits.
 *   - "3D & WEB": web projects, interactive 3D experiences,
 *     and website/product demonstrations.
 *
 *   HOW TO WRITE TAGS — use an array of quoted labels separated by commas:
 *   One category:        tags: ["Video editing"],
 *   Multiple categories: tags: ["3D animation", "Motion design"],
 *   Custom category:     tags: ["Motion design", "Logo animation"],
 *   Reuse the exact same spelling to avoid creating separate filters.
 *   "All work" is automatic; do not add it as a tag.
 *
 * - priority: integer 1–5. 5 = most important / first; 1 = least important.
 *   Equal priorities keep their order in this file. All start at a neutral 3.
 * - title: the short name shown on the card and in the expanded viewer.
 * - description: project context, your role, techniques, etc. shown on opening.
 * - alt: describe what is visually shown, for accessibility and image SEO.
 *   Be specific; don't stuff keywords or repeat "image of" unnecessarily.
 *
 * Titles, descriptions, and tags below are starting points based on the media.
 * Replace them with your official project names and details as needed.
 * To add a piece: upload media to public/videos/portfolio, copy an object,
 * give it a unique id, then edit its fields. To remove it: remove its object.
 * Saving this file updates development; production requires a new deployment.
 *
 * The original 13.mov, 15.mov, and 31.mov have browser-friendly MP4 copies.
 * Their src points to those copies; their previews keep the original names.
 *
 * EXAMPLE (copy inside the portfolioPieces array, including the final comma):
 * {
 *   id: "project-34-video",
 *   src: "/videos/portfolio/34.mp4",
 *   type: "video",
 *   thumbnail: "/images/my-custom-cover.jpg",
 *   preview: "/videos/portfolio/thumbnails/34.mp4.webp",
 *   tags: ["3D animation", "Motion design"],
 *   priority: 5,
 *   title: "A little world in motion",
 *   description: "A playful product animation. I created the models, lighting, and animation.",
 *   alt: "A pink gift box with a gold ribbon on a blue circular platform.",
 * },
 */

/**
 * @typedef {Object} PortfolioPiece
 * @property {string} id
 * @property {string} src
 * @property {"image" | "video"} type
 * @property {string | null} thumbnail
 * @property {string} [preview]
 * @property {string[]} tags
 * @property {1 | 2 | 3 | 4 | 5} priority
 * @property {string} title
 * @property {string} description
 * @property {string} alt
 */

export const portfolioTags = [
  "3D animation",
  "Motion design",
  "Video editing",
  "3D & WEB",
];

export const portfolioPageSize = 9;

/** @type {PortfolioPiece[]} */
export const portfolioPieces = [
  {
    id: "project-1-video",
    src: "/videos/portfolio/1.mp4",
    type: "video",
    thumbnail: "/images/portfolio_Thumbnails/1.png",
    preview: "/videos/portfolio/thumbnails/1.mp4.webp",
    tags: ["Video editing"],
    priority: 2,
    title: "Café  Reel Edit",
    description: "A short edited reel for a past client.",
    alt: "CAFE NURISH IMAGE. A short edited reel for a past client.",
  },
  {
    id: "project-2-video",
    src: "/videos/portfolio/2.mp4",
    type: "video",
    thumbnail: "/images/portfolio_Thumbnails/2.png",
    preview: "/videos/portfolio/thumbnails/2.mp4.webp",
    tags: ["Video editing"],
    priority: 1,
    title: "Nutrition Station Café Short Reel Edit",
    description: "A short edited reel for a past client.",
    alt: "Nurish Cafe Reel Edit. A short edited reel for a past client.",
  },

  {
    id: "project-3-video",
    src: "/videos/portfolio/3.mp4",
    type: "video",
    thumbnail: "/images/portfolio_Thumbnails/3.png",
    preview: "/videos/portfolio/thumbnails/3.mp4.webp",
    tags: ["Video editing"],
    priority: 3,
    title: "Cafe Reel Edit",
    description: "Energetic reel edit for a past client",
    alt: "Green and Red drinks with strawberries in front.",
  },

  {
    id: "project-5-image",
    src: "/videos/portfolio/5.png",
    type: "image",
    thumbnail: null,
    preview: "/videos/portfolio/thumbnails/5.png.webp",
    tags: ["3D animation"],
    priority: 3,
    title: "Ideas that grow",
    description: "A playful 3D marketing composition illustration.",
    alt: "A shopping cart, target, megaphone, and green upward arrow arranged on a pink 3D stage.",
  },
  {
    id: "project-6-image",
    src: "/videos/portfolio/6.png",
    type: "image",
    thumbnail: null,
    preview: "/videos/portfolio/thumbnails/6.png.webp",
    tags: ["3D animation"],
    priority: 4,
    title: "A place to call home",
    description:
      "A miniature property illustration with soft materials and a pastel palette.",
    alt: "A small pastel 3D house with a coral roof and a selling sign on a round platform.",
  },
  {
    id: "project-7-image",
    src: "/videos/portfolio/7.png",
    type: "image",
    thumbnail: null,
    preview: "/videos/portfolio/thumbnails/7.png.webp",
    tags: ["3D animation"],
    priority: 3,
    title: "Let's talk",
    description: "A bold contact-themed 3D illustration.",
    alt: "A red rotary telephone in front of transparent glass lettering on a bright cyan background.",
  },
  {
    id: "project-8-video",
    src: "/videos/portfolio/8.mp4",
    type: "video",
    thumbnail: "/images/portfolio_Thumbnails/8.png",
    preview: "/videos/portfolio/thumbnails/8.mp4.webp",
    tags: ["3D animation", "Motion design"],
    priority: 4,
    title: "Crazy Claymation World",
    description: "Whimsical 3D scenes in claymation style.",
    alt: "A row of worms eating each other in claymation style",
  },
  {
    id: "project-9-video",
    src: "/videos/portfolio/9.mp4",
    type: "video",
    thumbnail: null,
    preview: "/videos/portfolio/thumbnails/9.mp4.webp",
    tags: ["3D & WEB"],
    priority: 5,
    title: "Keyboard Configurator | Interactive 3D Web ",
    description:
      "A web-based keyboard configurator visualisation that brings a product into an interactive 3D setting.",
    alt: "A gray and yellow 3D keyboard displayed in a dark product website.",
  },
  {
    id: "project-10-video",
    src: "/videos/portfolio/10.mp4",
    type: "video",
    thumbnail: "/images/portfolio_Thumbnails/10.png",
    preview: "/videos/portfolio/thumbnails/10.mp4.webp",
    tags: ["3D & WEB"],
    priority: 5,
    title: "Apple Level Scrollytelling Website ",
    description:
      "A scrollytelling website full of 3D motion design and interactive elements for a product (Amiron Wireless Headphones) landing page presentation.",
    alt: "Black wireless headphones floating above the podium with text saying READY TO GO NEXT LEVEL?",
  },
  {
    id: "project-11-video",
    src: "/videos/portfolio/11.mp4",
    type: "video",
    thumbnail: null,
    preview: "/videos/portfolio/thumbnails/11.mp4.webp",
    tags: ["Motion design", "3D animation"],
    priority: 2,
    title: "City in motion",
    description: "Short 3D scene of a car driving in the city",
    alt: "A close side view of a turquoise sports car moving through a city street.",
  },
  {
    id: "project-12-video",
    src: "/videos/portfolio/12.mp4",
    type: "video",
    thumbnail: null,
    preview: "/videos/portfolio/thumbnails/12.mp4.webp",
    tags: ["3D animation", "Motion design"],
    priority: 4,
    title: "After hours - Phtoroleastic 3D scene",
    description:
      "An atmospheric photorealistic 3D environment with industrial detail and moody teal lighting.",
    alt: "A dark industrial corridor with pipes, barrels, and a teal light at the far end.",
  },
  {
    id: "project-13-video",
    src: "/videos/portfolio/13.mp4",
    type: "video",
    thumbnail: "/images/portfolio_Thumbnails/13.png",
    preview: "/videos/portfolio/thumbnails/13.mov.webp",
    tags: ["3D animation"],
    priority: 4,
    title: "Bad Christmas | Funny 3D animation",
    description:
      "A stylized character animation of a character getting tired from getting socks for Christmas all the time.",
    alt: "A stylized 3D character in a red hoodie holding a sock.",
  },
  {
    id: "project-14-video",
    src: "/videos/portfolio/14.mp4",
    type: "video",
    thumbnail: "/images/portfolio_Thumbnails/14.png",
    preview: "/videos/portfolio/thumbnails/14.mp4.webp",
    tags: ["3D animation", "Motion design", "Video editing"],
    priority: 4,
    title: "Documentary Animation",
    description:
      "A documentary for a diamond heist I created. Full of motion design and 3D animations.",
    alt: "A group of metal figures standing near the bus, a stylized 3D look.",
  },
  {
    id: "project-15-video",
    src: "/videos/portfolio/15.mp4",
    type: "video",
    thumbnail: "/images/portfolio_Thumbnails/15.png",
    preview: "/videos/portfolio/thumbnails/15.mov.webp",
    tags: ["3D animation"],
    priority: 3,
    title: "Just Dance",
    description: "A stylized 3D character dancing.",
    alt: "A stylized 3D character dancing.",
  },
  {
    id: "project-16-video",
    src: "/videos/portfolio/16.mp4",
    type: "video",
    thumbnail: "/images/portfolio_Thumbnails/16.png",
    preview: "/videos/portfolio/thumbnails/16.mp4.webp",
    tags: ["Motion design", "Video editing"],
    priority: 4,
    title: "Stylized YouTube Video",
    description:
      "A humorous mixed-media edit YouTube video created using After Effects.",
    alt: "A suited figure with a bright green cartoon face against a black textured background.",
  },
  {
    id: "project-17-video",
    src: "/videos/portfolio/17.mp4",
    type: "video",
    thumbnail: "/images/portfolio_Thumbnails/17.png",
    preview: "/videos/portfolio/thumbnails/17.mp4.webp",
    tags: ["Motion design"],
    priority: 3,
    title: "SAAS demo video",
    description: "A past client projected created to promote a SAAS.",
    alt: "Colorful words saying UNDERSTAND YOURSELF in front of a colorful background.",
  },
  {
    id: "project-18-video",
    src: "/videos/portfolio/18.mp4",
    type: "video",
    thumbnail: "/images/portfolio_Thumbnails/18.png",
    preview: "/videos/portfolio/thumbnails/18.mp4.webp",
    tags: ["Video editing"],
    priority: 1,
    title: "Epic Muay Thai Reel Video Edit",
    description: "A reel video edit montage for a past client..",
    alt: "The Epic Muay Thai Academy logo emerging from darkness with colored glitch edges.",
  },

  {
    id: "project-20-video",
    src: "/videos/portfolio/20.mp4",
    type: "video",
    thumbnail: "/images/portfolio_Thumbnails/20.png",
    preview: "/videos/portfolio/thumbnails/20.mp4.webp",
    tags: ["Video editing"],
    priority: 3,
    title: "Epic Video Montage Hype Video",
    description:
      "A personal training client requested a hype video editing montage.",
    alt: "A jacked dude with letters behind him.",
  },
  {
    id: "project-21-video",
    src: "/videos/portfolio/21.mp4",
    type: "video",
    thumbnail: null,
    preview: "/videos/portfolio/thumbnails/21.mp4.webp",
    tags: ["3D animation", "Motion design"],
    priority: 3,
    title: "A little surprise",
    description:
      "A playful gift-box animation with glossy materials and a bright blue stage.",
    alt: "A pink gift box tied with a gold bow on a blue circular platform.",
  },
  {
    id: "project-22-video",
    src: "/videos/portfolio/22.mp4",
    type: "video",
    thumbnail: "/images/portfolio_Thumbnails/22.png",
    preview: "/videos/portfolio/thumbnails/22.mp4.webp",
    tags: ["Video editing"],
    priority: 2,
    title: "Personal Trainer Video Edit",
    description: "A fitness trainer requested a video edit.",
    alt: "2 people exercising at the gym.",
  },
  {
    id: "project-23-image",
    src: "/videos/portfolio/23.png",
    type: "image",
    thumbnail: null,
    preview: "/videos/portfolio/thumbnails/23.png.webp",
    tags: ["3D animation"],
    priority: 4,
    title: "Be active",
    description:
      "A summer-themed character illustration with inflatable props and playful lettering.",
    alt: "A cheerful 3D character on a pink inflatable with a beach ball against a blue textured background.",
  },
  {
    id: "project-24-video",
    src: "/videos/portfolio/24.mp4",
    type: "video",
    thumbnail: "/images/portfolio_Thumbnails/24.png",
    preview: "/videos/portfolio/thumbnails/24.mp4.webp",
    tags: ["3D animation", "Motion design"],
    priority: 5,
    title: "Explainer 3D Animation",
    description: "A Lithuanian-language 3D motion piece.",
    alt: "A miniature living room with a person inside it.",
  },
  {
    id: "project-25-image",
    src: "/videos/portfolio/25.png",
    type: "image",
    thumbnail: null,
    preview: "/videos/portfolio/thumbnails/25.png.webp",
    tags: ["3D animation"],
    priority: 3,
    title: "A softer space",
    description:
      "A cozy 3D bedroom study with warm colors, soft furnishings, and small decorative details.",
    alt: "A pastel 3D bedroom with a yellow duvet, pink headboard, bedside table, and shelving.",
  },
  {
    id: "project-26-image",
    src: "/videos/portfolio/26.png",
    type: "image",
    thumbnail: null,
    preview: "/videos/portfolio/thumbnails/26.png.webp",
    tags: ["3D animation"],
    priority: 3,
    title: "Robert...",
    description:
      "A small claymation creature scene TikTok meme with warm cinematic lighting.",
    alt: "A claymation creature looking at a rock which is crying.",
  },
  {
    id: "project-27-image",
    src: "/videos/portfolio/27.png",
    type: "image",
    thumbnail: null,
    preview: "/videos/portfolio/thumbnails/27.png.webp",
    tags: ["3D animation"],
    priority: 2,
    title: "Photorealistic 3D scene product render",
    description: "Completely 3D photorealistic product scene.",
    alt: "An amber-colored bottle standing on weathered timber in a sunlit grassy woodland setting.",
  },
  {
    id: "project-28-image",
    src: "/videos/portfolio/28.png",
    type: "image",
    thumbnail: null,
    preview: "/videos/portfolio/thumbnails/28.png.webp",
    tags: ["3D animation"],
    priority: 5,
    title: "Wide-eyed",
    description:
      "An expressive 3D character close-up in a vivid orange and pink setting.",
    alt: "A surprised clay-like 3D character with brown hair and an open mouth on an orange background.",
  },
  {
    id: "project-29-image",
    src: "/videos/portfolio/29.png",
    type: "image",
    thumbnail: null,
    preview: "/videos/portfolio/thumbnails/29.png.webp",
    tags: ["3D animation"],
    priority: 5,
    title: "Floating full of energy",
    description:
      "A dynamic character illustration with floating stars and sweeping light trails.",
    alt: "A 3D character in a pink shirt leaping among colorful stars and glowing curves.",
  },
  {
    id: "project-30-image",
    src: "/videos/portfolio/30.png",
    type: "image",
    thumbnail: null,
    preview: "/videos/portfolio/thumbnails/30.png.webp",
    tags: ["3D animation"],
    priority: 3,
    title: "Social, in different dimensions",
    description:
      "A sculptural arrangement of social media symbols, reactions, and glossy materials.",
    alt: "3D Instagram, YouTube, and TikTok symbols surrounded by hearts and reaction icons.",
  },
  {
    id: "project-31-video",
    src: "/videos/portfolio/31.mp4",
    type: "video",
    thumbnail: "/images/portfolio_Thumbnails/31.png",
    preview: "/videos/portfolio/thumbnails/31.mov.webp",
    tags: ["3D animation", "Motion design"],
    priority: 5,
    title: "In bloom 3D Commercial ",
    description:
      "A colorful animated flower-shop commercial with a stylized character and abundant floral detail.",
    alt: "A stylized 3D character surrounded by flowers, plants, and wooden shelves in a flower shop.",
  },
  {
    id: "project-32-image",
    src: "/videos/portfolio/32.png",
    type: "image",
    thumbnail: null,
    preview: "/videos/portfolio/thumbnails/32.png.webp",
    tags: ["3D animation"],
    priority: 2,
    title: "Make some noise",
    description:
      "A 3D marketing illustration with a megaphone, growth chart, and bold contrasting shapes.",
    alt: "A red and white megaphone beside a green rising chart on a purple 3D composition.",
  },
  {
    id: "project-33-video",
    src: "/videos/portfolio/33.mp4",
    type: "video",
    thumbnail: "/images/portfolio_Thumbnails/33.png",
    preview: "/videos/portfolio/thumbnails/33.mp4.webp",
    tags: ["Motion design", "Video editing"],
    priority: 3,
    title: "Make it stand out",
    description: "A YouTube styled 2D motion graphics.",
    alt: "A dale carneige book how to win friends and influence people in a stylized motion graphics setting.",
  },
  {
    id: "project-34-image",
    src: "/videos/portfolio/34.png",
    type: "image",
    thumbnail: null,
    preview: "/videos/portfolio/thumbnails/2.png.webp",
    tags: ["3D animation"],
    priority: 3,
    title: "In the music",
    description:
      "A colorful 3D character still with floating musical notes and a warm, layered backdrop.",
    alt: "A smiling 3D girl wearing pink headphones, surrounded by blue and purple musical notes.",
  },
  {
    id: "project-35-image",
    src: "videos/portfolio/35.png",
    type: "image",
    thumbnail: null,
    preview: "/videos/portfolio/35.png",
    tags: ["3D animation"],
    priority: 5,
    title: "3D Character Creation",
    description:
      "3 Characters I had recently created for a client project in Blender!",
    alt: "Three 3D women characters posing in front of a colorful backdrop",
  },
];
