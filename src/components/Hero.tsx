import React, { useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";

const Hero = () => {
  const profileImageRef = useRef<HTMLImageElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          entry.target.classList.remove('opacity-0');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    if (profileImageRef.current) {
      observer.observe(profileImageRef.current);
    }
    
    return () => {
      if (profileImageRef.current) {
        observer.unobserve(profileImageRef.current);
      }
    };
  }, []);

  return (
    <section id="home" className="pt-32 pb-16 relative overflow-hidden">
      <div className="hero-blob"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-3 space-y-6">
            <div className="fade-up opacity-0">
              <span className="inline-block py-1 px-3 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4">
                Software Engineer
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight fade-up opacity-0 fade-up-delay-1">
              Enej Ličina
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground fade-up opacity-0 fade-up-delay-2">
              Frontend Developer specializing in creating beautiful, functional user experiences.
            </p>
            
            <p className="text-muted-foreground max-w-2xl fade-up opacity-0 fade-up-delay-3">
              Currently working as a Software Engineer at BlueConic, with over 7 years 
              of experience in web development, UX design, and frontend technologies.
            </p>
            
            <div className="flex flex-wrap gap-4 pt-4 fade-up opacity-0 fade-up-delay-4">
              <a 
                href="#contact" 
                className="btn-hover-effect inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
              >
                Contact Me
              </a>
              <a 
                href="#experience" 
                className="btn-hover-effect inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                View Experience
              </a>
            </div>
          </div>
          
          <div className="lg:col-span-2 flex justify-center lg:justify-end fade-up opacity-0 fade-up-delay-3">
            <div className="profile-image-container shadow-lg">
              <img
                ref={profileImageRef}
                src="/images/enej_photo.jpeg"
                alt="Enej Licina"
                className="profile-image w-full max-w-md rounded-lg transition-opacity duration-700 opacity-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>
        
        <div className="mt-20 fade-up opacity-0 fade-up-delay-5">
          <h3 className="text-lg font-medium mb-6 text-center">I've worked with</h3>
          <div className="logo-grid">
            <img 
              src="/images/blueconic_logo.jpeg" 
              alt="BlueConic" 
              className="company-logo h-8 w-auto" 
            />
            <img 
              src="/images/proudnerds_logo.jpeg" 
              alt="Triggre" 
              className="company-logo h-8 w-auto" 
            />
            <img 
              src="/images/riff_logo.jpeg" 
              alt="bol.com" 
              className="company-logo h-8 w-auto" 
            />
            <img 
              src="/images/petrol_logo.jpeg" 
              alt="Petrol" 
              className="company-logo h-8 w-auto" 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
