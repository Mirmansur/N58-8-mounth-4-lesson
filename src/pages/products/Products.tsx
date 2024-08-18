import React, { useEffect, useState } from "react";
import { useProductStore } from "../../app/productStore";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string;
}

const Products: React.FC = () => {
  const { loading, products, error, fetchProducts } = useProductStore();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, products]);

  return (
    <div className="p-6">
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {loading && (
        <div className="flex justify-center items-center">
          <div className="animate-spin border-4 border-t-4 border-blue-500 rounded-full w-8 h-8"></div>
        </div>
      )}
      {error && (
        <p className="text-red-500 text-lg text-center">
          {error.message || error}
        </p>
      )}
      {filteredProducts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 overflow-auto">
          {filteredProducts.map((product: Product) => (
            <div
              key={product.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col"
            >
              <img
                src={product.images}
                alt={product.title}
                className="w-40 h-40 object-cover p-5"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-xl font-bold mb-2">{product.title}</h2>
                <p className="text-gray-600 mb-4 flex-grow">
                  {product.description}
                </p>
                <p className="text-lg font-semibold">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading &&
        !error && <p className="text-center text-lg">No products found</p>
      )}
    </div>
  );
};

export default Products;
