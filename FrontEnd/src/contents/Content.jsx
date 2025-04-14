import { useContext, useEffect, useState } from "react";
import { ContentContext } from "../App";
import { motion } from "framer-motion";
import LoginRegisterModal from "../component/LoginRegister";
import navbarContent from '../navigation/navbarContent';

export default function Content() {
  const { data, setData } = useContext(ContentContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [sections, setSections] = useState([]);
  const [activeStore, setActiveStore] = useState(null);
  const [products, setProducts] = useState([]);
  const [isSmallModal, setIsSmallModal] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  // State for transaction modal
  const [transactionModal, setTransactionModal] = useState(false);
  const [transactionMessage, setTransactionMessage] = useState("");

  // Check if the user is logged in (for example, via localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  // Fetch categories from the Laravel API when the component mounts.
  useEffect(() => {
    fetch("http://localhost:8000/api/categories")
      .then((response) => response.json())
      .then((apiCategories) => setSections(apiCategories))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  // Listen for window resize to adapt mobile view.
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // When a canvas object is clicked...
  useEffect(() => {
    if (data.boolean && !hasScrolled) {
      setIsSmallModal(true);
      // Look up category by key from data.value
      const category = sections.find((c) => c.key === data.value);
      if (category) {
        setModalTitle(category.name);
        setActiveSection(category.key);
        // Optional: animate scroll to element
        setTimeout(() => {
          const element = document.getElementById(category.key);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
            setHasScrolled(true);
          }
        }, 1200);
      }
      const timer = setTimeout(() => setIsFullScreen(true), 1000);
      return () => clearTimeout(timer);
    } else if (!data.boolean) {
      // Reset modal-related state.
      setIsSmallModal(false);
      setIsFullScreen(false);
      setModalTitle("");
      setActiveSection("");
      setActiveStore(null);
      setProducts([]);
      setHasScrolled(false);
    }
  }, [data.boolean, data.value, sections, hasScrolled]);

  // Once the full modal is visible and activeStore is set, fetch products.
  useEffect(() => {
    if (isFullScreen && data.value) {
      fetch(`http://localhost:8000/api/categories/${data.value}/products`)
        .then((response) => response.json())
        .then((productsData) => {
          setProducts(productsData);
        })
        .catch((error) => console.error("Error fetching products:", error));
    }
  }, [isFullScreen, data.value]);

  // Function to close modal and reset state.
  const closeModal = () => {
    setData({ boolean: false, value: null });
    setIsSmallModal(false);
    setIsFullScreen(false);
    setModalTitle("");
    setActiveSection("");
    setActiveStore(null);
    setProducts([]);
    setHasScrolled(false);
    if (window.cameraControls) {
      window.cameraControls.resetCamera();
    }
  };

  // Function to handle the "Belanja" (purchase) action.
  const purchaseProduct = async (product) => {
    // If user is not logged in, show login/register modal instead.
    if (!currentUser) {
      setShowLoginModal(true); // Tampilkan modal login/register
      return; // Hentikan proses pembelian
    }

    const payload = {
      user_id: currentUser.id,
      product_id: product.id,
      quantity: 1,
    };

    try {
      const response = await fetch("http://localhost:8000/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (response.ok) {
        setTransactionMessage(result.message || "Transaksi berhasil");
        setTransactionModal(true);
      } else {
        setTransactionMessage(result.message || "Transaksi gagal");
        setTransactionModal(true);
      }
      // Auto-close transaction modal after 2 minutes.
      setTimeout(() => {
        setTransactionModal(false);
      }, 120000);
    } catch (error) {
      console.error("Error in transaction:", error);
      setTransactionMessage("Terjadi error saat transaksi");
      setTransactionModal(true);
      setTimeout(() => {
        setTransactionModal(false);
      }, 120000);
    }
  };

  return (
    <>
      {data.boolean && (
        <>
          {/* Background overlay */}
          <motion.div
            className="fixed inset-0 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut", delay: 0.3 }}
          />

          {/* Small modal: store title */}
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

          {/* Full modal: store details and products */}
          {isFullScreen && (
            <motion.div
              className="fixed inset-0 flex flex-col z-[999999999]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >

              <div className="bg-gray-100 w-full h-full p-6 overflow-y-auto">
                <div className="bg-white w-full shadow-md">
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

                      {/* Right Side Icons */}
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
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                            </svg>
                            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                              0
                            </span>
                          </button>
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
                      </div>
                    </div>
                  </div>
                </div>
                {/* Categories with Icons */}
                <div className="max-w-7xl mx-auto px-4 py-8">
                  <h1 className="text-4xl font-bold text-center mb-8">All Product</h1>

                  {/* Breadcrumb */}
                  <div className="flex items-center justify-center gap-2 mb-12">
                    <a href="#" className="text-gray-600">Home</a>
                    <span className="text-gray-400">{'<'}</span>
                    <span className="text-gray-800">All Product</span>
                  </div>

                  {/* Category Icons */}
                  <div className="grid grid-cols-4 gap-8 max-w-4xl mx-auto mb-12">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-24 h-24 flex items-center justify-center">
                        <img src="/path/to/gaming-icon.svg" alt="All Gaming" className="w-16 h-16" />
                      </div>
                      <span className="text-gray-700">All Gaming</span>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-24 h-24 flex items-center justify-center">
                        <img src="/path/to/mobile-icon.svg" alt="All Mobile" className="w-16 h-16" />
                      </div>
                      <span className="text-gray-700">All Mobile</span>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-24 h-24 flex items-center justify-center">
                        <img src="/path/to/accessories-icon.svg" alt="All Aksesoris" className="w-16 h-16" />
                      </div>
                      <span className="text-gray-700">All Aksesoris</span>
                    </div>
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-24 h-24 flex items-center justify-center">
                        <img src="/path/to/office-icon.svg" alt="All Office" className="w-16 h-16" />
                      </div>
                      <span className="text-gray-700">All Office</span>
                    </div>
                  </div>

                  {/* Filter and View Options */}
                  <div className="flex justify-between items-center mb-8">
                    <button className="flex items-center gap-2 px-4 py-2 border rounded">
                      <span>FILTER</span>
                    </button>
                    <div className="flex items-center gap-4">
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-gray-100 rounded">
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4z" />
                          </svg>
                        </button>
                        {/* Add other view option buttons here */}
                      </div>
                      <select className="px-4 py-2 border rounded">
                        <option>Date, new to old</option>
                        {/* Add other sorting options */}
                      </select>
                    </div>
                  </div>

                  {/* Product Grid - Updated to handle direct category products */}
                  <div className="grid grid-cols-4 gap-7">
                    {products.length > 0 ? (
                      products.map((product) => (
                        <div key={product.id} className="group relative w-full min-h-[350px]">
                          <div className="relative">
                            <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
                              <img
                                src={`http://localhost:8000/storage/products/${product.image}`}
                                alt={product.name}
                                className="w-full h-full object-center object-cover"
                                onError={(e) => {
                                  e.target.src = '/placeholder.jpg';
                                }}
                              />
                            </div>
                          </div>
                          <div className="mt-2 flex-col gap-2">
                            <h3 className="text-lg font-medium">{product.name}</h3>
                            <p className="text-gray-500 text-sm">{product.description}</p>
                            <p className="text-red-600 font-medium">Rp {product.price}</p>
                            <button
                              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
                              onClick={() => purchaseProduct(product)}
                            >
                              Belanja
                            </button> 
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-600 col-span-4 text-center">No products available.</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

        </>
      )
      }

      {/* Transaction Success Modal */}
      {
        transactionModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-[1000000000]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-green-100 p-6 rounded-lg shadow-xl text-center">
              <h3 className="text-2xl font-bold mb-4">{transactionMessage}</h3>
              <p className="mb-4 text-sm">
                Modal ini akan tertutup otomatis setelah 2 menit.
              </p>
              <button
                onClick={() => setTransactionModal(false)}
                className="text-red-500 font-bold text-2xl"
              >
                X
              </button>
            </div>
          </motion.div>
        )
      }

      {/* Login/Register Modal triggered by purchase */}
      {
        showLoginModal && (
          <LoginRegisterModal
            onClose={() => setShowLoginModal(false)}
            onLoginSuccess={(user) => {
              setCurrentUser(user); // Set user setelah login berhasil
              localStorage.setItem("user", JSON.stringify(user)); // Simpan user ke localStorage
              setShowLoginModal(false); // Tutup modal
            }}
          />
        )
      }

      {/* When no canvas object is clicked, nothing is rendered. */}
      {!data.boolean && null}
    </>
  );
}