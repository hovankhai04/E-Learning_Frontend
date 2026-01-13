'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const testimonials = [
  {
    id: 1,
    name: "Sarah L.",
    text: "The web design course provided a solid foundation for me...",
    avatar: "https://i.pravatar.cc/150?img=5"
  },
  {
    id: 2,
    name: "Emily R.",
    text: "I went from zero knowledge to building my own websites...",
    avatar: "https://i.pravatar.cc/150?img=9"
  }
];

const AuthBanner = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () => setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="lg:block hidden lg:w-1/2 bg-[#F9FAFB] p-8 lg:p-16 flex flex-col justify-center items-center border-b lg:border-b-0 lg:border-r border-gray-100">
          <div className="w-full max-w-[400px]">
            <h2 className="text-3xl lg:text-4xl font-bold text-[#111827] mb-4">
              Students Testimonials
            </h2>
            <p className="text-gray-500 text-sm mb-10 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur. Tempus tincidunt etiam eget elit id imperdiet et. Cras eu sit dignissim lorem nibh et.
            </p>

            {/* Testimonial Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8 relative">
              <p className="text-gray-600 text-sm leading-relaxed mb-10">
                "{testimonials[currentTestimonial].text}"
              </p>
              
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-3">
                  <img 
                    src={testimonials[currentTestimonial].avatar} 
                    alt="" 
                    className="w-10 h-10 rounded-full object-cover shadow-sm"
                  />
                  <span className="font-semibold text-gray-900 text-sm">
                    {testimonials[currentTestimonial].name}
                  </span>
                </div>
                <button className="text-xs font-semibold text-gray-800 bg-gray-50 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                  Read Full Story
                </button>
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="flex justify-end gap-2">
              <button onClick={prevTestimonial} className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-all shadow-sm cursor-pointer">
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button onClick={nextTestimonial} className="w-10 h-10 flex items-center justify-center rounded-xl border border-gray-200 bg-white hover:bg-gray-50 transition-all shadow-sm cursor-pointer">
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
  );
};

export default AuthBanner;
