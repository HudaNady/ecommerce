import axios, { AxiosResponse } from 'axios';
import { Datum, Products } from '../../interfaces/allProduct';
import Spinner from '../Spinner/Spinner';
import { useQuery } from 'react-query';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';
import Swal from 'sweetalert2';
import { WishListContext } from '../../context/WishListContext';
import { Data } from '../../interfaces/wish';
import { Helmet } from 'react-helmet';

export default function Home() {
  let { addWishList, getALLWishList, removeUserwishlist, iconColor, seticonColor } = useContext(WishListContext)
  let { addCart, setnumItem } = useContext(CartContext)
  let [wishlistdata, setwishlistdata] = useState<Data[]>([])
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const { isLoading, data } = useQuery(['productApi', page], getAllProducts);

  async function getAllProducts(queryData: any): Promise<AxiosResponse<Products>> {
    const response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?page=${queryData.queryKey[1]}`
    );
    return response.data;
  }

  function getPageNum(event: any) {
    const page = event.target.getAttribute('id');
    setPage(page);
  }

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setSearchTerm(value);
  }

  const productslist = Array.isArray(data?.data) ? data?.data : [];
  const filteredProducts = productslist?.filter(
    (product: Datum) =>
      product.title.toLowerCase().startsWith(searchTerm.toLowerCase())
  );
  async function AddToCart(id: string) {
    let req = await addCart(id).catch((err: any) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
    })
    if (req.data.status === 'success') {
      setnumItem(req.data.numOfCartItems)
      Swal.fire({
        title: "Good job!",
        text: "Add to cart successfuly!",
        icon: "success"
      });
    }
  }
  async function AddToWishList(id: string) {
    let isProductInWishlist = wishlistdata.some((item) => item._id === id);

    if (isProductInWishlist) {
      seticonColor((prevIconColor: Record<string, boolean>) => ({ ...prevIconColor, [id]: true })); return;
    }
    let response = await addWishList(id).catch((err: any) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>'
      });
    })
    if (response?.data?.status === 'success') {
      seticonColor((prevIconColor: Record<string, boolean>) => ({ ...prevIconColor, [id]: true }));
      Swal.fire({
        title: "Good job!",
        text: "Add to wishList successfuly!",
        icon: "success"
      });
    }
    console.log(response?.data)
  }
  async function getALLWish() {
    let req = await getALLWishList().catch((err: any) => {
      console.log(err)
    })
    if (req?.data?.status === "success") {
      setwishlistdata(req?.data.data)
      console.log(req)
    }
  }
  async function removeItem(id: string) {
    let req = await removeUserwishlist(id).catch((err: any) => {
      console.log(err)
    })
    if (req?.data?.status === "success") {
      seticonColor((prevIconColor: any) => ({ ...prevIconColor, [id]: false }));
      let updatewishlist = wishlistdata.filter((item) => item._id !== id);
      setwishlistdata(updatewishlist)
      console.log(req)
    }
  }
  useEffect(() => {
    getALLWish();
  }, [])
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <div className="application">
            <Helmet>
              <meta charSet="utf-8" />
              <title>prodcts</title>
            </Helmet>
          </div>
          <div className='container-fluid mt-5'>
            <input
              type='text'
              className='form-control w-75 mx-auto my-5'
              placeholder='Search........'
              value={searchTerm}
              onChange={handleSearch}
            />
            <div className='row g-4'>
              {filteredProducts?.map((el: Datum) => (
                <div className='col-md-2' key={el.id}>
                  <div className='product position-relative'>
                    <Link to={`/productDetails/${el.id}`}>
                      <img src={el.imageCover} className='w-100' alt='' />
                      <h6 className='text-main p-2'>{el.category.name}</h6>
                      <h3 className='h6 fw-bold p-2'>{el.title.split(' ').slice(0, 2).join(' ')}</h3>
                      <div className='d-flex justify-content-between p-2'>
                        <span>{el.price} EGP</span>
                        <span>
                          <i className='fa-solid fa-star rating-color'></i>
                          {el.ratingsAverage}
                        </span>
                      </div>
                    </Link>
                    <div className='fav'>
                      <div>{iconColor[el._id] ? <span >
                        <i className="fa-solid fa-heart text-main fs-4 position-absolute top-0 end-0 m-1" onClick={() => removeItem(el.id)}></i>
                      </span> : <span >
                        <i className="fa-regular fa-heart text-main fs-4 position-absolute top-0 end-0 m-1" onClick={() => AddToWishList(el._id)}></i>
                      </span>}</div>
                    </div>
                    <button className='btn bg-main text-white d-block w-100 mt-3' onClick={() => AddToCart(el._id)}>Add to cart</button>
                  </div>
                </div>
              ))}
            </div>
            <nav>
              <ul className='pagination justify-content-center mt-3'>
                <li className='page-item'>
                  <span className='page-link text-main cursor-pointer' id='1' onClick={getPageNum}>
                    1
                  </span>
                </li>
                <li className='page-item'>
                  <span className='page-link text-main cursor-pointer' id='2' onClick={getPageNum}>
                    2
                  </span>
                </li>
              </ul>
            </nav>
          </div>
        </>
      )}
    </>
  );
}