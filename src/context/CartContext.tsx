import axios from "axios";
import { createContext, useContext, useState } from "react";
import { UserContext } from "./Usercontext";
export let CartContext= createContext<any>({})
export function CartContextProvider({ children }: { children: React.ReactNode }){
    let [numItem,setnumItem]=useState(0)
    
    

    async function addCart(productId:string){
        let body={
            productId:productId
        }
        return await axios.post("https://ecommerce.routemisr.com/api/v1/cart",body,{
            headers:{
                token:localStorage.getItem("userToken")
            }
        })
    }
    async function getUserCart(){
        return await axios.get("https://ecommerce.routemisr.com/api/v1/cart",{
            headers:{
                token:localStorage.getItem("userToken")
            }
        })
    }
    async function removeUserCart(id:string){
        return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
            headers:{
                token:localStorage.getItem("userToken")
            }
        })
    }
    async function clearUserCart(){
        return await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
            headers:{
                token:localStorage.getItem("userToken")
            }
        })
    }
    async function update(id:string,count:any){
        let body={
            count:count
        }
        return await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,body,{
            headers:{
                token:localStorage.getItem("userToken")
            }
        })
    }
    async function checkOut(id:string,data:any){
        let body={
            shippingAddress:data
        }
        return await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=https://HudaNady.github.io/ecommerce/`,body,{
            headers:{
                token:localStorage.getItem("userToken")
            }
        })
    }
    async function getAllUserOrder(userData:any){
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userData}`,{
            headers:{
                token:localStorage.getItem("userToken")
            }
        })
    }
    return<CartContext.Provider value={{getAllUserOrder,checkOut,addCart,update,removeUserCart,clearUserCart,getUserCart,numItem,setnumItem}}>
        {children}
    </CartContext.Provider>
}