import React from 'react'
import { RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom'
import Layout from './component/Layout/Layout'
import Home from './component/Home/Home'
import NotFound from './component/NotFound/NotFound'
import Brands from './component/Brands/Brands'
import Products from './component/Products/Products'
import Cart from './component/Cart/Cart'
import Login from './component/Login/Login'
import Register from './component/Register/Register'
import WishList from './component/WishList/WishList'
import Category from './component/Category/Category'
import ForgetPass from './component/ForgetPass/ForgetPass'
import { UserContextProvider } from './context/Usercontext'
import ProtectedRouting from './component/ProtectedRouting/ProtectedRouting'
import ResetPass from './component/ResetPass/ResetPass'
import { QueryClient, QueryClientProvider } from 'react-query'
import ProductDetails from './component/ProductDetails/ProductDetails'
import { CartContextProvider } from './context/CartContext'
import { WishListContextProvider } from './context/WishListContext'
import CheckOut from './component/CheckOut/CheckOut'
import AllOrder from './component/AllOrder/AllOrder'




export default function App() {
  let QueryClients=new QueryClient()
  const routers=createHashRouter([
    {path:"",element:<Layout/> , children:[
      {path:"home",element:<ProtectedRouting><Home /></ProtectedRouting>},
      {path:"brands",element:<ProtectedRouting><Brands /></ProtectedRouting>},
      {path:"products",element:<ProtectedRouting><Products/></ProtectedRouting>},
      {path:"productDetails/:id",element:<ProtectedRouting><ProductDetails/></ProtectedRouting>},
      {path:"cart",element:<ProtectedRouting><Cart/></ProtectedRouting>},
      {path:"checkout/:id",element:<ProtectedRouting><CheckOut/></ProtectedRouting>},
      {path:"allorders",element:<ProtectedRouting><AllOrder/></ProtectedRouting>},
      {path:"wishList",element:<ProtectedRouting><WishList/></ProtectedRouting>},
      {path:"category",element:<ProtectedRouting><Category/></ProtectedRouting>},
      {path:"login",element:<Login />},
      {index:true,element:<Register />},
      {path:"forgetPass",element:<ForgetPass />},
      {path:"resetpass",element:<ResetPass />},
      {path:"*",element:<NotFound />},
    ]},
    ])
  return <>
  <QueryClientProvider client={QueryClients}>
  <UserContextProvider>
    <WishListContextProvider>
    
    <CartContextProvider>
    
    <RouterProvider router={routers}/>
  
    </CartContextProvider>

    </WishListContextProvider>
    </UserContextProvider>
  </QueryClientProvider>
  
  
  </>
}