import React, { createContext, useState, type ReactNode } from 'react'


export interface CartContextProps{
    addToCart : (product:any) => any; 
    clearCart : () => void;   
}

export const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider:React.FC<{childern : ReactNode}> = ({children}) => {

    const [cart,setCart] = useState<any>();

    const addToCart = (product : any) => {
        setCart([
            ...cart,
            {
                ...product,
                quantity:1
            }

        ])
        localStorage.setItem("cartProducts", JSON.stringify(cart));
    }

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem("cartProducts");
    }

    return (
        <CartContext.Provider value={{addToCart,clearCart}}>
            {children}
        </CartContext.Provider>
    )
} 
