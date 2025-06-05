import React, { useEffect, useRef } from 'react';

interface ExperienceItem {
  title: string;
  company: string;
  logo?: string;
  period: string;
  description: string;
}

const experiences: ExperienceItem[] = [
  {
    title: "Software Engineer",
    company: "BlueConic",
    logo: "/images/blueconic_logo.jpeg",
    period: "July 2021 - Present",
    description: "Working on frontend development for the BlueConic platform, a customer data platform that helps companies optimize their customer lifecycle."
  },
  {
    title: "Frontend Engineer",
    company: "Proud Nerds",
    logo: "/images/proudnerds_logo.jpeg",
    period: "June 2019 - June 2021",
    description: "Developed responsive web applications and user interfaces using modern frontend technologies. Collaborated with UX designers to implement pixel-perfect designs."
  },
  {
    title: "Frontend Engineer",
    company: "RIFF",
    logo: "/images/riff_logo.jpeg",
    period: "January 2018 - June 2019",
    description: "Created modern web interfaces and implemented responsive designs for client projects. Worked with various JavaScript frameworks and libraries."
  },
  {
    title: "Web Developer",
    company: "Van Munster Media Groep",
    period: "April 2017 - January 2018",
    description: "Developed and maintained websites for clients, focusing on responsive design principles and cross-browser compatibility."
  },
  {
    title: "Web Editor",
    company: "Petrol d.d., Ljubljana",
    logo: "/images/petrol_logo.jpeg",
    period: "September 2016 - April 2017",
    description: "Managed web content and worked on small web development projects. Collaborated with the marketing team to ensure consistent messaging across digital platforms."
  }
];

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const experienceRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    experienceRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      
      experienceRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section 
      id="experience" 
      ref={sectionRef}
      className="py-20 opacity-0 translate-y-8 transition-all duration-700"
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Professional Experience</h2>
        <p className="text-muted-foreground max-w-2xl mb-12">
          My professional journey through the tech industry, focused on frontend development and user experience design.
        </p>
        
        <div className="relative">
          <div className="timeline-line"></div>
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                ref={el => experienceRefs.current[index] = el}
                className="experience-card pl-8 opacity-0 translate-y-8 transition-all duration-700"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="timeline-dot" style={{ top: '24px' }}></div>
                <div className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-card">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">{exp.title}</h3>
                      <p className="text-primary font-medium">{exp.company}</p>
                    </div>
                    {exp.logo && (
                      <img 
                        src={exp.logo} 
                        alt={exp.company} 
                        className="w-12 h-12 object-contain"
                      />
                    )}
                  </div>
                  <span className="inline-block text-sm text-muted-foreground mb-4">{exp.period}</span>
                  <p className="text-muted-foreground">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
