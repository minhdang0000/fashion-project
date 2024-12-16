import React, {useContext} from 'react'
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

const CartTotal = () => {

    const {currency,delivery_fee,getCartAmount} = useContext(ShopContext);

  return (
    <div className='w-full'>
        <div className='text-2xl'>
            <Title text1={'CHI TIẾT'} text2={'THANH TOÁN'} />
        </div>

        <div className='flex flex-col gap-2 mt-2 text-sm'>
            <div className='flex justify-between'>
                <p>Tổng tiền hàng</p>
                <p>{currency} {getCartAmount().toLocaleString()}</p>

            </div>
            <hr />
            <div className='flex justify-between'>
                <p>Tổng tiền phí vận chuyển</p>
                <p>{currency} {delivery_fee.toLocaleString()}</p>
            </div>
            <hr />
            <div className='flex justify-between'>
                <b>Tổng thanh toán</b>
                <b>{currency} {(getCartAmount() === 0 ? 0 : (getCartAmount() + delivery_fee)).toLocaleString()}</b>
            </div>
        </div>
    </div>
  )
}

export default CartTotal
