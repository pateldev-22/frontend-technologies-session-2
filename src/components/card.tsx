import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types/products"
import { useEffect, useState } from "react";


export default function ReusableCard({ProductList}:any) {
    console.log(ProductList);
    const [query, setQuery] = useState<string>("");
    const [products,setProducts] = useState<any>();
    const [category,setCategory] = useState<string[]>();
    const [categoryFilter, setCategoryFilter] = useState<string>("");

    const [loading,setLoading] = useState(false);
    const [error,setError] = useState("");

    async function fetchAllProducts(){
        const response = await fetch("https://dummyjson.com/products")
         const data = await response.json();
         setProducts(data.products);                   
    }

    async function fetchCategory(){
            await fetch("https://dummyjson.com/products/category-list")
            .then((response) => response.json())
            .then((data)=> setCategory(data))
            .catch(() => setError("Failed to fetch product"));
    }

    async function featchProductsByCategory(category : string){
            const res = await fetch(`https://dummyjson.com/products/category/${category}`)
            const data = await res.json();
            setProducts(data.products)
            
    }

    useEffect(() => {
        setLoading(true);
        fetchAllProducts();
        fetchCategory();
        setLoading(false);
    },[]);

    const handleSearch = (e:any) => {
        setQuery(e.target.value);
    }

    const handleCategoryChange = (e: any) => {
        setCategoryFilter(e.target.value);

        if(e.target.value == ""){
            fetchAllProducts();
        }else{
            featchProductsByCategory(e.target.value);
        }
    }

    const filteredData = products?.filter((item : Product) => {
        console.log("items",item)
        const search_matches = item.title.toLowerCase().includes(query.toLowerCase().trim());
        const category_matchs = categoryFilter=="" || categoryFilter==item.category;
        return search_matches && category_matchs; 
    });

    console.log("pro",products);
    console.log("All category",category);
    console.log("filter selected", categoryFilter);


    const context = useCart();
    const {addToCart} = context;

  return (
    <>
    ProductList
    <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleSearch}
        className="w-full p-2 mb-4 bg-amber-50 hover:bg-amber-100"
    />
    
    <select 
            value={categoryFilter} 
            onChange={handleCategoryChange}
            className="w-full p-2 border rounded bg-white  mb-8"
        >
            <option value="" >All</option>
            {category?.map((cat,idx) => (
                
                    <option value={`${cat}`} key={idx}>{cat}</option>
                
            ))}
        </select>

    {loading && <p className="text-center">Loading products...</p>}
    {error && <p className="text-red-500 text-center">{error}</p>}

    {products &&
    <div className="flex space-x-10">
        <div>
        Total Products : {products.length}
        </div>
        <div>
            Low Stock: {products.filter((p : any) => p.stock < 5).length}
        </div>
        <div>
            inventory value : {products.reduce((acc :any,curr : any) => acc +curr.price*curr.stock,0)}
        </div>
    </div>
    }

    <ul className="grid grid-cols-2 gap-2">
    {filteredData && filteredData.map((product : Product) => (
        <li key={product.id}>
            
            <Card className="max-w-sm mt-20 ml-10">
            <CardHeader>
                <CardTitle className="text-black">Name : {product.title}</CardTitle>
                <CardDescription>
                   Category :  {product.category}
                </CardDescription>
            </CardHeader>
            <CardContent>
                    <div className="text-amber-500">
                        Price : {product.price}
                    </div>
            </CardContent>
            <CardFooter>
                <div className='mt-6 flex justify-between items-center'>
                    <button
                    className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                    onClick={() => {
                    addToCart(product)
                    }}
                    >
                    Add To Cart
                    </button>
                </div>
            </CardFooter>
            </Card>
            
        </li>
    ))}
    </ul>
    </>
  )
}
