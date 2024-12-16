import React, {useContext, useEffect, useState} from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {

  const {products, search, showSearch} = useContext(ShopContext);
  const [showFilter,setShowFilter] = useState(false);
  const [filterProducts,setFilterProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(28); // Số lượng sản phẩm hiển thị ban đầu
  const [category,setCategory] = useState([]);
  const [subCategory,setSubCategory] = useState([]);
  const [sortType,setSortType] = useState('relavent');
  const [loading, setLoading] = useState(false); // Trạng thái tải sản phẩm

  const toggleCategory = (e) =>{
    if(category.includes(e.target.value)){
      setCategory(prev=> prev.filter(item => item !== e.target.value))
    }
    else{
      setCategory(prev => [...prev,e.target.value])
    }

  }

  const toggleSubCategory = (e) => {
    if(subCategory.includes(e.target.value)){
      setSubCategory(prev=> prev.filter(item => item !== e.target.value))
    }
    else{
      setSubCategory(prev => [...prev,e.target.value])
    }
  }

  const applyFilter = () => {

    let productsCopy = products.slice();

    if(showSearch && search){
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if(category.length > 0){
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if(subCategory.length > 0){
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }    

    setFilterProducts(productsCopy)
  }

  const sortProduct = () => {

    let fpCopy = filterProducts.slice();

    switch (sortType){
      case 'low-high':
        setFilterProducts(fpCopy.sort((a,b)=>(a.price - b.price)));
        break;

      case 'high-low':
        setFilterProducts(fpCopy.sort((a,b)=>(b.price - a.price)))
        break;
      
      default:
        applyFilter();
        break;
    }
  }

  useEffect(()=>{
    applyFilter();
  },[category,subCategory,search,showSearch,products])

  useEffect(()=>{
    sortProduct();
  },[sortType])


  const loadMoreProducts = () => {
    setLoading(true); // Bắt đầu tải
    setTimeout(() => {
      setVisibleProducts((prev) => prev + 36); // Tăng số lượng sản phẩm hiển thị
      setLoading(false); // Dừng tải
    }, 1000); // Thời gian giả lập tải trang
  };


  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      
      {/* Filter Options*/}
      <div className='min-w-60'>
        <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2 text-orange-600'>BỘ LỌC
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>
        {/* Category Filter*/}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' :'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium text-orange-600'>Thể loại</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Men'} onChange={toggleCategory} />Nam
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Women'} onChange={toggleCategory} />Nữ
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Kids'} onChange={toggleCategory} />Trẻ em
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Baby'} onChange={toggleCategory} />Em bé
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Sale'} onChange={toggleCategory} />Sale
            </p>
          </div>
        </div>
        {/* SubCategory Filter*/}
         <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' :'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium text-orange-600'>Kiểu</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Newproducts'} onChange={toggleSubCategory} /> Sản phẩm mới
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Trend'} onChange={toggleSubCategory}/> Xu hướng
            </p>
            <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Clothes'} onChange={toggleSubCategory}/> Quần áo
            </p>
             <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Accessory'} onChange={toggleSubCategory}/> Phụ kiện
            </p>
             <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Shoe'} onChange={toggleSubCategory}/> Giày
            </p>
             <p className='flex gap-2'>
              <input className='w-3' type="checkbox" value={'Sport'} onChange={toggleSubCategory}/> Sport
            </p>
          </div>
        </div>
      </div>
      {/* Right Side*/}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'TẤT CẢ'} text2={'BỘ SƯU TẬP'}/>
          {/*Product Sort*/}
          <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2 bg-orange-100'>
            <option value="relavent">Khoảng giá phù hợp</option>
            <option value="low-high">Khoảng giá từ thấp đến cao</option>
            <option value="high-low">Khoảng giá từ cao đến thấp</option>
          </select>
        </div>
        {/* Map Products*/}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.slice(0,visibleProducts).map((item,index)=>(
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
            ))
          }
        </div>
        {
          visibleProducts < filterProducts.length && (
           <div className='text-center mt-10'>
            {loading ? (
              <div className='spinner'></div> // Hiển thị spinner khi đang tải
            ) : (
              <button
                onClick={loadMoreProducts}
                className='px-10 py-3 bg-black text-white rounded font-bold transition-all duration-300 hover:bg-gray-800'
              >
                Tải thêm sản phẩm
              </button>
            )}
          </div>
          )
        }
      </div>
    </div>
  )
}

export default Collection
