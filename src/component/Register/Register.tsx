import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'

export default function Register() {
    let navg = useNavigate()
    let [errmessage, setErr] = useState("")
    let [loading, setLoading] = useState(true)
    interface Values {
        name: string;
        email: string;
        password: string;
        rePassword: string;
        phone: string
    }
    let validationSchema = Yup.object({
        name: Yup.string().required('Name is required').matches(/^[A-Z][a-z]{2,20}$/,"Special characters and numbers not allowed"),
        email: Yup.string().required('Email is required').matches(/\w+@\w+\.\w+/, "Email not valid *exemple@yyy.zzz"),
        password: Yup.string().required('Password is required').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, "Enter valid password *Minimum eight characters, at least one letter and one number:*"),
        rePassword: Yup.string().required('Repassword is required').oneOf([Yup.ref("password")], "Repassword not match"),
        phone: Yup.string().required('Phone is required').matches(/^01[1250][0-9]{8}$/, "Enter valid phone ")
    })
    let formik = useFormik<Values>({
        initialValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            phone: ''
        },
        onSubmit: (values) => {
            RegisterForm(values)
        },
        validationSchema
    })
    async function RegisterForm(values: any) {
        setLoading(false)
        let req = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values).catch(function (err) {
            setErr(err.response.data.message)
            console.log(errmessage)
        })
        if (req?.data.message === "success") {
            navg("/login")
        }
        setLoading(true)
    }

    return (
        <>
            <div className="application">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Register</title>
                </Helmet>
            </div>
            <h2 className='my-3 text-main'>Register now.......</h2>
            {errmessage === "" ? '' : <div className=' alert alert-danger'>{errmessage}</div>}
            <form className='container' action="" onSubmit={formik.handleSubmit}>
                <div className='mb-2'>
                    <label htmlFor="name">Name:</label>
                    <input type="text" name='name' id='name' className=' form-control' onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.errors.name && formik.touched.name ? <div className=' alert alert-danger'>{formik.errors.name}</div> : ""}
                </div>
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
                <div className='mb-2'>
                    <label htmlFor="rePassword">rePassword:</label>
                    <input type="password" name='rePassword' id='rePassword' className=' form-control' onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.errors.rePassword && formik.touched.rePassword ? <div className=' alert alert-danger'>{formik.errors.rePassword}</div> : ""}
                </div>
                <div className='mb-2'>
                    <label htmlFor="phone">Phone:</label>
                    <input type="tel" name='phone' id='phone' className=' form-control' onChange={formik.handleChange} onBlur={formik.handleBlur} />
                    {formik.errors.phone && formik.touched.phone ? <div className=' alert alert-danger'>{formik.errors.phone}</div> : ""}
                </div>
                {loading ? <button type='submit' disabled={!(formik.isValid && formik.dirty)} className='btn bg-main text-white mt-2 px-5'>Register</button> : <button className='btn bg-main text-white mt-2 px-5'><i className=' fa-solid fa-spinner fa-spin'></i></button>}
            </form>
        </>
    )
}
