import { useState } from "react";
import type { ProductItem } from "../libs/types";
import { loadStripe } from '@stripe/stripe-js'
import { Spinner } from "./Spinner";

interface PayButtonProps {
  products: ProductItem[]
}
const { VITE_STRIPE_PUBLISHABLE_KEY } = import.meta.env

const stripePromise = loadStripe(VITE_STRIPE_PUBLISHABLE_KEY)

export const PayButton = ({products}: PayButtonProps) => {
  const [isProcessing, setIsProcessing] = useState(false)

  const handleCheckout = async () => {
    const lineItems = products.map((product)=> ({
      price_data: {
        currency: "usd",
        product_data: {
          name: product.name,
          //!la imagen debe ser una url
          images: [product.image]
        },
        unit_amount: product.price * 100,
      },
      quantity: product.quantity,
    }))

    try {
      const stripe = await stripePromise
      if (!stripe) {
        throw new Error("Stripe not loaded");
      }

      const response = await fetch('/api/create-checkout/session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ lineItems })
      })
      const data = await response.json()
      console.log(data)

      const result = await stripe.redirectToCheckout({
        sessionId: data.id})

      if (result.error) {
        console.error(result.error.message);
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    } finally {
      setIsProcessing(false); 
    }

  }

  return (
    <div className="mt-4">
      <button
        onClick={handleCheckout}
        className="bg-red-500 text-base w-full rounded-full py-4 text-white transition-colors duration-300 hover:bg-rose-900"
      >
        {isProcessing ? <Spinner/> : 'Confirm Order'}
      </button>
    </div>
  );
}