
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Languages from "@/components/Languages";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  useEffect(() => {
    // Initialize intersection observers for various animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    };

    const fadeElements = document.querySelectorAll(".fade-up");
    
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100");
          entry.target.classList.remove("opacity-0");
          fadeObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    fadeElements.forEach((element) => {
      fadeObserver.observe(element);
    });

    return () => {
      fadeElements.forEach((element) => {
        fadeObserver.unobserve(element);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <div className="section-divider" />
        <Experience />
        <div className="section-divider" />
        <Skills />
        <div className="section-divider" />
        <Education />
        <div className="section-divider" />
        <Languages />
        <div className="section-divider" />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
