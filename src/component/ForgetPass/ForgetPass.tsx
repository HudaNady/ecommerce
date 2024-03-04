import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'

export default function ForgetPass() {
    let [errmessage, setErr] = useState("")
    let [succmessage, setSucc] = useState("")
    let [formState, setformState] = useState(true)
    let [loading, setLoading] = useState(true)
    let navg = useNavigate()
    interface Values {
        email: string;
    }
    interface Value {
        resetCode: string;
    }
    let validationSchema1 = Yup.object({
        email: Yup.string().required("Email is required").matches(/\w+@\w+\.\w+/, 'Email not valid *exemple@yyy.zzz')
    })
    let validationSchema2 = Yup.object({
        resetCode: Yup.string().required("Code is required").matches(/^[0-9]{5,6}$/, 'Enter valid code')
    })
    let formik1 = useFormik<Values>({
        initialValues: {
            email: '',

        },
        onSubmit: (values) => {
            Forgetinput(values);
        },
        validationSchema: validationSchema1
    })
    let formik2 = useFormik<Value>({
        initialValues: {
            resetCode: '',

        },
        onSubmit: (value) => {
            RestCode(value);
        },
        validationSchema: validationSchema2
    })
    async function RestCode(value: any) {
        setLoading(false)
        let req = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", value).catch(function (err) {
            setErr(err.response.data.message)
            console.log(errmessage)
        })
        if (req?.data.status === "Success") {
            navg("/resetpass")
        }
        console.log(req)
        setLoading(true)
    }
    async function Forgetinput(values: any) {
        setLoading(false)
        let req = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values).catch(function (err) {
            setErr(err.response.data.message)
        })
        if (req?.data?.statusMsg === "success") {
            console.log(req.data)
            setSucc(req.data.message)
            setformState(false)
        }
        setLoading(true)
    }
    return (
        <div>
            <div className="application">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Forget password</title>
                </Helmet>
            </div>
            <h2 className='my-3 text-main'>Forget password.....</h2>
            {errmessage === "" ? '' : <div className=' alert alert-danger'>{errmessage}</div>}
            {formState ? <>
                <form action="" onSubmit={formik1.handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="Email">Enter your email:</label>
                        <input type="email" name='email' className=' form-control' onChange={formik1.handleChange} onBlur={formik1.handleBlur} />
                        {formik1.errors.email && formik1.touched.email ? <div className=' alert alert-danger'>{formik1.errors.email}</div> : ""}
                    </div>
                    {loading ? <button type='submit' disabled={!(formik1.isValid && formik1.dirty)} className='btn bg-main text-white mt-2 px-5'>Send</button> : <button className='btn bg-main text-white mt-2 px-5'><i className=' fa-solid fa-spinner fa-spin'></i></button>}
                </form></> : <><form action="" onSubmit={formik2.handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="code">{succmessage}:</label>
                        <input type="text" id='code' name='resetCode' className=' form-control mt-2' onChange={formik2.handleChange} onBlur={formik2.handleBlur} />
                        {formik2.errors.resetCode && formik2.touched.resetCode ? <div className=' alert alert-danger'>{formik2.errors.resetCode}</div> : ""}
                    </div>
                    {loading ? <button type='submit' disabled={!(formik2.isValid && formik2.dirty)} className='btn bg-main text-white mt-2 px-5'>Verify Reset Code</button> : <button className='btn bg-main text-white mt-2 px-5'><i className=' fa-solid fa-spinner fa-spin'></i></button>}
                </form></>}


        </div>
    )
}
