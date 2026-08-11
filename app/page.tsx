import Footer from "@/components/Footer";
import Header from "@/components/Header";
import About from "@/components/sections/About";
import Cases from "@/components/sections/Cases";
import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import Process from "@/components/sections/Process";
import Services from "@/components/sections/Services";
import Stats from "@/components/sections/Stats";
import Testimonial from "@/components/sections/Testimonial";
import WhereWeFit from "@/components/sections/WhereWeFit";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>

      <Header />

      <main id="conteudo">
        <Hero />
        <Stats />

        {/* Faixa clara contínua: seções 01–04 dividem o mesmo fundo. */}
        <div className="band-paper band-ruled">
          <WhereWeFit />
          <Services />
          <Process />
          <Cases />
        </div>

        <Testimonial />

        <div className="band-paper">
          <About />
        </div>

        <Contact />
      </main>

      <Footer />
    </>
  );
}
