import React from 'react'

const NewsletterBox = () => {

    const onSubmitHandler = (event) => {
        event.preventDefault();
    }

  return (
    <div className=' text-center'>
        <p className='text-2xl font-medium text-orange-400'>Đăng ký ngay và được giảm giá lên tới 20%</p>
        <p className='text-gray-400 mt-3'>
            Đăng ký ngay – Nhận ưu đãi độc quyền giảm tới 20% dành riêng cho bạn!
        </p>
        <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Nhập email của bạn' required/>
            <button type='submit' className='bg-black text-white text-xs px-10 py-4'>ĐẶT MUA</button>
        </form>
    </div>
  )
}

export default NewsletterBox
