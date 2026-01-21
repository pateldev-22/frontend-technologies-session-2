import { useCart } from "@/context/CartContext";
import { useEffect, useRef, useState } from "react";

export default function Checkout() {
    const {cart} = useCart();
    const total_price = cart.reduce(
        (sum:number,curr:number) => sum + curr?.price * curr?.quantity,0
    )

    const [showCoupon , setShowCoupon] = useState(false);
    const [coupon,setCoupon] = useState<number>(0);

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if(showCoupon){
            inputRef.current?.focus();
        }
    },[showCoupon]);

    const discountedPrice = Math.max(total_price - coupon, 0);

    return(
        <div>
            <p> Total : {total_price}.rs</p>

            {!showCoupon && (
                <button
                    onClick={() => {
                        setShowCoupon(true);
                    }}
                    >
                        Have a coupon ? 
                    </button>
            )}

            {
                showCoupon && (
                    <input 
                        ref={inputRef}
                        type="number"
                        placeholder="enter coupon amount"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                    />
                )
            }

            <p>final amount {discountedPrice}.rs</p>
        </div>
    )
}