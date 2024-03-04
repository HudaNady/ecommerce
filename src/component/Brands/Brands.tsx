import axios from 'axios';
import React, { useState } from 'react'
import { useQuery } from 'react-query';
import Spinner from '../Spinner/Spinner';
import { AllBrands } from '../../interfaces/allBrands';
import { Helmet } from 'react-helmet';
export default function Brands() {
  const [currentIndex, setCurrentIndex] = useState<any>();
  const [boxContainerDisplay, setBoxContainerDisplay] = useState(false);
  let modelClose = () => {
    setBoxContainerDisplay(false);
  }
  let { isLoading, data } = useQuery(['BrandsApi'], getBrands);
  function getBrands() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands');
  }
  let brands: AllBrands = data?.data
  let brandsList = Array.isArray(brands?.data) ? brands?.data : [];
  let getSupDetails = (index?: any) => {
    setCurrentIndex(index);
    setBoxContainerDisplay(true);
    console.log(index)
  }

  return (
    <>{isLoading ? <Spinner /> : <>
      <div className="application">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Brands</title>
        </Helmet>
      </div>
      <div className=' container ' key={"567"}>
        <div className='row g-4 mt-4'>
          {brandsList?.map((el, index) => {
            return <>
              <div className="col-md-3 " key={el._id}>
                <div className='category border border-2 rounded-2 overflow-hidden text-center' onClick={() => getSupDetails(index)}  >
                  <img src={el.image} className='w-100' height={200} alt="" />
                  <h6 className='fw-bold py-3'>{el.name}</h6>
                </div>
              </div>
            </>
          })}
        </div>
      </div>
      <div id="boxContainer" className={boxContainerDisplay ? 'd-flex' : 'd-none'} >
        <div id="innerBox" className='innerBox ' >
          <div className='d-flex justify-content-between align-items-center my-2 container '>
            <h3 className='text-main fw-bold'>{brandsList[currentIndex]?.name} Brand</h3>
            <i className="fa-solid fa-xmark fa-2x text-muted cursor-pointer" onClick={modelClose}></i>
          </div>
          <hr />
          <div className='row'>
            <div className='col-md-6 mx-auto text-center '>
              <img src={brandsList[currentIndex]?.image} className='w-100' alt="" />
              <p>{brandsList[currentIndex]?.slug}</p>
            </div>
          </div>

        </div>
      </div>
    </>}

    </>
  );
}