import axios from "axios";
import { createContext, useState } from "react";
import { Data} from "../interfaces/wish";

export let WishListContext= createContext<any>({})
export function WishListContextProvider({ children }: { children: React.ReactNode }){
    let [item,setItem]=useState<Data[]>([])
    let [iconColor,seticonColor]=useState<Record<string, boolean>>({})

    async function addWishList(productId:string){
        let body={
            productId:productId
        }
        return await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist",body,{
            headers:{
                token:localStorage.getItem("userToken")
            }
        })
    }
    function getALLWishList(){
        return axios.get("https://ecommerce.routemisr.com/api/v1/wishlist",{
            headers:{
                token:localStorage.getItem("userToken")
            }
        })
    }
    function removeUserwishlist(id:string){
        return  axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{
            headers:{
                token:localStorage.getItem("userToken")
            }
        })
    }
    return<WishListContext.Provider value={{ iconColor,seticonColor,addWishList,removeUserwishlist,item,setItem ,getALLWishList}}>
        {children}
    </WishListContext.Provider>
}