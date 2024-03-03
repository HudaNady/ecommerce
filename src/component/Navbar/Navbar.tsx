import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Img from '../../assets/images/freshcart-logo.svg'
import { UserContext } from '../../context/Usercontext'
import { CartContext } from '../../context/CartContext'


export default function Navbar() {
    let {numItem}=useContext(CartContext)
    let {userToken,setuserToken }=useContext(UserContext)
    let navg=useNavigate()
    function LogOut(){
        localStorage.removeItem("userToken")
        setuserToken(null)
        navg("/login")
    }
    return <>
        <nav className='navbar navbar-expand-lg bg-body-tertiary fixed-top '>
            <div className="container-fluid mx-3 ">
                <Link className="navbar-brand  fw-bolder" to=""><img src={Img} alt="" /></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {userToken!=null?<ul className="navbar-nav  me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className={({ isActive }) => isActive ? "activ nav-link  " : "nav-link "} to="home">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={({ isActive }) => isActive ? "activ nav-link  " : "nav-link "} to="brands">Brands</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={({ isActive }) => isActive ? "activ nav-link  " : "nav-link "} to="products">Products</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={({ isActive }) => isActive ? "activ nav-link  " : "nav-link "} to="category">Categories</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={({ isActive }) => isActive ? "activ nav-link  " : "nav-link "} to="wishList">Wish List</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className={({ isActive }) => isActive ? "activ nav-link  " : "nav-link "} to="cart">Cart</NavLink>
                        </li>
                    </ul>:""}
                    <ul className="navbar-nav  ms-auto mb-2 mb-lg-0 align-items-md-center">
                        <li className="nav-item me-3">
                        <i className="fa-brands fa-facebook pe-2 "></i>
                        <i className="fa-brands fa-twitter p-2 "></i>
                        <i className="fa-brands fa-linkedin-in p-2 "></i>
                        <i className="fa-brands fa-youtube  p-2 "></i>
                        <i className="fa-brands fa-instagram  p-2 "></i>
                        </li>
                        {userToken!=null?<><li className="nav-item">
                            <NavLink to="cart"><i className='fa-solid fa-cart-shopping text-main p-1 me-2 cursor-pointer position-relative'>
                            <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle text-white numitem">
                                {numItem}
                            </span>
                            </i>
                            </NavLink>
                            </li>
                            <li className="nav-item">
                            <NavLink className={({ isActive }) => isActive ? "activ nav-link  " : "nav-link "} to="allorders">All Order</NavLink>
                            </li>
                            <li className="nav-item">
                                <span className="nav-link cursor-pointer" onClick={LogOut} >LogOut</span>
                            </li></> :<>
                            <li className="nav-item">
                                <NavLink className={({ isActive }) => isActive ? "activ nav-link  " : "nav-link "} to="">Register</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className={({ isActive }) => isActive ? "activ nav-link  " : "nav-link "} to="login">Login</NavLink>
                            </li></> }
                        
                        
                    </ul>


                </div>
            </div>
        </nav>
    </>
}
