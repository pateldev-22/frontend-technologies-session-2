import { addItem } from "@/redux/slices/CartSlice";
import { Button } from "@headlessui/react";
import React, { useState } from "react";
import type { ReactFormState } from "react-dom/client";
import { useDispatch } from "react-redux";
import { useNavigate, useOutletContext } from "react-router-dom"

export default function CustomizeDetails(){

    const [quantity,setQuantity] = useState('');
    const {product } = useOutletContext<{product:any}>();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e :React.FormEvent) => {
        e.preventDefault();

        const item = {
            ...product,
            id:product.id,
            quantity:quantity,
            title: `${product.title}`
        }

        dispatch(addItem(item));
        navigate('/shop/cart');
    }

    return (<>
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gary-800 p-8 rounded-lg max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-6">Customize:</h2>
    <form onSubmit={handleSubmit} className="space-y-6">
        <div>
            <label>Size:</label>
            <input value={quantity} onChange={(e) => setQuantity(e.target.value)} 
                   className="bg-amber-50 text-black"/>
        </div>
        <button className="bg-black rounded p-2 text-white" onClick={(() => navigate(-1))}>cancel</button>

        <Button type="submit" className="bg-blue-500 rounded p-2 m-2 text-white">Add Customized to cart</Button>
    </form>
    </div>
    </div>
    </>)
}