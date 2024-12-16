import React from 'react'
import { assets } from '../assets/assets'


const Footer = () => {
  return (
    <div className='full-width-footer'>
        <div className='max-w-screen-xl mx-auto flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div>
                <img src={assets.logo} className='mb-5 w-32 ml-[-24px]' alt="" />
                <p className='w-full md:w-2/3 text-gray-600 mt-[-38px]'>
                    Hastyle – nơi khẳng định phong cách và cá tính riêng của bạn. Với Hastyle, thời trang không chỉ là những bộ trang phục, mà còn là cách thể hiện bản thân và kể câu chuyện của chính bạn. Từng sản phẩm của Hastyle được chọn lựa kỹ lưỡng, kết hợp hài hòa giữa sự tinh tế, chất lượng và xu hướng mới nhất. Hãy để Hastyle đồng hành cùng bạn trên hành trình khám phá và tỏa sáng phong cách cá nhân, biến mỗi ngày thành một sàn diễn thời trang với dấu ấn độc đáo và cuốn hút.
                </p>
            </div>
            <div>
                <p className='text-base font-medium mb-5 mt-[60px]'>THÔNG TIN DOANH NGHIỆP</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Cơ hội nghề nghiệp tại Hastyle</li>
                    <li>Giới thiệu về Hastyle Group</li>
                    <li>Thời trang bền vững</li>
                    <li>Báo chí</li>
                    <li>Quan hệ với nhà đầu tư</li>
                    <li>Quản trị doanh nghiệp</li>
                </ul>
            </div>
            <div>
                <p className='text-base font-medium mb-5 mt-[60px]'>TRỢ GIÚP</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Dịch vụ khách hàng</li>
                    <li>Tài khoản của tôi</li>
                    <li>Các điều khoản & điều kiện</li>
                    <li>Pháp lý & Bảo mật</li>
                    <li>Liên hệ</li>
                    <li>Thông báo cookie</li>
                    <li>Chính sách bảo mật thông tin</li>
                </ul>
            </div>
        </div>
        <div className='w-full'>
            <hr />
            <p className='py-5 text-sm text-center'>Copyright 2024@ hastyle.com - All Right Reserved.</p>
        </div>
    </div>
  )
}

export default Footer
