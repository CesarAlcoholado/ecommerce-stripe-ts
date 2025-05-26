import { Home } from "../Home"
import { Outlet } from 'react-router-dom'

export const RootLayout = () => {
  return (
    <>
    <Home/>
    <Outlet/>
    </>
  )
}