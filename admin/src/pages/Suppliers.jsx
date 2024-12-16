import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const Suppliers = () => {
  // Load danh sách nhà cung cấp từ Local Storage hoặc thiết lập danh sách mặc định nếu không có
  const [suppliersList, setSuppliersList] = useState(() => {
    const savedSuppliers = localStorage.getItem('suppliersList');
    return savedSuppliers ? JSON.parse(savedSuppliers) : [
      {
        _id: '1',
        name: 'ABC Suppliers',
        address: '123 Street, City',
        contactNumber: '0123456789',
        brand: 'Nike',
        items: 'Shoes, Apparel',
        debt: 10000,
      },
      {
        _id: '2',
        name: 'XYZ Exports',
        address: '456 Avenue, City',
        contactNumber: '0987654321',
        brand: 'Adidas',
        items: 'Sportswear, Accessories',
        debt: 5000,
      },
    ];
  });

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [brand, setBrand] = useState('');
  const [items, setItems] = useState('');
  const [debt, setDebt] = useState('');
  const [editingSupplier, setEditingSupplier] = useState(null);

  // Cập nhật Local Storage mỗi khi suppliersList thay đổi
  useEffect(() => {
    localStorage.setItem('suppliersList', JSON.stringify(suppliersList));
  }, [suppliersList]);

  // Function to add or update supplier
  const onSubmitHandler = (e) => {
    e.preventDefault();

    const newSupplier = {
      _id: editingSupplier ? editingSupplier._id : Date.now().toString(),
      name,
      address,
      contactNumber,
      brand,
      items,
      debt: Number(debt),
    };

    if (editingSupplier) {
      // Update supplier
      setSuppliersList((prevList) =>
        prevList.map((supplier) =>
          supplier._id === editingSupplier._id ? newSupplier : supplier
        )
      );
      toast.success('Nhà cung cấp được cập nhật thành công');
    } else {
      // Add new supplier
      setSuppliersList((prevList) => [...prevList, newSupplier]);
      toast.success('Đã thêm nhà cung cấp thành công');
    }

    // Clear form fields
    setName('');
    setAddress('');
    setContactNumber('');
    setBrand('');
    setItems('');
    setDebt('');
    setEditingSupplier(null);
  };

  // Function to populate form with supplier data for editing
  const onEditHandler = (supplier) => {
    setName(supplier.name);
    setAddress(supplier.address);
    setContactNumber(supplier.contactNumber);
    setBrand(supplier.brand);
    setItems(supplier.items);
    setDebt(supplier.debt);
    setEditingSupplier(supplier);

    // Cuộn lên đầu trang một cách mượt mà
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Function to delete a supplier
  const onDeleteHandler = (supplierId) => {
    setSuppliersList((prevList) => prevList.filter((supplier) => supplier._id !== supplierId));
    toast.success('Nhà cung cấp đã được xóa thành công');
  };

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4 text-center'>Quản lý nhà cung cấp</h1>
      <form onSubmit={onSubmitHandler} className='flex flex-col gap-4 mb-6'>
        <div className='w-full'>
          <label className='text-base font-medium text-gray-500'>Tên nhà cung cấp</label>
          <input
            type='text'
            className='w-full px-3 py-2 border border-gray-300 rounded-md'
            placeholder='Nhập tên nhà cung cấp'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className='w-full'>
          <label className='text-base font-medium text-gray-500'>Địa chỉ</label>
          <input
            type='text'
            className='w-full px-3 py-2 border border-gray-300 rounded-md'
            placeholder='Nhập địa chỉ'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div className='w-full'>
          <label className='text-base font-medium text-gray-500'>Số điện thoại</label>
          <input
            type='text'
            className='w-full px-3 py-2 border border-gray-300 rounded-md'
            placeholder='Nhập số điện thoại'
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
          />
        </div>
        <div className='w-full'>
          <label className='text-base font-medium text-gray-500'>Thương hiệu</label>
          <input
            type='text'
            className='w-full px-3 py-2 border border-gray-300 rounded-md'
            placeholder='Nhập thương hiệu'
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          />
        </div>
        <div className='w-full'>
          <label className='text-base font-medium text-gray-500'>Mặt hàng</label>
          <input
            type='text'
            className='w-full px-3 py-2 border border-gray-300 rounded-md'
            placeholder='Nhập mặt hàng (e.g., Giày, Trang phục)'
            value={items}
            onChange={(e) => setItems(e.target.value)}
            required
          />
        </div>
        <div className='w-full'>
          <label className='text-base font-medium text-gray-500'>Công nợ</label>
          <input
            type='number'
            className='w-full px-3 py-2 border border-gray-300 rounded-md'
            placeholder='Nhập số tiền nợ'
            value={debt}
            onChange={(e) => setDebt(e.target.value)}
          />
        </div>
        <button
          type='submit'
          className='w-full py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-all duration-300'
        >
          {editingSupplier ? 'Cập nhật nhà cung cấp' : 'Thêm nhà cung cấp'}
        </button>
      </form>

      <h2 className='text-xl font-bold mb-4'>Danh sách nhà cung cấp</h2>
      <div className='overflow-auto'>
        <table className='w-full text-left'>
          <thead>
            <tr className='bg-gray-100'>
              <th className='py-2 px-4 text-center'>Tên</th>
              <th className='py-2 px-4 text-center'>Địa chỉ</th>
              <th className='py-2 px-4 text-center'>Liên hệ</th>
              <th className='py-2 px-4 whitespace-nowrap'>Thương hiệu</th>
              <th className='py-2 px-4 text-center'>Mặt hàng</th>
              <th className='py-2 px-4 text-center'>Công nợ</th>
              <th className='py-2 px-4 text-center'>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {suppliersList.map((supplier) => (
              <tr key={supplier._id} className='border-b'>
                <td className='py-2 px-4 text-center'>{supplier.name}</td>
                <td className='py-2 px-4 text-center'>{supplier.address}</td>
                <td className='py-2 px-4 text-center'>{supplier.contactNumber}</td>
                <td className='py-2 px-4 text-center'>{supplier.brand}</td>
                <td className='py-2 px-4 text-center'>{supplier.items}</td>
                <td className='py-2 px-4 text-center'>₫{supplier.debt.toLocaleString()}</td>
                <td className='py-2 px-4 flex gap-2'>
                  <button
                    onClick={() => onEditHandler(supplier)}
                    className='px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600'
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDeleteHandler(supplier._id)}
                    className='px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600'
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Suppliers;





