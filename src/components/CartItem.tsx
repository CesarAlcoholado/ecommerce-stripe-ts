import type { ProductItem } from "../libs/types"
import DeleteIcon from '../assets/icon-remove-item.svg'

interface CartItemProduct {
  product: ProductItem
}

export const CartItem = ({product}: CartItemProduct) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h4 className="text-base mb-2">{product.name}</h4>

        <div className="flex items-center gap-4">
          <span className="text-base text-red-500">{product.quantity}x</span>

          <div className="flex gap-2">
            <p className="text-rose-400">
              @
              {product.price.toLocaleString("en-us", {
                style: "currency",
                currency: "usd",
              })}
            </p>

            <p className="text-base text-rose-400">$50.00</p>
          </div>
        </div>
      </div>

      <button
        // onClick={() => removeFromCart(product.id)}
        className="flex size-[20px] items-center justify-center rounded-full border border-rose-400 text-center hover:cursor-pointer"
      >
        <img className="size-[10px]" src={DeleteIcon} alt="remove item" />
      </button>
    </div>
  );
}