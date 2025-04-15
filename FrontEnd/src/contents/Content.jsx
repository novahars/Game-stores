import { useContext, useEffect, useState } from "react";
import { ContentContext } from "../App";
import LoginRegisterModal from "../component/LoginRegister";
import Modal from "../component/Content/Modal";
import ProductGrid from "../component/Content/ProductGrid";
import TransactionModal from "../component/Content/TransactionModal";

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
  const [transactionModal, setTransactionModal] = useState(false);
  const [transactionMessage, setTransactionMessage] = useState("");

  // Check if the user is logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  // Fetch categories
  useEffect(() => {
    fetch("http://localhost:8000/api/categories")
      .then((response) => response.json())
      .then((apiCategories) => setSections(apiCategories))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  // Handle mobile view
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle modal and product fetching
  useEffect(() => {
    if (data.boolean && !hasScrolled) {
      setIsSmallModal(true);
      const category = sections.find((c) => c.key === data.value);
      if (category) {
        setModalTitle(category.name);
        setActiveSection(category.key);
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
      setIsSmallModal(false);
      setIsFullScreen(false);
      setModalTitle("");
      setActiveSection("");
      setActiveStore(null);
      setProducts([]);
      setHasScrolled(false);
    }
  }, [data.boolean, data.value, sections, hasScrolled]);

  // Fetch products when full screen modal is shown
  useEffect(() => {
    if (isFullScreen && data.value) {
      const category = sections.find((c) => c.key === data.value);
      if (category) {
        fetch(`http://localhost:8000/api/categories/${category.key}/products`)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((productsData) => {
            console.log('Products fetched:', productsData);
            setProducts(productsData.products || []);
          })
          .catch((error) => {
            console.error("Error fetching products:", error);
          });
      }
    }
  }, [isFullScreen, data.value, sections]);

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

  const purchaseProduct = async (product) => {
    if (!currentUser) {
      setShowLoginModal(true);
      return;
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
      setTransactionMessage(result.message || (response.ok ? "Transaksi berhasil" : "Transaksi gagal"));
      setTransactionModal(true);
      setTimeout(() => setTransactionModal(false), 120000);
    } catch (error) {
      console.error("Error in transaction:", error);
      setTransactionMessage("Terjadi error saat transaksi");
      setTransactionModal(true);
      setTimeout(() => setTransactionModal(false), 120000);
    }
  };

  return (
    <>
      {data.boolean && (
        <Modal
          isSmallModal={isSmallModal}
          isFullScreen={isFullScreen}
          modalTitle={modalTitle}
          onClose={closeModal}
        >
          <ProductGrid
            products={products}
            onPurchase={purchaseProduct}
            currentUser={currentUser}
          />
        </Modal>
      )}

      {showLoginModal && (
        <LoginRegisterModal
          onClose={() => setShowLoginModal(false)}
          onLoginSuccess={(user) => {
            setCurrentUser(user);
            setShowLoginModal(false);
          }}
        />
      )}

      <TransactionModal
        isOpen={transactionModal}
        message={transactionMessage}
        onClose={() => setTransactionModal(false)}
      />
    </>
  );
}