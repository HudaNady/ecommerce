import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import * as Yup from 'yup'
import { CartContext } from '../../context/CartContext'
import { Helmet } from 'react-helmet'


export default function CheckOut() {
    let { id } = useParams()
    let { checkOut } = useContext(CartContext)
    let [errmessage, setErr] = useState("")
    let [loading, setLoading] = useState(true)
    interface Values {
        details: string;
        city: string;
        phone: string
    }
    let validationSchema = Yup.object({
        city: Yup.string().required('City is required').matches(/^\w{3,20}$/),
        details: Yup.string().required('Details is required').matches(/^\w{3,}$/),
        phone: Yup.string().required('Phone is required').matches(/^01[1250][0-9]{8}$/, "Enter valid phone")
    })
    let formik = useFormik<Values>({
        initialValues: {
            details: "",
            phone: "",
            city: ""
        },
        onSubmit: (values) => {
            checkOutPayment(values)
        },
        validationSchema
    })
    async function checkOutPayment(val: any) {
        setLoading(false)
        let req = await checkOut(id, val).catch(function (err: any) {
            setErr(err.response.data.message)
            console.log(errmessage)
        })
        console.log(req)
        if (req?.data.status === "success") {
            window.open(req?.data?.session.url, "_selfl")
        }
        setLoading(true)
    }
    return (
        <>
            <div className="application">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Check out</title>
                </Helmet>
            </div>
            {errmessage === "" ? '' : <div className=' alert alert-danger'>{errmessage}</div>}
            <form className='container' action="" onSubmit={formik.handleSubmit}>
                <div className='mb-2'>
                    <label htmlFor="city">City:</label>
                    <input type="text" name='city' id='city' className=' form-control' onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.errors.city && formik.touched.city ? <div className=' alert alert-danger'>{formik.errors.city}</div> : ""}
                </div>
                <div className='mb-2'>
                    <label htmlFor="phone">Phone:</label>
                    <input type="tel" name='phone' id='phone' className=' form-control' onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.errors.phone && formik.touched.phone ? <div className=' alert alert-danger'>{formik.errors.phone}</div> : ""}
                </div>
                <div className='mb-2'>
                    <label htmlFor="details">Details:</label>
                    <input type="text" name='details' id='details' className=' form-control' onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.errors.details && formik.touched.details ? <div className=' alert alert-danger'>{formik.errors.details}</div> : ""}
                </div>
                {loading ? <button type='submit' disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-white mt-2 px-5 w-100'>Pay <i className='fa-brands fa-cc-visa'></i></button> : <button className='btn bg-main text-white mt-2 px-5'><i className=' fa-solid fa-spinner fa-spin'></i></button>}
            </form>
        </>
    )
}
