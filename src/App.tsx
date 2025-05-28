import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import { RootLayout } from "./layouts/RootLayout"
import { CartContextProvider } from "./context/CartContext"
import { Checkout } from "./components/Checkout"

const router = createBrowserRouter(createRoutesFromElements(
<Route path='/' element={<RootLayout/>}>
  <Route path='/checkout' element={<Checkout/>}/>
</Route>))

export const App = () => {


  return (
    <CartContextProvider>
      <RouterProvider router={router}/>
    </CartContextProvider>
  )
}