import React, { createContext, useContext, useState, type ReactNode } from 'react'


export interface CartContextProps{
    addToCart : (product:any) => any; 
    clearCart : () => void;   
}

export const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider:React.FC<any> = ({children}) => {

    const [cart,setCart] = useState<any>(localStorage.getItem('cartProducts'));

    const addToCart = (product : any) => {
        console.log(product);

        setCart([
            ...cart,
            product
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

export function useCart(){
    const context = useContext(CartContext);
    if(!context){
        console.log("error in context");
    }
    return context;
}
