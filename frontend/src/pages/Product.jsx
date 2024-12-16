import React, {useContext, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';


const CollapsibleSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSection = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='w-full'>
      <div 
        onClick={toggleSection} 
        className='flex justify-between items-center cursor-pointer border-b border-gray-300 py-4'
      >
        <p className={`font-bold ${isOpen ? 'text-red-500' : 'text-black'}`}>{title}</p>
        {/* Sử dụng ký tự Unicode hoặc SVG cho mũi tên */}
        <span className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'} ${isOpen ? 'text-red-500' : 'text-black'}`}>
          {/* Bạn có thể dùng ký tự Unicode hoặc SVG icon để đảm bảo giống nhất */}
          <svg 
            width="25" 
            height="25" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-black"
          >
            <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </div>
      <div 
        className={`overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-screen' : 'max-h-0'}`}
      >
        <div className='py-4'>
          {children}
        </div>
      </div>
    </div>
  );
};



const Product = () => {

  const {productId} = useParams();
  const {products, currency, addToCart} = useContext(ShopContext);
  const [productData,setProductData] = useState(false);
  const [image,setImage] = useState('');
  const [size,setSize] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Trạng thái hiển thị modal
  const [isClosing, setIsClosing] = useState(false); // trạng thái để điều khiển hiệu ứng đóng


  const fetchProductData = async () => {

    products.map((item)=>{
      if(item._id === productId){
        setProductData(item)
        setImage(item.image[0])
        return null;
      }
    })

  }

  useEffect(()=>{
    fetchProductData();
  },[productId]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const openModal = () => {
    setIsClosing(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsClosing(false);
    }, 500); // Đợi hiệu ứng kết thúc trước khi thực sự đóng modal
  };


  return productData ? (
    <>

    <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes slideUp {
            from {
              transform: translateY(100px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }

          @keyframes slideDown {
            from {
              transform: translateY(0);
              opacity: 1;
            }
            to {
              transform: translateY(100px);
              opacity: 0;
            }
          }

          .slide-up {
            animation: slideUp 0.5s ease-out forwards;
          }

          .slide-down {
            animation: slideDown 0.5s ease-in forwards;
          }
          .fade-in {
            animation: fadeIn 1s ease-out forwards;
          }

        `}
      </style>

    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100 fade-in'>
      {/*---------------- Product Data -----------------*/}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/*------------- Product Images --------------*/}        
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item,index)=>(
                <img onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer h-[170.4px]' alt="" />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="" />
          </div>
        </div>
        {/* ------- Product Info --------*/}
        <div className='flex-1'>
            <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
            <div className='flex items-center gap-1 mt-2'>
              <img src={assets.star_icon} alt="" className='w-3 5' />
              <img src={assets.star_icon} alt="" className='w-3 5' />
              <img src={assets.star_icon} alt="" className='w-3 5' />
              <img src={assets.star_icon} alt="" className='w-3 5' />
              <img src={assets.star_dull_icon} alt="" className='w-3 5' />
              <p className='pl-2'>(122)</p>
            </div>
            <p className='mt-5 text-3xl font-medium'>{currency}{parseInt(productData.price).toLocaleString()}</p>
            <div className='flex flex-col gap-4 my-8'>
              <p>Select Size</p>
              <div className='flex gap-2'>
                {productData.sizes.map((item,index)=>(
                  <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`} key={index}>{item}</button>
                ))}
              </div>
            </div>
            <button onClick={()=>addToCart(productData._id,size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700 w-full sm:w-4/5 hover:bg-gray-800 transition-all duration-300'>Thêm vào giỏ hàng</button>
            <hr className='mt-8' />
            <CollapsibleSection title="Mô tả">
              <p className='mt-5 text-orange-400 md:w-4/5'>Hàng mới về</p>
              <p className='mt-5 text-black-500 md:w-4/5'>{productData.description}</p>
             
             
            </CollapsibleSection>
            
            <CollapsibleSection title="Chất liệu">
              <h3 className='mt-4 text-black-500 font-bold'>Thành phần</h3>
              <p className='text-gray-700'>Screw fiber 80%, Polyamide 20%</p>
              <h3 className='mt-6 text-black-500 font-bold'>Thông tin bổ sung về chất liệu</h3>
              <p className='text-black-700'>Tổng trọng lượng của sản phẩm này bao gồm: </p>
              <ul className='list-disc list-inside'>
                <li className='text-gray-700'>20% Polyester tái chế</li>
                <li className='text-gray-700'>10% Polyester tái chế từ sản phẩm dệt may</li>
              </ul>
              <p className='text-gray-600 text-sm mt-2'>Chúng tôi loại trừ trọng lượng của các thành phần phụ nhưng không hoàn toàn: đường chỉ, nút, khóa kéo, chi tiết trang trí và hình in.</p>
              <p className='text-gray-600 text-sm mt-2'>Tổng trọng lượng của sản phẩm được tính bằng cách cộng trọng lượng của tất cả các lớp và thành phần chính lại với nhau. Trên cơ sở đó, chúng tôi tính toán xem mỗi vật liệu tạo ra bao nhiêu phần trăm trọng lượng đó. Đối với các sản phẩm theo set & bộ bao gồm nhiều món, tất cả các món sẽ được tính là một sản phẩm trong phép tính.</p>
              <h3 className='mt-6 text-lg font-bold'>Giải thích cho vật liệu được dùng trong sản phẩm này</h3>
              <h4 className='font-bold text-base mt-3'>Bông</h4>
              <p className='text-gray-700 text-sm'>Bông là loại sợi tự nhiên mềm và linh hoạt được thu hoạch từ cây bông.</p>
              <h4 className='font-bold text-base mt-3'>Polyester tái chế</h4>
              <p className='text-gray-700 text-sm'>Polyester tái chế là polyester được làm từ chai PET hoặc vải phế liệu hết hạn sử dụng. Các chai PET hoặc vải phế liệu được tái chế cơ học và xử lý thành sợi mới.</p>
              <h4 className='font-bold text-base mt-3'>Polyester tái chế từ sản phẩm dệt may</h4>
              <p className='text-gray-700 text-sm'>Polyester tái chế là polyester được làm từ vải phế liệu hết hạn sử dụng. Phế liệu được tái chế cơ học và xử lý thành sợi mới.</p>
              <h4 className='font-bold text-base mt-3'>Polyexte</h4>
              <p className='text-gray-700 text-sm'>Polyester là sợi tổng hợp được làm từ dầu thô (một nguồn tài nguyên hóa thạch).</p>
              <button onClick={toggleModal} className='bg-black text-white px-8 py-3 text-sm w-full sm:w-4/5 mt-4 font-bold 
                                                      transition-all duration-500 ease-in-out 
                                                      bg-gradient-to-l from-orange-300 to-black 
                                                      bg-[length:200%_100%] bg-right hover:bg-left'>
                                                      Thông tin nhà cung cấp <span>➔</span>
              </button>
              <hr className='mt-8' />
            </CollapsibleSection>

            <CollapsibleSection title="Hướng dẫn chăm sóc sản phẩm">
               <p className='text-gray-600 text-sm mt-2'>Bạn cũng có thể giúp bảo vệ môi trường cho một tương lai thời trang bền vững hơn. Hãy mang đem bao quần áo cũ / hàng dệt may bất kỳ không sử dụng nữa đến các cửa hàng H&M tham gia tái chế thời trang.</p>
               <h3 className='mt-6 text-lg font-bold'>Hướng dẫn chăm sóc sản phẩm</h3>
               <ul className='list-disc list-inside'>
                <li className='text-gray-700'>Phơi khô</li>
                <li className='text-gray-700'>Chỉ tẩy bằng chất không chứa clo khi cần</li>
                <li className='text-gray-700'>Giặt máy ở 40°</li>
                <li className='text-gray-700'>Là ủi nhiệt độ trung bình</li>
                <li className='text-gray-700'>Có thể giặt khô</li>
              
              </ul>
              <hr className='mt-8' />
            </CollapsibleSection>
            
            <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
                <p>Sản phẩm chính hãng 100%</p>
                <p>Thanh toán khi nhận hàng có sẵn cho sản phẩm này.</p>
                <p>Chính sách đổi trả dễ dàng trong vòng 7 ngày.</p>
            </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div className={`bg-white w-4/5 sm:w-3/5 lg:w-2/5 p-6 rounded-lg shadow-lg ${isClosing ? 'slide-down' : 'slide-up'}`}>
            <div className='flex justify-between items-center mb-4'>
              <h2 className='text-xl font-bold'>Thông tin nhà cung cấp</h2>
              <button onClick={closeModal} className='text-gray-700 text-2xl'>&times;</button>
            </div>
            <p className='text-sm text-gray-700'>
              Các nhà cung cấp độc lập sản xuất tất cả các sản phẩm của chúng tôi ở nhiều địa điểm trên khắp thế giới. Các nhà cung cấp và nhà sản xuất máy móc hợp tác với chúng tôi phải ký Cam kết bền vững và chúng tôi tuyển dụng nhân viên tại các bộ phận sản xuất văn phòng trên toàn thế giới để đảm bảo cam kết này được bổ sung.
            </p>
            <p className='text-sm text-gray-700 mt-4'>
              Nếu bạn muốn tìm hiểu thêm về Cam kết Phát triển Bền vững và công việc của chúng tôi với các nhà cung cấp cũng như hoạt động sản xuất nói chung, hãy truy cập phần “Tiêu chuẩn & chính sách” tại hmgroup.com.
            </p>
            <p className='text-sm text-gray-700 mt-4'>
              Hiện tại, chúng tôi chỉ có thể chia sẻ thông tin này cho các sản phẩm của Hastyle.
            </p>
            <p className='font-bold mt-4'>Ấn Độ</p>
            <p className='text-sm text-gray-700'>ROYAL EXPORTS</p>
            <p className='text-sm text-gray-700'>
              NO. 83-84, Chikka Adugodi, Thavarekere Main Road, D.R.C, 560029, Bangalore
            </p>
            <p className='text-sm text-gray-700'>Number of workers: 101-500</p>
            
            <button onClick={closeModal} className='bg-black text-white px-0 py-3 text-sm w-full font-bold mt-6 hover:bg-gray-800 transition-all duration-300'>Đóng</button>
            
          </div>
        </div>
      )}

      

      {/*--------- Description & Review Section -------------*/}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Mô tả</b>
          <p className='border px-5 py-3 text-sm'>Đánh giá (122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>Trang web thương mại điện tử là một nền tảng trực tuyến tạo điều kiện thuận lợi cho việc mua và bán sản phẩm hoặc dịch vụ qua internet. Nó hoạt động như một thị trường ảo nơi các doanh nghiệp và cá nhân có thể giới thiệu sản phẩm của mình, tương tác với khách hàng và thực hiện các giao dịch mà không cần sự hiện diện thực tế. Các trang web thương mại điện tử đã trở nên phổ biến rộng rãi nhờ sự tiện lợi, khả năng truy cập và phạm vi tiếp cận toàn cầu mà chúng cung cấp</p>
          <p>Trang web thương mại điện tử thường hiển thị các sản phẩm hoặc dịch vụ cùng với mô tả chi tiết, hình ảnh, giá cả và mọi biến thể có sẵn (ví dụ: kích thước, màu sắc). Mỗi sản phẩm thường có trang riêng với thông tin liên quan</p>
        </div>
      </div>
      {/*-------- display related products ----------*/}

      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
    </>
  ) : <div className=' opacity-0'></div>
}

export default Product
