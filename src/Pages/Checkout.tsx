import { useCart } from "@/context/CartContext";
import { useEffect, useRef, useState } from "react";

export default function Checkout() {
    const {cart} = useCart();
    const total_price = cart.reduce(
        (sum:number,curr:number) => sum + curr?.price * curr?.quantity,0
    )

    let isMounted = true;

    const [showCoupon , setShowCoupon] = useState(false);
    const [coupon,setCoupon] = useState<number>(0);
    const [originalPrice,setOriginalPrice] = useState<number | null>(null);

    const total_time = 5*60; //bcz 5 min is 300sec
    const [timeLeft , setTimeLeft] = useState(total_time);

    if(isMounted){
        const interval = setInterval(() => {
            setTimeLeft(prevTime => {
                return prevTime - 1;
            })
            clearInterval(interval);
        },1000);
        setTimeLeft
    }

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if(showCoupon){
            inputRef.current?.focus();
            if(originalPrice === null){
                setOriginalPrice(total_price);
            }
        }
    },[showCoupon]);

    const discountedPrice = Math.max(total_price - coupon, 0);

    const saved_amount = originalPrice !== null ? originalPrice-discountedPrice:0;
    return(
        <div>
            <p> Total : {total_price}.rs</p>

            {!showCoupon && (
                <button
                    onClick={() => {
                        setShowCoupon(true);
                    }}
                    className="text-blue-500 bg-none border-none"
                    >
                        Have a coupon ? 
                    </button>
            )}

            {
                showCoupon && (
                    <>
                    <input 
                        ref={inputRef}
                        type="number"
                        placeholder="enter coupon amount"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                    />

                    {coupon > 0 && originalPrice != null && (
                        <p className="text-green-500">you saved {saved_amount} (was {originalPrice})</p>
                    )}
                    </>
                )
            }

            <p>final amount {discountedPrice}.rs</p>

            time remaining:
            {timeLeft}
        </div>
    )
}