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

  //? Funcion para reducir cantidad de productos

  const reduceFromCart = (id:number) => {
    const updatedProduct = products.map((product)=> {
      if (product.id === id){
        const updatedQuantity = product.quantity! - 1

        if (updatedQuantity < 1) removeFromCart(id);
        return { ...product, quantity: updatedQuantity };
      }
      return product
    })

    setProducts(updatedProduct)
  }

  //? Funcion para eliminar productos del carrito
  const removeFromCart = (id:number) => {
    const filteredProducts = products.filter((product) => product.id !== id)
    setProducts(filteredProducts)
  }

  //? Funcion para verificar si el producto existe en el carrito
  const isItemInCart = (id:number) => {
    return products.some((product)=> product.id === id)
  }

  //? Funcion para vaciar el carrito
  const resetCart = () => {
    setProducts([])
  }

  return (
    <CartContext.Provider
      value={{
        addToCart,
        products,
        reduceFromCart,
        removeFromCart,
        isItemInCart,
        resetCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}