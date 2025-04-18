import { useState, useEffect } from "react";
import axios from "axios";

export default function ProductGrid({ currentUser }) {
  const [categories, setCategories] = useState([]); // Menyimpan kategori
  const [products, setProducts] = useState([]); // Menyimpan semua produk
  const [filteredProducts, setFilteredProducts] = useState([]); // Menyimpan produk yang sudah difilter
  const [selectedCategoryKey, setSelectedCategoryKey] = useState(""); // ID kategori yang dipilih
  const [isLoading, setIsLoading] = useState(true);

  // Mengambil kategori dari API
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/categories") // Sesuaikan URL API-nya
      .then((response) => {
        setCategories(response.data); // Menyimpan kategori
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }, []);

  // Mengambil produk dari API
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/products") // Sesuaikan URL API-nya
      .then((response) => {
        setProducts(response.data); // Menyimpan semua produk
        setFilteredProducts(response.data); // Menyimpan produk yang belum difilter
        setIsLoading(false); // Mengubah state loading setelah data berhasil diambil
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      });
  }, []);

  // Filter produk berdasarkan kategori yang dipilih
  useEffect(() => {
    if (selectedCategoryKey) {
      axios
        .get(`http://localhost:8000/api/categories/key/${selectedCategoryKey}`)
        .then((response) => {
          setFilteredProducts(response.data.products); // langsung dari response
        })
        .catch((error) => {
          console.error("Error fetching products by key:", error);
        });
    } else {
      setFilteredProducts(products); // fallback jika tidak ada kategori dipilih
    }
  }, [selectedCategoryKey]);

  if (isLoading) {
    return <div>Loading...</div>; // Menampilkan loading indicator selama data sedang diambil
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Product List</h1>

      {/* Dropdown kategori untuk memilih kategori */}
      <div className="mb-4">
        <select
          className="p-2 border rounded"
          onChange={(e) => setSelectedCategoryKey(e.target.value)}
          value={selectedCategoryKey}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.key}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Menampilkan produk berdasarkan kategori yang dipilih */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={
                    product.image.startsWith("http")
                      ? product.image
                      : `http://localhost:8000/storage/${product.image}`
                  }
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex flex-col gap-2">
                  <div className="text-sm text-gray-500">
                    <p>Platform: {product.platform}</p>
                    <p>Developer: {product.developer}</p>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-lg font-bold text-blue-600">
                      Rp {product.price?.toLocaleString()}
                    </span>
                    <button
                      onClick={() => handlePurchase(product)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                    >
                      Belanja
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-4 text-center py-12">
            <p className="text-gray-500 text-lg">
              No products available in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
