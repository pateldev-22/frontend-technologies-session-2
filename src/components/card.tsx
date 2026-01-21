import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import type { Product } from "@/types/products"
import { useEffect, useState } from "react";


export default function ReusableCard({ProductList}:any) {
    console.log(ProductList);
    const [query, setQuery] = useState<string>("");
    const [pro,setProducts] = useState<any>(ProductList);
    const [category,setCategory] = useState<Array<string>>();
    const [categoryFilter, setCategoryFilter] = useState<string>("All");


    async function fetchAllProducts(){
        const response = await fetch("https://dummyjson.com/products")
         const data = await response.json();
         setProducts(data.products);                   
    }

    function fetchCategory(){
            fetch("https://dummyjson.com/products/category-list")
            .then((response) => response.json())
            .then((data)=> setCategory(data));
    }

    function featchProductsByCategory(categoryFilter:any){
            fetch(`https://dummyjson.com/products/category/${categoryFilter}`)
            .then((response) => response.json())
            .then((data)=> setCategoryFilter(data));
    }

    useEffect(() => {
        fetchAllProducts();
        fetchCategory();
    },[]);

    const handleSearch = (e:any) => {
        setQuery(e.target.value);
    }

    const handleCategoryChange = (e: any) => {
        featchProductsByCategory(e.target.value);
        setCategoryFilter(e.target.value);
    }

    const filteredData = pro.filter((item) => {
        console.log("items",item)
        const search_matches = item.title.toLowerCase().includes(query.toLowerCase().trim());
        const category_matchs = categoryFilter=="" || categoryFilter==item.category;
        return search_matches && category_matchs; 
    });

    console.log("pro",pro);
    console.log("All category",category);
    console.log("filter selected", categoryFilter);

    // const handleDelete = (name : string)=> {
    // const data = localStorage.getItem("product");
    //     if (!data) {
    //         console.warn("No data found in localStorage.");
    //         return;
    // }

    // let parsed_data = JSON.parse(data);

    // if (!Array.isArray(parsed_data)) {
    //   return;
    // }
        
    // console.log(parsed_data);
    
    // const filtered_data = parsed_data.filter(item => item.name !== name);

    // localStorage.setItem("product",JSON.stringify(filtered_data));

    // }


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
            {category?.map((cat) => (
                <div>
                    <option value={`${cat}`}>{cat}</option>
                    
                </div>
            ))}
        </select>

    <div className="flex space-x-10">
        <div>
        Total Products : {pro.length}
        </div>
        <div>
            Low Stock: {pro.filter((p) => p.stock < 5).length}
        </div>
        <div>
            inventory value : {pro.reduce((sum,acc) => sum+acc.price*acc.stock,0)}
        </div>
    </div>
    
    <div className="grid grid-cols-2 gap-2">
    {pro.map((product : Product) => (
     <ul>
        <li key={product.id}>
            
            <Card className="max-w-sm mt-20 ml-10">
            <CardHeader>
                <CardTitle className="text-black">Name : {product.name}</CardTitle>
                <CardDescription>
                   Category :  {product.category}
                </CardDescription>
            </CardHeader>
            <CardContent>
                    <div className="text-amber-500">
                        Price : {product.price}
                    </div>
            </CardContent>
            </Card>
        </li>
     </ul>   
    
    ))}
    </div>
    </>
  )
}
