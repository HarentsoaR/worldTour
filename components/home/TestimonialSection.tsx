import React from "react"
import Image from "next/image"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Travel Enthusiast",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "World Tour opened up a whole new way of exploring for me. The virtual experiences are incredibly immersive!",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Digital Nomad",
    image: "/placeholder.svg?height=100&width=100",
    quote: "As someone who works remotely, World Tour helps me scout locations before I visit. It's a game-changer!",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Student",
    image: "/placeholder.svg?height=100&width=100",
    quote: "I use World Tour for my geography projects. It's like having a personal tour guide for every destination!",
  },
]

export function TestimonialSection() {
  return (
    <section className="bg-gray-100 dark:bg-gray-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 dark:text-gray-100 mb-12">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{testimonial.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 italic">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialSection

