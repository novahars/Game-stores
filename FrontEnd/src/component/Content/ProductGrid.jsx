export default function ProductGrid({ products, onPurchase }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products && products.length > 0 ? (
        products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative">
              <img
                src={`http://localhost:8000/images/products/${product.image}`}
                alt={product.name}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.src = '/placeholder.jpg';
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300" />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
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
                    onClick={() => onPurchase(product)}
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
          <p className="text-gray-500 text-lg">No products available.</p>
        </div>
      )}
    </div>
  );
} 