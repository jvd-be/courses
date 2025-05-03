import React, { createContext, useState, useEffect } from 'react'

export const ContextData = createContext(null)

export default function ContextDataProvider({ children }) {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || []
    const [cartItem, setCartItem] = useState(savedCart);
    const [isRegster,setIsRegster]=useState(false)

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItem))

    }, [cartItem])

    return (
        <ContextData.Provider value={{ cartItem, setCartItem,isRegster,setIsRegster}}>
            {children}
        </ContextData.Provider>
    )
}
