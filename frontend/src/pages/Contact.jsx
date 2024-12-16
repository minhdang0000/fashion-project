import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'LIÊN'} text2={'HỆ'} />
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Cửa hàng của chúng tôi</p>
          <p className=' text-gray-500'>XP7X+2F Hà Đông, Hà Nội <br /> P.Nguyễn Trác, Yên Nghĩa, Hà Đông, Hà Nội</p>
          <p className=' text-gray-500'>Phone: (+84) 396 930 803 <br /> Email: haduongngoc15082003@gmail.com</p>
          <p className='font-semibold text-xl text-gray-600'>Nghề nghiệp tại Hastyle</p>
          <p className=' text-gray-500'>Tìm hiểu thêm về đội ngũ của chúng tôi và cơ hội việc làm</p>
          <button className='border border-black bg-black px-8 py-4 text-white hover:bg-gray-800 hover:text-white transition-all duration-500'>Khám phá việc làm</button>
        </div>
      </div>
      <NewsletterBox />
    </div>
  )
}

export default Contact
