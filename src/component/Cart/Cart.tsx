import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../context/CartContext'
import { CartOrdes, ProductElement } from '../../interfaces/cartOrder'
import Spinner from '../Spinner/Spinner'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
export default function Cart() {
  let { getUserCart, removeUserCart, clearUserCart, update, setnumItem } = useContext(CartContext)
  let [cartdata, setcartdata] = useState<CartOrdes | null>(null)
  let [cartlist, setcartlist] = useState<ProductElement>()
  let [loading, setLoading] = useState(false)
  let [updateloading, setUpdateLoading] = useState(false)

  useEffect(() => {
    getUserData();
  }, [])
  async function updataCart(id: string, count: any) {
    setUpdateLoading(true)
    if (count === 0) {
      removeItem(id)
    } else {
      let req = await update(id, count).catch((err: any) => {
        console.log(err)
      })
      if (req?.data?.status === "success") {
        setcartdata(req?.data)
        console.log(cartdata)
        setLoading(false)
        setUpdateLoading(false)
      }
      console.log(req)
    }

  }
  async function getUserData() {
    setLoading(true)
    let req = await getUserCart().catch((err: any) => {
      console.log(err)
    })
    if (req?.data?.status === "success") {
      console.log(req)
      setcartdata(req?.data)
      setcartlist(req?.data.product)
      setLoading(false)
    } else {
      setLoading(false)
      setnumItem(0)
    }
  }
  async function removeItem(id: string) {
    setLoading(true)
    let req = await removeUserCart(id).catch((err: any) => {
      console.log(err)
    })
    if (req?.data?.status === "success") {
      setcartdata(req?.data)
      setnumItem(req?.data?.numOfCartItems)
      console.log(cartdata)
      setLoading(false)
    }
  }
  async function clearCart(id?: string) {
    setLoading(true)
    let req = await clearUserCart().catch((err: any) => {
      console.log(err)
    })
    if (req?.data?.message === "success") {
      setcartdata(null)
      setnumItem(req?.data.numOfCartItems)
      console.log(cartdata)
      setLoading(false)
    }
  }
  return (
    <>{loading ? <Spinner /> : <>
      <div className="application">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Cart</title>
        </Helmet>
      </div>
      <div className="container bg-light p-5 mt-5 " key={"3475"}>
        {cartdata != null ? <>  <button className='btn bg-danger text-white mt3  text-sm-center text-md-start' onClick={() => clearCart(cartlist?._id)} >Clear cart</button>
          {cartdata?.data?.products.map((el) => {
            return <>
              <div className="row p-4 border-bottom border-3 align-items-center">
                <div className="col-md-10 text-md-start  text-sm-center">
                  <div className="row align-items-center ">
                    <div className="col-md-1 mb-2">
                      <img src={el.product.imageCover} className='w-100' alt="" />
                    </div>
                    <div className="col-md-10">
                      <h6 className='text-main'>{el.product.title}</h6>
                      <h5 className=' text-muted'>Price:{el.price}</h5>
                      <button className='btn btn-danger mb-3' onClick={() => removeItem(el.product._id)}>Remove <i className='fa-solid fa-trash'></i></button>
                    </div>
                  </div>
                </div>
                <div className="col-md-2 text-center ">
                  <span className='btn btn-sm bg-main' onClick={() => updataCart(el.product._id, el.count + 1)}>
                    <i className='fa-solid  fa-plus text-white'></i>
                  </span>
                  <span className='mx-2 fw-bold'>
                    {el.count}
                  </span>
                  <span className='btn btn-sm bg-danger'>
                    <i className='fa-solid fa-minus text-white' onClick={() => updataCart(el.product._id, el.count - 1)}></i>
                  </span>

                </div>
              </div>
            </>
          })}
          <div className=' text-sm-center text-md-start'>
          <h5 className='text-main mt-3'>Total price:{cartdata?.data?.totalCartPrice}</h5>
          <Link className='btn bg-main text-white  ' to={`/checkout/${cartdata.data._id}`}>Check out your order</Link></div></> : <><div className='text-sm-center text-md-start'>
          <h4>Cart is impty</h4>
          <Link className='btn bg-main text-white  ' to='/products'>Order now</Link></div></>}
      </div>
    </>}
    </>
  )
}
