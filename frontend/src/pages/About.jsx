import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'GIỚI'} text2={'THIỆU'} />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>Hastyle ra đời từ niềm đam mê đổi mới và mong muốn cách mạng hóa cách mọi người mua sắm trực tuyến. Hành trình của chúng tôi bắt đầu với một ý tưởng đơn giản: cung cấp một nền tảng nơi khách hàng có thể dễ dàng khám phá và mua nhiều loại sản phẩm một cách thoải mái ngay tại nhà của họ</p>
          <p>HaStyle là thương hiệu thời trang dành cho những ai yêu thích sự tinh tế, đẳng cấp và sự độc đáo trong phong cách. Chúng tôi tự hào mang đến những sản phẩm chất lượng cao, từ kiểu dáng thanh lịch, hiện đại cho đến những thiết kế mang phong cách cá nhân, đậm chất riêng. HaStyle không chỉ là thời trang – đó còn là biểu tượng của sự tự tin và gu thẩm mỹ tinh tế.</p>
          <p>Với sự tỉ mỉ trong từng đường kim mũi chỉ, mỗi sản phẩm của HaStyle đều được chọn lọc kỹ lưỡng, từ chất liệu đến kiểu dáng, đảm bảo mang đến cho khách hàng những trải nghiệm tuyệt vời nhất. Dù bạn theo đuổi phong cách thanh lịch, sang trọng hay năng động, trẻ trung, HaStyle luôn sẵn sàng đồng hành cùng bạn, giúp bạn tỏa sáng theo cách riêng. HaStyle - Khẳng định phong cách, tôn vinh cá tính!</p>
          <b className='text-gray-800'>Sứ mệnh của chúng tôi</b>
          <p>HaStyle cam kết trở thành người bạn đồng hành đáng tin cậy của những ai đam mê phong cách và khát khao thể hiện bản thân qua thời trang. Sứ mệnh của chúng tôi là mang đến cho khách hàng không chỉ những sản phẩm thời trang chất lượng cao, mà còn là nguồn cảm hứng để họ tự tin thể hiện cá tính và phong cách riêng.</p>
          <p>Chúng tôi không ngừng sáng tạo, đổi mới và nâng cao chất lượng trong từng thiết kế, để mỗi sản phẩm đều phản ánh sự đẳng cấp, thanh lịch và cá tính độc đáo. HaStyle hướng tới xây dựng một cộng đồng nơi mỗi người đều có thể khám phá và tỏa sáng với phong cách của mình.</p>
        </div>
      </div>
      <div className=' text-3xl py-4'>
        <Title text1={'TẠI SAO'} text2={'CHỌN CHÚNG TÔI'} />
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Đảm bảo chất lượng:</b>
          <p className=' text-gray-600'>Chúng tôi lựa chọn và kiểm tra tỉ mỉ từng sản phẩm để đảm bảo đáp ứng các tiêu chuẩn chất lượng nghiêm ngặt của chúng tôi.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Sự tiện lợi:</b>
          <p className=' text-gray-600'>Với giao diện thân thiện với người dùng và quy trình đặt hàng đơn giản, việc mua sắm chưa bao giờ dễ dàng hơn thế.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Dịch vụ khách hàng đặc biệt:</b>
          <p className=' text-gray-600'>Đội ngũ chuyên gia tận tâm của chúng tôi luôn sẵn sàng hỗ trợ bạn, đảm bảo sự hài lòng của bạn là ưu tiên hàng đầu của chúng tôi.</p>
        </div>
      </div>
      <NewsletterBox />
    </div>
  )
}

export default About
