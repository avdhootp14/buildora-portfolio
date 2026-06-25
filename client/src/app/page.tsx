import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { Stats } from "../components/Stats";
import { TechStack } from "../components/TechStack";
import { Services } from "../components/Services";
import { Process } from "../components/Process";
import { Work } from "../components/Work";
import { Testimonials } from "../components/Testimonials";
import { FAQ } from "../components/FAQ";
import { Contact } from "../components/Contact";
import { Footer } from "../components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Stats />
      <TechStack />
      <Services />
      <Process />
      <Work />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
