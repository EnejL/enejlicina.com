import React, { useRef, useEffect, useState } from 'react';
import { cn } from "@/lib/utils";
import ReCAPTCHA from "react-google-recaptcha";

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [result, setResult] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100');
          entry.target.classList.remove('opacity-0', 'translate-y-8');
          observer.unobserve(entry.target);
        }
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

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!recaptchaToken) {
      setResult("Please complete the reCAPTCHA verification");
      return;
    }

    setResult("Sending....");
    const formData = new FormData(event.currentTarget);

    formData.append("access_key", "8a35e7aa-1380-44a1-b198-822efe334832");
    formData.append("recaptcha_token", recaptchaToken);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (response.status === 200) {
        setResult("Thank you for your message! I'll get back to you soon.");
        event.currentTarget.reset();
        recaptchaRef.current?.reset();
        setRecaptchaToken(null);
      } else {
        console.log("Error", data);
        setResult(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setResult("Thank you for your message! I'll get back to you soon.");
      event.currentTarget.reset();
      recaptchaRef.current?.reset();
      setRecaptchaToken(null);
    }
  };

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-20 opacity-0 translate-y-8 transition-all duration-700"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get in Touch</h2>
            <p className="text-muted-foreground max-w-md mb-8">
              Have a project in mind or want to discuss potential opportunities? I'd love to hear from you.
            </p>
          </div>
          
          <div className="glass-card p-8 rounded-lg">
            <h3 className="text-xl font-semibold mb-6">Send Me a Message</h3>
            <form onSubmit={onSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Your Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors"
                  placeholder="john@example.com"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-colors resize-none"
                  placeholder="I'd like to discuss a project..."
                />
              </div>

              <div className="flex justify-center">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey="6LeZylYrAAAAAPD80gtiejFHdbvHK3hlWHMI8MLB"
                  onChange={handleRecaptchaChange}
                />
              </div>
              
              <button
                type="submit"
                className="btn-hover-effect w-full flex items-center justify-center py-3 px-4 rounded-md text-primary-foreground font-medium transition-colors bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send Message
              </button>

              {result && (
                <div className={`text-sm mt-2 ${result.includes("Thank you") ? "text-green-600" : "text-red-600"}`}>
                  {result}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
