import ReusableCard from "@/components/card";
import ProductForm from "@/components/ProductForm";
import { useEffect, useState } from "react";


export default function HomePage(){



    return(
    <>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 bg-gray-100">
        <div className="bg-white dark:bg-black p-4 rounded  shadow lg:col-span-2">
                <ReusableCard/>
        </div>

        <div className="bg-green-600 dark:bg-black p-4 rounded shadow">
                 <ProductForm />
        </div>
    </div>
    </>
    )
}