import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react'


export interface CartContextProps{
    cart: any[];
    addToCart : (product:any) => any; 
    clearCart : () => void;   
}

export const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider:React.FC<any> = ({children}) => {

    const [cart,setCart] = useState<any>(() => {
        const stored = localStorage.getItem('cartProducts');
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem("cartProducts", JSON.stringify(cart));
    },[cart]);

    const addToCart = (product : any) => {
        console.log(product);

        setCart(prev => [
            ...prev,
            product
        ]);   
    }

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem("cartProducts");
    }

    return (
        <CartContext.Provider value={{cart,addToCart,clearCart}}>
            {children}
        </CartContext.Provider>
    )
} 

export function useCart(){
    const context = useContext(CartContext);
    if(!context){
        console.log("error in context");
    }
    return context;
}
