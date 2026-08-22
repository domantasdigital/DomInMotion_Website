import Scene from "./3DAvatar/Scene";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-dvh w-full overflow-hidden bg-[radial-gradient(circle_at_50%_42%,#DFD9E8_0%,#BAB0CA_100%)]"
    >
      <div className="max-w-7xl h-screen mx-auto ">
        <Scene />
      </div>
    </section>
  );
};

export default Hero;
