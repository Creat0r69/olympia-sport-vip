import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Pricing from '@/components/Pricing';
import Trainers from '@/components/Trainers';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Pricing />
      <Trainers />
      <Gallery />
      <Testimonials />
      <Contact />
    </>
  );
}
