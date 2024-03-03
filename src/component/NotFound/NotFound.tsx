import React from 'react'
import image from '../../assets/images/error.svg'
import { Helmet } from 'react-helmet'

export default function NotFound() {
    return <>
        <div className="application">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Forget password</title>
            </Helmet>
        </div>
        <div className='w-75 mx-auto'>
            <img src={image} className='w-100 ' alt="" />
        </div>
    </>
}
