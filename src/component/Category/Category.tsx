import axios from 'axios';
import React from 'react'
import { useQuery } from 'react-query';
import { Categories } from '../../interfaces/category';
import Spinner from '../Spinner/Spinner';
import { Helmet } from 'react-helmet';

export default function Category() {
  let { isLoading, data } = useQuery(['cateroeyApi'], getCategory);
  function getCategory() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }
  let category: Categories = data?.data
  let categoryList = category?.data
  return (
    <>{isLoading ? <Spinner /> : <>
      <div className="application">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Category</title>
        </Helmet>
      </div>
      <div className=' container 'key={"676"} >
        <div className='row g-4 mt-4'>
          {categoryList?.map((el) => {
            return <>
              <div className="col-md-4 " key={el._id}>
                <div className='category border border-2 rounded-2 overflow-hidden text-center'>
                  <img src={el.image} className='w-100' height={300} alt="" />
                  <h3 className='text-main py-3'>{el.name}</h3>
                </div>
              </div>
            </>
          })}
        </div>
      </div></>}


    </>
  )
}
