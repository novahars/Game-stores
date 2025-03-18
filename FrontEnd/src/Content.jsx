import { useContext, useEffect, useState } from "react";
import { ContentContext } from "./App";
import { motion } from "framer-motion";
import { scroller } from "react-scroll";
import LoginRegisterModal from "./LoginRegister"; // Separate login/register modal

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
  
  // Fetch stores from the Laravel API when the component mounts.
  useEffect(() => {
    fetch("http://localhost:8000/api/stores")
      .then((response) => response.json())
      .then((apiSections) => setSections(apiSections))
      .catch((error) => console.error("Error fetching stores:", error));
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
      // Look up store by key from data.value.
      const store = sections.find((s) => s.key === data.value);
      if (store) {
        setActiveStore(store);
        setModalTitle(store.title);
        setActiveSection(store.key);
        // Optional: animate scroll to an element.
        setTimeout(() => {
          const element = document.getElementById(store.key);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "center" });
            setHasScrolled(true);
          }
        }, 1200);
      }
      // Switch from small modal to full modal after a delay.
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
    if (isFullScreen && activeStore) {
      fetch("http://localhost:8000/api/products")
        .then((response) => response.json())
        .then((allProducts) => {
          const filteredProducts = allProducts.filter(
            (prod) => prod.store && prod.store.id == activeStore.id
          );
          setProducts(filteredProducts);
        })
        .catch((error) => console.error("Error fetching products:", error));
    }
  }, [isFullScreen, activeStore]);
  
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
      setShowLoginModal(true);
      return;
    }
    
    const payload = {
      user_id: currentUser.id,
      store_id: activeStore.id,
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
              className="fixed inset-0 flex flex-col items-center justify-center z-[999999999]"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <div className="bg-white w-full h-full p-6 overflow-y-auto" id="scrollContainer">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">{modalTitle}</h2>
                  <button onClick={closeModal} className="text-red-500 font-bold text-2xl">
                    X
                  </button>
                </div>
                {products.length > 0 ? (
                  products.map((product) => (
                    <div key={product.id} className="p-4 my-4 border-b border-gray-200">
                      <h3 className="text-xl font-semibold">{product.name}</h3>
                      <p className="text-gray-600">{product.description}</p>
                      <p className="text-gray-800 font-bold">${product.price}</p>
                      <button
                        className="mt-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        onClick={() => purchaseProduct(product)}
                      >
                        Belanja
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No products available for this store.</p>
                )}
              </div>
            </motion.div>
          )}
        </>
      )}
  
      {/* Transaction Success Modal */}
      {transactionModal && (
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
      )}
  
      {/* Login/Register Modal triggered by purchase */}  
      {showLoginModal && (
        <LoginRegisterModal onClose={() => setShowLoginModal(false)} />
      )}
  
      {/* When no canvas object is clicked, nothing is rendered. */}
      {!data.boolean && null}
    </>
  );
}