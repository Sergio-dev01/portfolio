import { Nav } from "@/components/site/nav";
import { Hero } from "@/components/site/hero";
import { TechMarquee } from "@/components/site/tech-marquee";
import { About } from "@/components/site/about";
import { Stack } from "@/components/site/stack";
import { Projects } from "@/components/site/projects";
import { Services } from "@/components/site/services";
import { Journey } from "@/components/site/journey";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";

export default function Home() {
  return (
    <>
      <a
        href="#chi-sono"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:rounded-full focus:bg-lavender focus:px-4 focus:py-2 focus:text-ink"
      >
        Salta al contenuto
      </a>
      <Nav />
      <main>
        <Hero />
        <TechMarquee />
        <About />
        <Stack />
        <Projects />
        <Services />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
