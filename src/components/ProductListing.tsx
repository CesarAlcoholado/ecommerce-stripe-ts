import { useContext, useState } from "react"
import type { CartContextProps, ProductItem } from "../libs/types"
import CartIcon from '../assets/icon-add-to-cart.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus,faMinus } from "@fortawesome/free-solid-svg-icons";
import { CartContext } from "../context/CartContext";

interface ProductListingProps {
  product: ProductItem
}

export const ProductListing = ({product}: ProductListingProps) => {

  const [isItemInCart, setIsItemInCart] = useState(true)
  const {id, name, category, price, image} = product

  const {addToCart} = useContext(CartContext) as CartContextProps

  return (
    <div className="[&:not(:last-child)]:mb-8">
      <div className="relative mb-4">
        <img
          className={`rounded-md ${
            isItemInCart ? "border-primary-red border-2" : ""
          }`}
          src={image}
          alt={name}
        />

        <button
          onClick={() => addToCart(id, name, image, category, price)}
          className="border-text-rose-500 hover:border-red-500 hover:cursor-pointer group absolute bottom-[-1rem] left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border bg-rose-50 px-4 py-2 transition-colors duration-300 lg:w-[150px]"
        >
          <img src={CartIcon} alt="Add to cart" />
          <span className="font-medium group-hover:text-red-500 text-rose-900 transition-colors duration-300">
            Add to cart
          </span>
        </button>

        {/* <div className="bg-red-500 absolute bottom-[-1rem] left-1/2 flex w-1/2 -translate-x-1/2 items-center justify-between gap-2 rounded-full px-4 py-2 text-white lg:w-[170px]">
          <button
            // onClick={reduceQuantity}
            className="hover:text-red-500 flex size-[20px] items-center justify-center rounded-full border transition-colors duration-300 hover:bg-white"
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>

          <p>1</p>

          <button
            // onClick={increaseQuantity}
            className="hover:text-red-500 flex size-[20px] items-center justify-center rounded-full border transition-colors duration-300 hover:bg-white"
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div> */}
      </div>
      <div className="lg:mt-8">
        <p className="text-rose-500">{category}</p>
        <h3 className="text-2xl font-bold text-rose-900">{name}</h3>
        <p className="font-bold text-primary-red">
          {price.toLocaleString("en-us", {
            style: "currency",
            currency: "usd",
          })}
        </p>
      </div>
    </div>
  );
}