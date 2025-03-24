
import React, { useEffect, useRef, useState } from 'react';

interface Skill {
  name: string;
  level: number; // 0-100
  category: 'frontend' | 'languages' | 'tools';
}

const skills: Skill[] = [
  { name: 'HTML', level: 95, category: 'frontend' },
  { name: 'CSS', level: 95, category: 'frontend' },
  { name: 'JavaScript', level: 90, category: 'frontend' },
  { name: 'TypeScript', level: 85, category: 'frontend' },
  { name: 'ReactJS', level: 90, category: 'frontend' },
  { name: 'VueJS', level: 80, category: 'frontend' },
  { name: 'jQuery', level: 85, category: 'frontend' },
  { name: 'Swift', level: 65, category: 'languages' },
  { name: 'PHP', level: 75, category: 'languages' },
  { name: 'WordPress', level: 80, category: 'tools' },
  { name: 'UX Design', level: 85, category: 'tools' },
];

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [filter, setFilter] = useState<string>('all');
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
            
            // Animate skill bars
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
              setTimeout(() => {
                (bar as HTMLElement).style.transform = 'scaleX(1)';
              }, 200);
            });
            
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
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const filteredSkills = filter === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === filter);

  return (
    <section 
      id="skills" 
      ref={sectionRef}
      className="py-20 opacity-0 translate-y-8 transition-all duration-700"
    >
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Expertise</h2>
        <p className="text-muted-foreground max-w-2xl mb-8">
          My technical skills and areas of expertise, focusing on frontend development and user experience design.
        </p>
        
        <div className="mb-10 flex flex-wrap gap-3">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            All Skills
          </button>
          <button
            onClick={() => setFilter('frontend')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === 'frontend'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            Frontend
          </button>
          <button
            onClick={() => setFilter('languages')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === 'languages'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            Programming Languages
          </button>
          <button
            onClick={() => setFilter('tools')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === 'tools'
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
            }`}
          >
            Tools & Frameworks
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSkills.map((skill, index) => (
            <div
              key={skill.name}
              ref={el => skillsRef.current[index] = el}
              className="p-6 border rounded-lg transition-all hover:shadow-md"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">{skill.name}</span>
                <span className="text-sm text-muted-foreground">{skill.level}%</span>
              </div>
              <div className="skill-bar">
                <div
                  className="skill-progress"
                  style={{ 
                    width: `${skill.level}%`,
                    transform: 'scaleX(0)',
                    transitionDelay: `${index * 50}ms`
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
