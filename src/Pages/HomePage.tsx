import ReusableCard from "@/components/card";
import ProductForm from "@/components/ProductForm";


export default function HomePage(){


    let data : String | never[] = localStorage.getItem("product") ?? [];
    let ProductDetails : String | never[] = JSON.parse(data); 


    return(
    <>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-4 bg-gray-100">
        <div className="bg-white p-4 rounded  shadow lg:col-span-2">
                <ReusableCard ProductList={ProductDetails}/>
        </div>

        <div className="bg-green-500 p-4 rounded shadow">
                 <ProductForm />
        </div>
    </div>
    </>
    )
}