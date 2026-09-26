import Image from "next/image"; 
import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import Footer from './components/Footer'
import Reviews from "./components/Reviews";
import FaqsSection from "./components/FaqsSection";
import ContactSection from "./components/ContactSection";
 


export default function Home() {
  return (
    <>
      <Hero/>
      <AboutSection/>
      <Reviews/> 
      <FaqsSection/>
      <ContactSection/>
      <Footer/>
    </>
  );
}
