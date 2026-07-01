import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import UseCases from "@/components/UseCases";
import Footer from "@/components/Footer";

/**
 * LOCOBOTICS AI — single-page landing.
 * Sections are composed as independent, modular components.
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <UseCases />
      </main>
      <Footer />
    </>
  );
}
