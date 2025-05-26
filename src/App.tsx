import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import { RootLayout } from "./layouts/RootLayout"
import { CartContextProvider } from "./context/CartContext"

const router = createBrowserRouter(createRoutesFromElements(<Route path='/' element={<RootLayout/>}></Route>))

export const App = () => {


  return (
    <CartContextProvider>
      <RouterProvider router={router}/>
    </CartContextProvider>
  )
}