import Hero from "@/components/Hero/Hero";
import Introduction from "@/components/Introduction/Introduction";
import Portfolio from "@/components/Portfolio/Portfolio";
import About from "@/components/About/About";
import Contact from "@/components/Contact/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Introduction />
      <Portfolio />
      <About />
      <Contact />
    </main>
  );
}
