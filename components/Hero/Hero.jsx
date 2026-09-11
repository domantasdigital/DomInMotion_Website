"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { PlayIcon } from "@heroicons/react/20/solid";
import desktopArtwork from "@/public/images/bgdesktop.png";
import mobileArtwork from "@/public/images/bgmobile2.png";
import SocialLinks from "@/components/SocialLinks/SocialLinks";
import Loader from "@/components/Loader/Loader";
import Scene from "./3DAvatar/Scene";

const Hero = () => {
  const [avatarReady, setAvatarReady] = useState(false);
  const handleAvatarReady = useCallback(() => setAvatarReady(true), []);

  return (
    <section
      id="home"
      className="relative min-h-dvh w-full overflow-hidden bg-[radial-gradient(circle_at_50%_42%,#DFD9E8_0%,#BAB0CA_100%)]"
    >
      <h1 className="sr-only">DOM IN MOTION</h1>
      <p className="sr-only">I bring ideas to life with 3D and motion design.</p>

      <div className="pointer-events-none absolute inset-0 z-0 min-[480px]:hidden">
        <Image
          src={mobileArtwork}
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          fetchPriority="high"
          className="object-contain object-[center_12%]"
          draggable="false"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 z-0 hidden min-[480px]:block min-[640px]:inset-x-[7.5%] lg:inset-x-0">
        <Image
          src={desktopArtwork}
          alt=""
          aria-hidden="true"
          fill
          sizes="(min-width: 1024px) 100vw, (min-width: 640px) 85vw, 100vw"
          fetchPriority="high"
          className="object-contain object-[center_32%] lg:object-center"
          draggable="false"
        />
      </div>

      <div className="relative z-10 mx-auto h-dvh max-w-7xl">
        <Scene onAvatarReady={handleAvatarReady} />
      </div>

      <div className="absolute inset-x-0 bottom-5 z-20 flex items-end justify-center gap-4 px-4 sm:bottom-8 sm:px-8 lg:bottom-10 lg:justify-between lg:px-11">
        <a
          href="#portfolio"
          className="hero-watch-button group relative inline-flex shrink-0 items-center gap-2.5 overflow-hidden rounded-full border-2 border-black bg-black px-3.5 py-2.5 text-sm font-bold text-white transition-colors duration-300 hover:border-coral hover:bg-coral focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral sm:gap-3 sm:px-5 sm:py-3 sm:text-base lg:bg-transparent lg:text-black lg:hover:border-black lg:hover:bg-transparent lg:hover:text-white"
        >
          <span className="absolute inset-0 hidden -translate-x-[105%] bg-black transition-transform duration-300 ease-out group-hover:translate-x-0 lg:block" />
          <span className="relative grid h-7 w-7 place-items-center rounded-full bg-coral transition-transform duration-300 group-hover:rotate-[120deg] group-hover:scale-110 sm:h-8 sm:w-8">
            <PlayIcon className="h-3.5 w-3.5 translate-x-px text-black sm:h-4 sm:w-4" />
          </span>
          <span className="relative whitespace-nowrap">Watch portfolio</span>
        </a>

        <SocialLinks className="hidden items-center gap-5 pb-3 text-base font-bold lg:flex" />
      </div>

      <Loader isReady={avatarReady} />
    </section>
  );
};

export default Hero;
