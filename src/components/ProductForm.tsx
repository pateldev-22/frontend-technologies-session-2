import type { Product } from "@/types/products";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ProductForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

const [product,setProducts] = useState<Product[]>(() => {
    const renderProducts = localStorage.getItem("product");
    return renderProducts ? JSON.parse(renderProducts) : [];
  })

  const onSubmit = (data:any) => {
    const updated_products = [...product, data];
    setProducts(updated_products);
    localStorage.setItem("product", JSON.stringify(updated_products));
    reset();
  };

  return (
    <div >
      <h2 className="text-3xl ml-28 mb-20 text-slate-800">Add Product</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1">
        
        {/* Product Name */}
        <label>Product Name:</label>
        <input
          type="text"
          className="bg-white text-black"
          {...register("name", { required: "Product name is required" })}
        />
        {errors.name && <p className="text-red-500">name required</p>}

        {/* Price */}
        <label>Price:</label>
        <input
          type="number"
          step="0.01"
          {...register("price", {
            required: "Price is required",
            min: { value: 0.01, message: "Price must be greater than 0" }
          })}
          className="bg-white text-black"
        />
        {errors.price && <p className="text-red-500">price required</p>}

        {/* Category */}
        <label>Category:</label>

        <select
          {...register("category", { required: "Category is required" })}
          className="bg-white text-black"
        >
            
          <option value="">-- Select Category --</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="books">Books</option>
          <option value="home">Home</option>
        </select>
        {errors.category && <p className="text-red-500">select a category</p>}

        {/* Stock Quantity */}
        <label>Stock Quantity:</label>
        <input
          type="number"
          {...register("stock", {
            required: "Stock quantity is required",
            min: { value: 0, message: "Stock cannot be negative" }
          })}
          className="bg-white text-black"
        />
        {errors.stock && <p className="text-red-500">enter the amount of stock (cannot be negative) </p>}

        {/* Submit Button */}
        <button className="bg-black text-white mt-4" type="submit">Add Product</button>
      </form>
    </div>
  );
}