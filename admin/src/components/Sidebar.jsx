import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faList, faTruck, faStore, faReceipt, faChartBar } from '@fortawesome/free-solid-svg-icons';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';


const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2'>
        <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>
            <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to="/add">
                <img className='w-5 h-5' src={assets.add_icon} alt="" />
                <p className='hidden md:block'>Thêm sản phẩm</p>
            </NavLink>

             <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to="/list">
                <img className='w-5 h-5' src={assets.order_icon} alt="" />
                <p className='hidden md:block'>Danh sách sản phẩm</p>
            </NavLink>

             <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to="/orders">
                <FontAwesomeIcon icon={faClipboardList} className="w-5 h-5" />
                <p className='hidden md:block'>Đơn đặt hàng</p>
            </NavLink>

            {/* Supplier Management */}
            <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to="/suppliers">
                <FontAwesomeIcon icon={faTruck} className="w-5 h-5" /> 
                <p className='hidden md:block'>Quản lý nhà cung cấp</p>
            </NavLink>

            {/* Brand Management */}
            <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to="/brands">
                <FontAwesomeIcon icon={faStore} className="w-5 h-5" />
                <p className='hidden md:block'>Quản lý thương hiệu</p>
            </NavLink>

            {/* Invoice Management */}
            <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to="/invoices">
                <FontAwesomeIcon icon={faReceipt} className="w-5 h-5" />
                <p className='hidden md:block'>Quản lý hóa đơn</p>
            </NavLink>

            {/* Sales Statistics */}
            <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to="/statistics">
                <FontAwesomeIcon icon={faChartBar} className="w-5 h-5" />
                <p className='hidden md:block'>Thống kê bán hàng</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar
