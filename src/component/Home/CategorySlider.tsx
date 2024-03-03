import axios from 'axios';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import React from 'react'
import { useQuery } from 'react-query';
import { Categories } from '../../interfaces/category';

export default function CategorySlider() {
    let { isLoading, data } = useQuery(['categoryApi'], getCategory);
    function getCategory() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
    }
    let category: Categories = data?.data
    let categoryList = category?.data
    return (
        <><h2 className='p-2'>Categories</h2>
        {isLoading?"":<OwlCarousel className='owl-theme' loop  items={6}>
            {categoryList?.map((el)=>{
                return<div className='item' key={el._id}>
                <img src={el.image} className='w-100' height={250} alt="" />
            </div>
            })}
            </OwlCarousel>}
        
        </>
    )
}
