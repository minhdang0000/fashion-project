import React, {useContext, useEffect, useState} from 'react'
import {ShopContext} from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate để điều hướng

const RelatedProducts = ({category,subCategory}) => {


  const { products } = useContext(ShopContext);
  const [related,setRelated] = useState([]);
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng
  const location = useLocation(); // Sử dụng useLocation để lấy thông tin location hiện tại

  useEffect(() =>{

    if(products.length > 0) {
      let productsCopy = products.slice()

      productsCopy = productsCopy.filter((item) => category === item.category);
      productsCopy = productsCopy.filter((item) => subCategory === item.subCategory);

      setRelated(productsCopy.slice(0,5));
    }

  },[products, category, subCategory]); //Thêm category và subCategory vào dependency array để cập nhật khi thay đổi

  const handleProductClick = (id) => {
    navigate(`/product/${id}`); // Điều hướng đến trang sản phẩm
    window.scrollTo({top: 0, behavior: 'smooth'}); // Cuộn trang lên đầu
  };

   useEffect(() => {
    window.scrollTo({top: 0, behavior: 'smooth'}); // Cuộn trang lên đầu
  }, [location]);

  return (
    <div className="my-24">
      <div className='text-center text-2xl py-2'>
        <Title text1={'SẢN PHẨM'} text2={"LIÊN QUAN"} />
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {related.map((item,index)=>(
          <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image} onClick={()=>handleProductClick(item._id)} />
        ))}
      </div>
    </div>
  )
}

export default RelatedProducts
