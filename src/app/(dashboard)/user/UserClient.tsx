"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import Toast, { useToast } from "@/app/components/Toast";
import ProductCard from "@/app/components/ProductCard";
import ProductDetails from "@/app/components/ProductDetails";
import OrderHistory from "./OrderHistory";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
}

interface CartItem {
  id: number;
  product_id: number;
  name: string;
  price: number;
  quantity: number;
  stock: number;
}

interface Order {
  id: number;
  total_amount: number;
  status: string;
  created_at: string;
  items: Array<{
    product_name: string;
    quantity: number;
    price: number;
  }>;
}

interface UserClientProps {
  user: {
    id: number;
    role: "admin" | "user";
    email: string;
  };
}

export default function UserDashboard({ user }: UserClientProps) {
  const [activeTab, setActiveTab] = useState<"products" | "cart" | "orders">(
    "products"
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );

  // Computed value - always in sync with products array
  const selectedProduct = selectedProductId
    ? products.find((p) => p.id === selectedProductId) || null
    : null;

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    fetchProducts();
    // fetchCartItems();
    // fetchOrders();
  }, []);

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     const target = event.target as Element;
  //     if (!target.closest(".dropdown-container")) {
  //       setIsDropdownOpen(false);
  //     }
  //   };

  //   if (isDropdownOpen) {
  //     document.addEventListener("mousedown", handleClickOutside);
  //   }

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [isDropdownOpen]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("/api/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const handleOrder = async (productId: number, quantity: number) => {
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });

      const data = await res.json();
      if (res.ok) {
        // Update product stock locally
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === productId
              ? { ...product, stock: product.stock - quantity }
              : product
          )
        );

        // No need to update selectedProduct - it's computed from products array!

        showToast("Item added to cart successfully!", "success");
      } else {
        showToast(data.error || "Failed to add item to cart", "error");
      }
    } catch (error) {
      console.error("Order failed:", error);
      showToast("Failed to add item to cart", "error");
    }
  };

  // const fetchCartItems = async () => {
  //   try {
  //     const res = await axios.get("/api/cart", { headers });
  //     setCartItems(res.data);
  //   } catch (error) {
  //     console.error("Failed to fetch cart:", error);
  //   }
  // };

  // const fetchOrders = async () => {
  //   try {
  //     const res = await axios.get("/api/orders", { headers });
  //     setOrders(res.data);
  //   } catch (error) {
  //     console.error("Failed to fetch orders:", error);
  //   }
  // };

  const { toast, showToast, hideToast } = useToast();

  // const addToCart = async (productId: number) => {
  //   try {
  //     await axios.post("/api/cart", { product_id: productId }, { headers });
  //     fetchCartItems();
  //     showToast("Item added to cart!", "success");
  //   } catch (error) {
  //     console.error("Failed to add to cart:", error);
  //     showToast("Failed to add item to cart", "error");
  //   }
  // };

  const viewProductDetails = (product: Product) => {
    setSelectedProductId(product.id);
  };

  const closeProductDetails = () => {
    setSelectedProductId(null);
  };

  // const updateCartQuantity = async (cartId: number, quantity: number) => {
  //   try {
  //     await axios.put("/api/cart", { cart_id: cartId, quantity }, { headers });
  //     fetchCartItems();
  //   } catch (error) {
  //     console.error("Failed to update cart:", error);
  //   }
  // };

  // const removeFromCart = async (cartId: number) => {
  //   try {
  //     await axios.delete(`/api/cart?id=${cartId}`, { headers });
  //     fetchCartItems();
  //   } catch (error) {
  //     console.error("Failed to remove from cart:", error);
  //   }
  // };

  // const checkout = async () => {
  //   if (cartItems.length === 0) {
  //     showToast("Your cart is empty!", "error");
  //     return;
  //   }

  //   setLoading(true);
  //   try {
  //     const res = await axios.post("/api/orders", {}, { headers });
  //     showToast(`Order placed successfully! Order ID: ${res.data.orderId}`, "success");
  //     fetchCartItems();
  //     fetchOrders();
  //     setActiveTab("orders");
  //   } catch (error: any) {
  //     showToast(error.response?.data?.error || "Failed to place order", "error");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    ...new Set(products.map((p) => p.category).filter(Boolean)),
  ];
  // const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  // Show product details if a product is selected
  if (selectedProduct) {
    return (
      <ProductDetails
        product={selectedProduct}
        onBack={closeProductDetails}
        onOrder={handleOrder}
        // onAddToCart={addToCart}
        // cartItemsCount={cartItems.length}
        userEmail={user.email}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}

      {/* Enhanced Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  My Inventory
                </h1>
                <p className="text-sm text-gray-600">
                  Welcome back, {user.email.split("@")[0]}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Online</span>
              </div>
              <button
                onClick={() => setActiveTab("cart")}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 transition-colors duration-200"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9"
                  />
                </svg>
                <span>Cart ({cartItems.length})</span>
              </button>
              <button
                onClick={logout}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-2"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Welcome Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Dashboard Overview
              </h2>
              <p className="text-gray-600 mb-4 md:mb-0">
                Manage your products, cart, and orders efficiently.
              </p>
            </div>
            <div className="flex space-x-4 text-center">
              <div className="bg-white border border-gray-200 rounded-lg p-4 min-w-[80px]">
                <div className="text-xl font-semibold text-blue-600">
                  {products.length}
                </div>
                <div className="text-sm text-gray-600">Products</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 min-w-[80px]">
                <div className="text-xl font-semibold text-green-600">
                  {cartItems.length}
                </div>
                <div className="text-sm text-gray-600">In Cart</div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4 min-w-[80px]">
                <div className="text-xl font-semibold text-purple-600">
                  {orders.length}
                </div>
                <div className="text-sm text-gray-600">Orders</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Tab Navigation */}
        <div className="mb-8">
          <nav className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            {[
              {
                key: "products",
                label: "Products",
                icon: (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                ),
              },
              {
                key: "cart",
                label: "Shopping Cart",
                icon: (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9"
                    />
                  </svg>
                ),
              },
              {
                key: "orders",
                label: "Order History",
                icon: (
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                ),
              },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-4 py-2.5 rounded-md font-medium text-sm transition-all duration-200 flex items-center space-x-2 ${
                  activeTab === tab.key
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {activeTab === "products" && (
          <div>
            {/* Enhanced Search Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Search Products
              </h3>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      className="h-5 w-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search products by name or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>
                <div className="relative min-w-[200px] dropdown-container">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                    <svg
                      className="h-4 w-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full pl-10 pr-10 py-3 text-left text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white cursor-pointer transition-colors hover:border-gray-400 focus:outline-none"
                  >
                    {selectedCategory || "All Categories"}
                  </button>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none z-10">
                    <svg
                      className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>

                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-60 overflow-auto">
                      <div className="py-1">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedCategory("");
                            setIsDropdownOpen(false);
                          }}
                          className={`w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 transition-colors ${
                            !selectedCategory
                              ? "bg-blue-50 text-blue-600 font-medium"
                              : "text-gray-900"
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <svg
                              className="h-4 w-4 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                              />
                            </svg>
                            <span>All Categories</span>
                          </div>
                        </button>
                        {categories.map((category) => (
                          <button
                            key={category}
                            type="button"
                            onClick={() => {
                              setSelectedCategory(category);
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 transition-colors ${
                              selectedCategory === category
                                ? "bg-blue-50 text-blue-600 font-medium"
                                : "text-gray-900"
                            }`}
                          >
                            <div className="flex items-center space-x-2">
                              <svg
                                className="h-4 w-4 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                                />
                              </svg>
                              <span>{category}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {(searchTerm || selectedCategory) && (
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Showing {filteredProducts.length} of {products.length}{" "}
                    products
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("");
                    }}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <svg
                  className="w-12 h-12 text-gray-400 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onOrder={handleOrder}
                    onViewDetails={viewProductDetails}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "cart" && (
          <div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    Shopping Cart
                  </h2>
                  <div className="text-sm text-gray-600">
                    {cartItems.length}{" "}
                    {cartItems.length === 1 ? "item" : "items"}
                  </div>
                </div>
              </div>

              {cartItems.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <svg
                    className="w-12 h-12 text-gray-400 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9"
                    />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Start shopping to add items to your cart
                  </p>
                  <button
                    onClick={() => setActiveTab("products")}
                    className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Browse Products
                  </button>
                </div>
              ) : (
                <>
                  <div className="divide-y">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="px-6 py-4 flex items-center justify-between"
                      >
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">
                            {item.name}
                          </h3>
                          <p className="text-gray-600">${item.price} each</p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            // onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300"
                          >
                            -
                          </button>
                          <span className="w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            // onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.stock}
                            className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 disabled:opacity-50"
                          >
                            +
                          </button>
                          <button
                            // onClick={() => removeFromCart(item.id)}
                            className="ml-4 text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        </div>
                        <div className="ml-4 font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <span className="text-sm text-gray-600">
                          Total Amount
                        </span>
                        {/* <div className="text-xl font-semibold text-gray-900">${cartTotal.toFixed(2)}</div> */}
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-gray-600">
                          Items:{" "}
                          {cartItems.reduce(
                            (sum, item) => sum + item.quantity,
                            0
                          )}
                        </span>
                      </div>
                    </div>
                    <button
                      // onClick={checkout}
                      disabled={loading}
                      className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transition-colors duration-200"
                    >
                      {loading ? (
                        <>
                          <LoadingSpinner size="sm" />
                          <span>Processing Order...</span>
                        </>
                      ) : (
                        <>
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span>Complete Purchase</span>
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <OrderHistory />
          </div>
        )}
      </div>
    </div>
  );
}
