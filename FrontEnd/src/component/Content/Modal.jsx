import { motion } from "framer-motion";

export default function Modal({ isSmallModal, isFullScreen, modalTitle, children, onClose }) {
  return (
    <>
      {/* Background overlay */}
      <motion.div
        className="fixed inset-0 bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut", delay: 0.3 }}
      />

      {/* Small modal */}
      {isSmallModal && !isFullScreen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-[99999999999999999]"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="bg-white shadow-xl rounded-lg p-6 text-xl font-bold text-center w-80">
            {modalTitle}
          </div>
        </motion.div>
      )}

      {/* Full screen modal */}
      {isFullScreen && (
        <motion.div
          className="fixed inset-0 flex flex-col z-[999999999]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="bg-gray-100 w-full h-full overflow-y-auto">
            {/* Navbar */}
            <div className="bg-white w-full shadow-md sticky top-0 z-50">
              <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                  {/* Logo */}
                  <div className="flex-shrink-0">
                    <h1 className="text-2xl font-bold">{modalTitle}</h1>
                  </div>

                  {/* Navigation Links */}
                  <div className="hidden md:flex space-x-8">
                    <a href="#" className="text-gray-700 hover:text-blue-600">DAXA</a>
                    <a href="#" className="text-gray-700 hover:text-blue-600">PRODUK</a>
                    <a href="#" className="text-gray-700 hover:text-blue-600">BLOG</a>
                    <a href="#" className="text-gray-700 hover:text-blue-600">DUKUNGAN</a>
                  </div>

                  {/* Right Side */}
                  <div className="flex items-center space-x-6">
                    <a href="#" className="text-gray-700">LOGIN & REGISTER</a>

                    {/* Search Bar */}
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search for products"
                        className="w-64 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                      />
                      <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </button>
                    </div>

                    {/* Action Icons */}
                    <div className="flex items-center space-x-4">
                      <button className="relative">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                          0
                        </span>
                      </button>
                      <button className="relative">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                          0
                        </span>
                      </button>
                    </div>

                    {/* Close Button */}
                    <button
                      onClick={onClose}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-8">
              {/* Header */}
              <h1 className="text-4xl font-bold text-center mb-8">All Product</h1>

              {/* Breadcrumb */}
              <div className="flex items-center justify-center gap-2 mb-12">
                <a href="#" className="text-gray-600">Home</a>
                <span className="text-gray-400">/</span>
                <span className="text-gray-800">All Product</span>
              </div>

              {/* Category Icons */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mb-12">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                    </svg>
                  </div>
                  <span className="text-gray-700">All Gaming</span>
                </div>
                {/* Add more category icons as needed */}
              </div>

              {/* Filter and Sort */}
              <div className="flex flex-wrap justify-between items-center mb-8">
                <button className="flex items-center gap-2 px-4 py-2 border rounded mb-4 md:mb-0">
                  <span>FILTER</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                </button>
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded">
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4z" />
                      </svg>
                    </button>
                  </div>
                  <select className="px-4 py-2 border rounded">
                    <option>Date, new to old</option>
                    <option>Price, low to high</option>
                    <option>Price, high to low</option>
                  </select>
                </div>
              </div>

              {/* Products Grid */}
              {children}
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
} 