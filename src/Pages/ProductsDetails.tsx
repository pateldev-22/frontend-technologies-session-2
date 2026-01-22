import { api } from "@/api/AxiosClient";
import { useProduct } from "@/api/quires";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

const ProductsDetails: React.FC = () => {
    const {productId} = useParams();

    const navigate = useNavigate();

    const { data,isLoading,error} = useProduct(productId);
    const product = data;
  if (isLoading) {
    return <div className="text-center py-10 text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error.message}</div>;
  }

  if (!product) {
    return <div className="text-center py-10 text-gray-500">No product found</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div>
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-96 object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-2xl font-semibold text-green-600">
            {product.price}     rs
          </p>
          <p className="text-sm text-gray-500 mb-2">
            Discount: {product.discountPercentage}%
          </p>
          <p className="text-sm text-yellow-500 mb-4">
            {product.rating} / 5
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Stock: {product.stock} | Brand: {product.brand} | Category: {product.category}
          </p>
          <button onClick={() => navigate('customize')}>
            Customize Product
          </button>
          <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsDetails;