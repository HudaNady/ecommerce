import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from '../Footer/Footer'
import { UserContext } from '../../context/Usercontext'
import ProtectedRouting from '../ProtectedRouting/ProtectedRouting'
import { CartContext } from '../../context/CartContext'
import { WishListContext } from '../../context/WishListContext'

export default function Layout() {
  let {getUserCart,getAllUserOrder,setnumItem}=useContext(CartContext)
  let {getALLWishList}=useContext(WishListContext)
  let {setuserToken,data,userToken}=useContext(UserContext)
  let [userData,setUserdata]=useState<string>('')
  
  let navg=useNavigate()
  useEffect(() => {
    if(localStorage?.getItem("userToken")!=null){
      setuserToken(localStorage?.getItem("userToken"))
      getUserData()
      getUserWishList()
      if(data!=null){
        getUserOrder(data?.id)
      }
      
      navg("/home")
    };
  },[]);
  async function getUserData(){
    let req=await getUserCart().catch((err:any)=>{
      console.log(err)
    })
    if(req?.data?.status==='success'){
      setnumItem(req?.data?.numOfCartItems)
      console.log(req?.data)
    }
  }
  async function getUserOrder(userData:string){
    let req=await getAllUserOrder(userData).catch((err:any)=>{
      console.log(err)
    })
    console.log(req.data)
  }
  async function getUserWishList() {
    let req = await getALLWishList().catch((err: any) => {
      console.log(err)
    })
    console.log(req)
  }
  return <>
  <Navbar />
  <div className=' container pt-5 mt-5 '>
  <Outlet />
  </div>
  <ProtectedRouting><Footer/></ProtectedRouting>
  </>
}
