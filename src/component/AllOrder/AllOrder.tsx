import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../context/CartContext'
import Spinner from '../Spinner/Spinner'
import { CartItem, UserAllOrder } from '../../interfaces/allUserOrder'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default function AllOrder() {
    let { getAllUserOrder } = useContext(CartContext)
    let [allorderdata, setallorderdata] = useState<UserAllOrder>()
    let [cartItem, setcartItem] = useState<CartItem>()

    let [loading, setLoading] = useState(false)
    useEffect(() => {
        getUserOrder();
    }, [])
    async function getUserOrder() {
        setLoading(true)
        let req = await getAllUserOrder().catch((err: any) => {
            console.log(err)
        })


        if (req.data != null) {
            setallorderdata(req?.data)
            setcartItem(req?.data.data)
            setLoading(false)
            console.log(req.data)
            console.log("helooo")
        }
    }



    return (
        <>{loading ? <Spinner /> : <>
            <div className="application">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>All orders</title>
                </Helmet>
            </div>
            <div className="container bg-light p-5 mt-5 ">
                {allorderdata != null ? <>
                    {Array.isArray(allorderdata) && allorderdata.map((el, index) => {
                        return <>
                            <div className="row p-4 g-3 flex-wrap align-items-center shadow border-bottom border-3 bg-light ">
                                <h4 className='fw-bold text-muted my-2 '>Order {index + 1}</h4>
                                <div className="col-md-6 ">
                                    <h5 className='text-main'>Order items</h5>
                                    <div className="d-flex gap-3   ">
                                        {el.cartItems.map((ele: any) => {
                                            return <>
                                                <div className="col-md-4 flex-wrap shadow d-flex flex-column justify-content-center align-items-center p-2 border-2 border ">
                                                    <img src={ele.product.imageCover} className='w-50 mx-auto' alt="" />
                                                    <h6 className='text-muted mb-0'>{ele.product.category.name}</h6>
                                                    <p className='mb-0 text-main  '>{ele.product.title.split(' ').slice(0, 2).join(' ')}</p>
                                                    <span className=''>{ele.product.brand.name}</span>
                                                    <span className=' text-muted '>Price: {ele.price}</span>
                                                    <span className=' text-muted '>Quantity: {ele.count}</span>
                                                </div></>
                                        })}
                                    </div>
                                </div>
                                <div className="col-md-4 ">
                                    <h5 className='text-main'>Order details</h5>
                                    <div>
                                        <p className='fw-bold'>Name:<span className=' fw-normal text-muted'>{el.user.name}</span></p>
                                        <p className='fw-bold'>Email:<span className=' fw-normal text-muted'>{el.user?.email}</span></p>
                                        <p className='fw-bold'>Phone:<span className=' fw-normal text-muted'>{el.user.phone}</span></p>
                                        <p className='fw-bold'>City:<span className=' fw-normal text-muted'>{el.shippingAddress?.city}</span></p>
                                        <p className='fw-bold'>Total order price:<span className=' fw-normal text-muted'>{el.totalOrderPrice}</span></p>
                                        <p className='fw-bold'>Payment method:<span className=' fw-normal text-muted'>{el.paymentMethodType}</span></p>
                                    </div>
                                </div>
                            </div>
                        </>
                    })}
                </> : <><h4>You haven't any order</h4>
                    <Link className='btn bg-main text-white  ' to='/products'>Order now</Link></>

                }
            </div>
        </>}
        </>
    )
}
