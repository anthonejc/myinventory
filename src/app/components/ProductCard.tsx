interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
}

interface ProductCardProps {
  product: Product;
  onOrder: (productId: number, quantity: number) => Promise<void>;
  onAddToCart?: (productId: number) => void;
  onViewDetails?: (product: Product) => void;
}

export default function ProductCard({
  product,
  onOrder,
  onAddToCart,
  onViewDetails,
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Product Image */}
      <div
        className="aspect-square bg-gray-100 cursor-pointer hover:bg-gray-200 transition-colors"
        onClick={() => onViewDetails?.(product)}
      >
        <img
          src={`https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop&auto=format`}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3
            className="text-lg font-medium text-gray-900 cursor-pointer hover:text-blue-600 transition-colors line-clamp-1"
            onClick={() => onViewDetails?.(product)}
          >
            {product.name}
          </h3>
          {product.category && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 ml-2">
              {product.category}
            </span>
          )}
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <span className="text-xl font-semibold text-gray-900">
            ${product.price}
          </span>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              product.stock > 0
                ? product.stock > 10
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {product.stock > 0
              ? product.stock > 10
                ? "In Stock"
                : `${product.stock} left`
              : "Out of stock"}
          </span>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => onViewDetails?.(product)}
            className="flex-1 py-2 px-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors text-sm"
          >
            View Details
          </button>
          <button
            onClick={() => onOrder(product.id, 1)}
            disabled={product.stock === 0}
            className={`flex-1 py-2 px-3 rounded-lg font-medium transition-colors text-sm ${
              product.stock > 0
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
}
