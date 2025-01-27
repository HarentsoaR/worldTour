import React from "react"

export function NewsletterSignup() {
  return (
    <section className="bg-slate-400 dark:bg-slate-800 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white mb-4">Stay Updated with World Tour</h2>
          <p className="text-xl text-blue-100 mb-8">
            Get the latest travel tips, destination guides, and exclusive offers straight to your inbox.
          </p>
          <form className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                required
              />
              <button
                type="submit"
                className="bg-white dark:bg-gray-200 text-blue-600 dark:text-blue-800 font-bold py-3 px-6 rounded-md hover:bg-blue-50 dark:hover:bg-gray-300 transition duration-300"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

