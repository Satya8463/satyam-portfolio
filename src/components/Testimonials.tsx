import React, { useState } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  image: string;
  text: string;
  rating: number;
}

const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      name: "Rajesh Kumar",
      role: "Senior Project Manager",
      company: "Tech Solutions Inc.",
      image: "👨‍💼",
      text: "Satyam is an exceptional developer who consistently delivers high-quality work. His expertise in React and Node.js helped us launch our product 2 months ahead of schedule. Highly recommended!",
      rating: 5
    },
    {
      name: "Priya Sharma",
      role: "CTO",
      company: "StartupHub",
      image: "👩‍💻",
      text: "Working with Satyam was a game-changer for our startup. His AI prompt engineering skills and full-stack capabilities allowed us to build a robust MVP quickly. Excellent communication and technical prowess!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Lead Developer",
      company: "Global Tech Corp",
      image: "👨‍🔬",
      text: "Satyam's problem-solving skills are outstanding. He not only writes clean, maintainable code but also brings innovative solutions to complex challenges. A true professional!",
      rating: 5
    },
    {
      name: "Anita Desai",
      role: "Product Owner",
      company: "Digital Innovations",
      image: "👩‍💼",
      text: "Satyam delivered our e-commerce platform with exceptional quality. His attention to detail and ability to work with modern technologies like TypeScript and Tailwind CSS impressed the entire team.",
      rating: 5
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-20 bg-gradient-to-br from-aqua-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Client <span className="gradient-text">Testimonials</span>
          </h2>
          <div className="w-24 h-1 bg-aqua-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            What clients and colleagues say about working with me
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 md:p-12 relative">
            {/* Quote Icon */}
            <div className="absolute top-8 left-8 text-aqua-200 dark:text-aqua-900 opacity-50">
              <Quote size={48} />
            </div>

            {/* Testimonial Content */}
            <div className="relative z-10">
              <div className="flex flex-col items-center mb-6">
                <div className="text-6xl mb-4">{current.image}</div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{current.name}</h3>
                <p className="text-aqua-600 dark:text-aqua-400 font-medium">{current.role}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{current.company}</p>
                
                {/* Star Rating */}
                <div className="flex gap-1 mt-2">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>

              <p className="text-lg text-gray-600 dark:text-gray-300 text-center leading-relaxed mb-8">
                "{current.text}"
              </p>

              {/* Navigation */}
              <div className="flex justify-center items-center gap-4">
                <button
                  onClick={prevTestimonial}
                  className="p-2 rounded-full bg-aqua-100 dark:bg-aqua-900 text-aqua-600 dark:text-aqua-300 hover:bg-aqua-200 dark:hover:bg-aqua-800 transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={24} />
                </button>

                {/* Dots Indicator */}
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        index === currentIndex
                          ? 'bg-aqua-500 w-8'
                          : 'bg-gray-300 dark:bg-gray-600 hover:bg-aqua-300'
                      }`}
                      aria-label={`Go to testimonial ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextTestimonial}
                  className="p-2 rounded-full bg-aqua-100 dark:bg-aqua-900 text-aqua-600 dark:text-aqua-300 hover:bg-aqua-200 dark:hover:bg-aqua-800 transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          </div>

          {/* All Testimonials Preview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {testimonials.map((testimonial, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`p-4 rounded-lg transition-all ${
                  index === currentIndex
                    ? 'bg-aqua-500 text-white shadow-lg scale-105'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-aqua-100 dark:hover:bg-gray-700'
                }`}
              >
                <div className="text-3xl mb-2">{testimonial.image}</div>
                <p className="text-sm font-medium truncate">{testimonial.name}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
