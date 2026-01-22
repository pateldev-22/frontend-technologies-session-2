import { api } from "@/api/AxiosClient";
import type { Product } from "@/types/products";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem } from "@/redux/slices/CartSlice";

export default function ProductsPage() {

    const [products,setProducts] = useState();

    const dispatch = useDispatch();

    async function fetchAllProducts(){
            const response = await api.get("products")
             console.log("here !! product",response);
             setProducts(response.data.products);                   
    }
    
    useEffect(() => {
        fetchAllProducts();
    },[])

    const navigate = useNavigate();

    return (<> 
    <ul className="grid grid-cols-2 gap-2">
    {products && products.map((product : Product) => (
        <li key={product.id}>
            
            <Card className="max-w-sm mt-20 ml-10">
            <CardHeader>
                <CardTitle className="text-black dark:text-white">Name : {product.title}</CardTitle>
                <CardDescription>
                   Category :  {product.category}
                   <div className="text-amber-500 mt-2">
                        Price : {product.price}
                    </div>
                </CardDescription>
            </CardHeader>
            
            <CardContent>
                    <img src={product.thumbnail} className="h-40 w-80" /> 
            </CardContent>
            <CardFooter className="flex flex-row">
                <button onClick={() => {navigate(`${product.id}`)}} 
                    className=" text-blue-500">View Details
                </button>
                <button onClick={() => {
                    dispatch(addItem(
                        {
                            id:product.id,
                            price : product.price,
                            category : product.category,
                            quantity: 1,
                            title : product.title
                        }
                    ))
                }} 
                className="bg-blue-500 text-white">
                    Add To Cart
                </button>
            </CardFooter>
            </Card>
            
        </li>
    ))}
    </ul>
    </>)
}