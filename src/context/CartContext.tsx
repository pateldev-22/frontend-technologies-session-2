import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react'


export interface CartContextProps{
    cart: any[];
    addToCart : (product:any) => any; 
    clearCart : () => void;   
    increment : (id : number) => void;
    decrement : (id : number) => void;
    removeProduct : (id : number) => void;

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

        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);

            if(existing){
                return prev.map(item => item.id === product.id ? {...item,quantity:item.quantity+1} : item);
            }
            return [...prev,{...product,quantity:1}]
        });   
    };

    const increment = (id : number) => {
        setCart(prev => prev.map(item => item.id === id ? {
            ...item, quantity :item.quantity + 1
        } : item))
    }

    const decrement = (id:number) => {
        setCart(prev => prev
            .map(item => item.id === id ? {
                    ...item, quantity : item.quantity -1
                } : item)
            .filter(item => item.quantity > 0)
    );
    };

    const removeProduct = (id:number) => {
        setCart(prev => prev.filter(item => item.id !== id));
    }

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem("cartProducts");
    }

    return (
        <CartContext.Provider value={{cart,addToCart,clearCart,increment,decrement,removeProduct}}>
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
