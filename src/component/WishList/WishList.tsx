import React, { useContext, useEffect, useState } from 'react'
import { WishListContext } from '../../context/WishListContext';
import { Data } from '../../interfaces/wish';
import Spinner from '../Spinner/Spinner';
import Swal from 'sweetalert2';
import { CartContext } from '../../context/CartContext';
import { Helmet } from 'react-helmet';

export default function WishList() {
  let { removeUserwishlist, getALLWishList } = useContext(WishListContext)
  let { addCart, setnumItem } = useContext(CartContext)
  let [wishlistdata, setwishlistdata] = useState<Data[]>([])
  let [loading, setLoading] = useState(false)
  useEffect(() => {
    getUserWishList();
  }, [])
  async function getUserWishList() {
    setLoading(true)
    let req = await getALLWishList().catch((err: any) => {
      console.log(err)
    })
    if (req?.data?.status === "success") {
      console.log(req)
      setwishlistdata(req?.data.data)
      setLoading(false)
    } else {
      setLoading(false)
    }
  }
  async function removeItem(id: string) {
    setLoading(true)
    let req = await removeUserwishlist(id).catch((err: any) => {
      console.log(err)
    })
    if (req?.data?.status === "success") {
      let updatewishlist = wishlistdata.filter((item) => item._id !== id);
      setwishlistdata(updatewishlist)
      setLoading(false)
      console.log(req)
    }
  }
  async function AddToCart(id: string) {
    let req = await addCart(id).catch((err: any) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
    })
    if (req.data.status === 'success') {
      setnumItem(req.data.numOfCartItems)
      let updatewishlist = wishlistdata.filter((item) => item._id !== id);
      setwishlistdata(updatewishlist)
      Swal.fire({
        title: "Good job!",
        text: "Add to cart successfuly!",
        icon: "success"
      });
    }
  }
  return (
    <>{loading ? <Spinner /> : <>
      <div className="application">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Wish list</title>
        </Helmet>
      </div>
      <div className="container bg-light p-5 mt-5 ">
        {wishlistdata.length === 0 ? (
          <h2>Your wishlist is empty.</h2>
        ) : (Array.isArray(wishlistdata) && wishlistdata.map((el) => {
          return <>
            <div className="row p-4 border-bottom border-3 align-items-center">
              <div className="col-md-10">
                <div className="row align-items-center">
                  <div className="col-md-1">
                    <img src={el.imageCover} className='w-100' alt="" />
                  </div>
                  <div className="col-md-10 text-sm-center text-md-start">
                    <h6 className='text-main'>{el.title}</h6>
                    <h5 className=' text-muted'>Price:{el.price}</h5>
                    <div className='text-danger cursor-pointer' onClick={() => removeItem(el.id)}>
                      <i className='fa-solid fa-trash'></i><span >Remove </span></div>
                  </div>
                </div>
              </div>
              <div className="col-md-2 ">
                <button className='btn bg-main text-white' onClick={() => AddToCart(el.id)}>Add to cart</button>
              </div>
            </div>
          </>
        }))}
        <></>


      </div></>}
    </>
  )
}