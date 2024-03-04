import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
export default function Register() {
    let navg =useNavigate() 
    let [errmessage,setErr]=useState("")
    let [loading,setLoading]=useState(true)
    interface Values {
        email: string;
        newPassword: string;
    }
    let validationSchema=Yup.object({
        email:Yup.string().required('Email is required').matches(/\w+@\w+\.\w+/,"Email not valid *exemple@yyy.zzz"),
        newPassword:Yup.string().required('Password is required').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,"Enter valid password *Minimum eight characters, at least one letter and one number:*")
    })
    let formik=useFormik<Values>({
        initialValues:{
            email:'',
            newPassword: ''
        },
        onSubmit: (values) => {
            ResetForm(values);
        },
        validationSchema
    })
    async function ResetForm(values:any){
        setLoading(false)
        let req=  await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword",values).catch(function(err){
            setErr(err.response.data.message)
            console.log(errmessage)
            })
        if(req?.data.token){
            navg("/login")
        }
        setLoading(true)
    }
    function BacktoVerifyCode(){
        navg("/forgetPass")
    }
    return (
    <>
    <div className="application">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>Reset password</title>
                </Helmet>
            </div>
    <h2 className='my-3 text-main'>Reset password.......</h2>
    {errmessage===""?'':<div className=' alert alert-danger'>{errmessage}</div>}
    <form className='container' action="" onSubmit={formik.handleSubmit}>
        <div className='mb-2'>
        <label htmlFor="email">Email:</label>
        <input type="email" name='email' id='email' className=' form-control' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.errors.email&&formik.touched.email?<div className=' alert alert-danger'>{formik.errors.email}</div>:""}
        </div>
        <div className='mb-2'>
        <label htmlFor="newPassword">New password:</label>
        <input type="password" name='newPassword' id='newPassword' className=' form-control' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
        {formik.errors.newPassword&&formik.touched.newPassword?<div className=' alert alert-danger'>{formik.errors.newPassword}</div>:""}
        </div>
        {errmessage!==""?<button className='btn bg-main text-white' onClick={BacktoVerifyCode}>Verify Code</button>:<><div className=' d-flex justify-content-between '>
            {loading? <button type='submit' disabled={!(formik.isValid&&formik.dirty)} className='btn bg-main text-white mt-2 px-5'>Reset Password</button> :<button className='btn bg-main text-white mt-2 px-5'><i className=' fa-solid fa-spinner fa-spin'></i></button> }
        </div></>}
    </form>
    </>
    )
}
