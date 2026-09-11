import Image from "next/image";
import desktopArtwork from "@/public/images/bgdesktop.png";
import mobileArtwork from "@/public/images/bgmobile2.png";
import Scene from "./3DAvatar/Scene";

const Hero = () => {
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
        <Scene />
      </div>
    </section>
  );
};

export default Hero;
