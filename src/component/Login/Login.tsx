import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { UserContext } from '../../context/Usercontext';
import { CartContext } from '../../context/CartContext';
import { Helmet } from 'react-helmet';

export default function Register() {
    let { getUserCart, setnumItem } = useContext(CartContext)
    let { setuserToken, userToken } = useContext(UserContext)
    let navg = useNavigate()
    let [errmessage, setErr] = useState("")
    let [loading, setLoading] = useState(true)
    interface Values {
        email: string;
        password: string;
    }
    let validationSchema = Yup.object({
        email: Yup.string().required('Email is required').matches(/\w+@\w+\.\w+/, "Enter valid email"),
        password: Yup.string().required('Password is required').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Enter valid password")
    })
    let formik = useFormik<Values>({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: (values) => {
            LoginForm(values);
        },
        validationSchema
    })
    async function LoginForm(values: any) {
        setLoading(false)
        let req = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values).catch(function (err) {
            setErr(err.response.data.message)
            console.log(errmessage)
        })
        if (req?.data?.message === "success") {
            console.log(req.data)
            localStorage.setItem("userToken", req.data.token)
            setuserToken(req.data.token)
            getUserData()
            console.log(userToken)
            navg("/home")
        }
        setLoading(true)
    }
    async function getUserData() {
        let req = await getUserCart()
        console.log(req)
        if (req.data.status === 'success') {
            setnumItem(req.data.numOfCartItems)
        }
    }

    return (
        <>
            <div className="application">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Login</title>
                </Helmet>
            </div>
            <h2 className='my-3 text-main'>Login now.......</h2>
            {errmessage === "" ? '' : <div className=' alert alert-danger'>{errmessage}</div>}
            <form className='container' action="" onSubmit={formik.handleSubmit}>
                <div className='mb-2'>
                    <label htmlFor="email">Email:</label>
                    <input type="email" name='email' id='email' className=' form-control' onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.errors.email && formik.touched.email ? <div className=' alert alert-danger'>{formik.errors.email}</div> : ""}
                </div>
                <div className='mb-2'>
                    <label htmlFor="password">password:</label>
                    <input type="password" name='password' id='password' className=' form-control' onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.errors.password && formik.touched.password ? <div className=' alert alert-danger'>{formik.errors.password}</div> : ""}
                </div>
                <div className=' d-flex justify-content-between '>
                    <Link to="/forgetPass" className='cursor-pointer fw-bold '>For get password.....?</Link>
                    {loading ? <button type='submit' disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-white mt-2 px-5'>Login</button> : <button className='btn bg-main text-white mt-2 px-5'><i className=' fa-solid fa-spinner fa-spin'></i></button>}
                </div>
            </form>
        </>
    )
}
