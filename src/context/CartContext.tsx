import { createContext, useState } from "react";
import type { CartContextProps, CartProviderProps, ProductItem } from "../libs/types";

export const CartContext = createContext<CartContextProps | undefined>(undefined)

export const CartContextProvider = ({children}:CartProviderProps) => {

  const [products, setProducts] = useState<ProductItem[]>([])

  const addToCart = (
    id: number,
    name: string,
    image: string,
    category: string,
    price:number
  ) => {
    //checkeo si el producto ya existe en el cart o no
    const existingProduct = products.find((p)=> p.id === id)

    if(existingProduct){
      const updateProduct = products.map((product)=> {
        if (product.id === id) {
          return {...product, quantity: product.quantity! + 1}
        }
        return product
      })

      setProducts(updateProduct)
    } else {
      setProducts((prevProducts) => [
        ...prevProducts,
        { id, name, image, category, quantity: 1, price },
      ]);
    }
  };

  return (
    <CartContext.Provider value={{addToCart, products}}>{children}</CartContext.Provider>
  )
}