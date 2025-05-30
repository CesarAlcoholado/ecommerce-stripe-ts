import { useContext } from 'react';
import CheckMark from '../assets/icon-order-confirmed.svg'
import { CartContext } from '../context/CartContext';
import type { CartContextProps } from '../libs/types';
import { OrderItem } from './OrderItem';

export const Checkout = () => {

  const {products, resetCart} = useContext(CartContext) as CartContextProps

  const calcSubtotal = products.reduce(
    (acc, product) => (acc += product.price * product.quantity!),
    0
  );

  const handleNewOrder = () => {
    resetCart();
    window.location.href = "/";
  };

  return (
    <div className="fixed inset-0 h-screen bg-black/50">
      <div className="flex h-full md:items-center md:justify-center">
        <div className="absolute bottom-0 flex w-full flex-col items-start justify-end rounded-lg bg-white p-4 md:relative md:h-fit md:w-[450px] md:px-8 md:pb-8">
          <div className="mb-6">
            <img src={CheckMark} alt="Order confirmed" />
            <h4 className="text-base font-bold text-rose-900">
              Order Confirmed
            </h4>
            <p>We hope you enjoy your food!</p>
          </div>

          <div className="w-full rounded-lg bg-rose-100 p-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="border-b border-b-rose-300 py-4 first-of-type:pt-0"
              >
                <OrderItem product={product} />
              </div>
            ))}

            <div className="mt-6 flex items-center justify-between">
              <p>Order Total</p>
              <span className="text-base font-bold lg:text-500 text-rose-900">
                {calcSubtotal.toLocaleString("en-us", {
                  style: "currency",
                  currency: "usd",
                })}
              </span>
            </div>
          </div>
          <button
            onClick={handleNewOrder}
            className="bg-red-500 font-medium mt-4 w-full rounded-full py-4 text-white transition-colors duration-300 hover:bg-rose-900"
          >
            Start Order
          </button>
        </div>
      </div>
    </div>
  );
}