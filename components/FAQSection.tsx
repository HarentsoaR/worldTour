import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: 'How do virtual tours work?',
    answer: 'Virtual tours use 360-degree images, videos, and interactive elements to create an immersive experience of a destination. You can explore locations from your device, moving around and zooming in on points of interest.',
  },
  {
    question: 'Can I book real trips through World Tour?',
    answer: 'Yes! While we offer virtual experiences, we also partner with travel agencies to provide booking services for physical trips to the destinations you explore virtually.',
  },
  {
    question: 'Are the virtual tours accessible on mobile devices?',
    answer: 'Our virtual tours are optimized for both desktop and mobile devices, allowing you to explore the world from anywhere, at any time.',
  },
  {
    question: 'How often is new content added?',
    answer: 'We add new destinations and update existing tours regularly. On average, we introduce new content weekly, ensuring there s always something new to explore.',
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                className="flex justify-between items-center w-full px-6 py-4 text-left"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-semibold">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

