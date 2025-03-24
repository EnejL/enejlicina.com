
import React, { useEffect, useRef } from 'react';

interface Language {
  name: string;
  proficiency: string;
  level: number; // 0-100
}

const languages: Language[] = [
  {
    name: "Slovenian",
    proficiency: "Native",
    level: 100
  },
  {
    name: "English",
    proficiency: "Full Professional",
    level: 95
  },
  {
    name: "Croatian",
    proficiency: "Professional Working",
    level: 85
  },
  {
    name: "Italian",
    proficiency: "Professional Working",
    level: 80
  }
];

const Languages = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const languageRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
            
            // Start animation for progress circles
            setTimeout(() => {
              const circles = entry.target.querySelectorAll('.progress-ring-circle');
              circles.forEach(circle => {
                const level = parseInt(circle.getAttribute('data-level') || '0');
                const circumference = 2 * Math.PI * 40;
                const dashOffset = circumference - (level / 100) * circumference;
                (circle as SVGCircleElement).style.strokeDashoffset = dashOffset.toString();
              });
            }, 200);
            
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
    
    languageRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      
      languageRefs.current.forEach(ref => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  return (
    <section 
      id="languages" 
      ref={sectionRef}
      className="py-20 opacity-0 translate-y-8 transition-all duration-700"
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Languages</h2>
        <p className="text-muted-foreground max-w-2xl mb-12">
          Languages I speak professionally and personally, enhancing my ability to work in multicultural environments.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {languages.map((language, index) => (
            <div
              key={language.name}
              ref={el => languageRefs.current[index] = el}
              className="flex flex-col items-center opacity-0 translate-y-8 transition-all duration-700 p-6 border rounded-lg hover:shadow-md"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <svg width="100" height="100" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="#e6e8eb"
                  strokeWidth="10"
                />
                <circle
                  className="progress-ring-circle"
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 40}
                  strokeDashoffset={2 * Math.PI * 40}
                  data-level={language.level}
                />
                <text
                  x="50"
                  y="55"
                  textAnchor="middle"
                  fontSize="16"
                  fontWeight="bold"
                  fill="currentColor"
                >
                  {language.level}%
                </text>
              </svg>
              
              <h3 className="text-lg font-semibold mt-4 mb-1">{language.name}</h3>
              <p className="text-sm text-muted-foreground">{language.proficiency}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Languages;
