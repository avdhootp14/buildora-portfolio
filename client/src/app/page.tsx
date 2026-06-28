import { Hero } from "../components/Hero";
import { Stats } from "../components/Stats";
import { TechStack } from "../components/TechStack";
import { Services } from "../components/Services";
import { Process } from "../components/Process";
import { Work } from "../components/Work";
import { Team } from "../components/Team";
import { Testimonials } from "../components/Testimonials";
import { FAQ } from "../components/FAQ";
import { Contact } from "../components/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <TechStack />
      <Services />
      <Process />
      <Work />
      <Team />
      <Testimonials />
      <FAQ />
      <Contact />
    </main>
  );
}
