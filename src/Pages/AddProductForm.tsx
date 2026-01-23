import { useAddProduct } from "@/api/mutations";
import { useState } from "react";

export default function AddProductForm() {
    const {mutate : addProduct, isPending} = useAddProduct();

    const [title,setTitle] = useState("");
    const [price,setPrice] = useState(0);
    const [category,setCategory] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        addProduct({
            title,
            price,
            category
        });

        setTitle("");
        setPrice(0);
        setCategory("");

    }
    return ( <>
    <form onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 p-4 rounded shadow mb-6 max-w-md">
            <h2>Add Product</h2>

            <input type="text" placeholder="product title" value={title} onChange={(e) => setTitle(e.target.value)} 
                className="border p-2 w-full mb-3" required
            />

            <input type="text" placeholder="Price" value={price} onChange={(e) => setPrice(Number(e.target.value))} 
                className="border p-2 w-full mb-3" required
            />

            <input type="text" placeholder="category" value={category} onChange={(e) => setCategory(e.target.value)} 
                className="border p-2 w-full mb-3" required
            />

            <button type="submit" disabled={isPending} className="bg-blue-600 text-white px-4 py-2 rounded w-full">
                {isPending ? "Adding....." : "Add Product"}
            </button>
    </form>
    </>)
}