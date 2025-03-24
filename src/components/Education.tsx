
import React, { useEffect, useRef } from 'react';

interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  description?: string;
}

const educationItems: EducationItem[] = [
  {
    institution: "Gea College Ljubljana",
    degree: "Informatics Engineer",
    period: "2017 - 2019",
    description: "Studied information technology with a focus on software development and computer systems."
  },
  {
    institution: "SAE Institute Ljubljana",
    degree: "Web Developer",
    period: "2015 - 2016",
    description: "Specialized training in web development technologies and practices."
  },
  {
    institution: "Gimnazija Koper",
    degree: "High School Graduate",
    period: "2008 - 2012",
    description: "General education with focus on sciences and mathematics."
  }
];

const Education = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const educationRefs = useRef<(HTMLDivElement | null)[]>([]);
  
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
    
    educationRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      
      educationRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section 
      id="education" 
      ref={sectionRef}
      className="py-20 opacity-0 translate-y-8 transition-all duration-700"
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Education</h2>
        <p className="text-muted-foreground max-w-2xl mb-12">
          My educational background and formal qualifications in the field of information technology.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {educationItems.map((item, index) => (
            <div
              key={index}
              ref={el => educationRefs.current[index] = el}
              className="p-6 border rounded-lg opacity-0 translate-y-8 transition-all duration-700 hover:shadow-md"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <h3 className="text-xl font-semibold mb-2">{item.institution}</h3>
              <p className="text-primary font-medium mb-1">{item.degree}</p>
              <span className="inline-block text-sm text-muted-foreground mb-4">{item.period}</span>
              {item.description && (
                <p className="text-muted-foreground">{item.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
