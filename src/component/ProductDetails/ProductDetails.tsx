import axios from 'axios';
import React, { useContext } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import { Productdetails } from '../../interfaces/productDetails';
import Spinner from '../Spinner/Spinner';
import { CartContext } from '../../context/CartContext';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
export default function ProductDetails() {
    let { addCart, setnumItem } = useContext(CartContext)
    let { id } = useParams()
    let { isLoading, data } = useQuery(['productdetailsApi'], getProductDetails);
    function getProductDetails() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    }
    let getData: Productdetails = data?.data
    let details = getData?.data
    console.log(getData)
    let imgs = document.querySelectorAll("img")
    imgs.forEach((el) => {
        el.addEventListener('click', function (e: any) {
            let path = e?.target?.getAttribute('src')
            document.getElementById("myImage")?.setAttribute('src', path)
        })
    })
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
            Swal.fire({
                title: "Good job!",
                text: "Add to cart successfuly!",
                icon: "success"
            });
        }
    }
    return (<>
        {isLoading ? <><Spinner /></> : <>
            <div className="application">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>{details?.title}</title>
                </Helmet>
            </div>
            <div className=' container pt-5 mt-5'>
                <div className='row  align-items-center mt-5'>
                    <div className=' col-md-3 '>
                        <div className='row align-items-center gx-0'>
                            <div className="col-md-2">
                                {details?.images?.map((el) => {
                                    return <img src={el} className='w-100 img' alt="" />
                                })}

                            </div>
                            <div className='col-md-10'>
                                <img src={details?.imageCover} id='myImage' className='w-100' alt="" />
                            </div>
                        </div>
                    </div>
                    <div className=' col-md-9'>
                        <h2>{details?.title}</h2>
                        <p>{details?.description}</p>
                        <h6 className='text-main'>{details?.category?.name}</h6>
                        <div className='d-flex justify-content-between p-2'>
                            <span>{details?.price} EGP</span>
                            <span>
                                <i className='fa-solid fa-star rating-color'></i>
                                {details?.ratingsAverage}
                            </span>
                        </div>
                        <button className='btn bg-main text-white d-block w-100 mt-3' onClick={() => AddToCart(details._id)}>Add to cart</button>
                    </div>
                </div>
            </div></>}

    </>

    )
}
