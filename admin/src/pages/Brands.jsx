import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const Brands = () => {
  // Load danh sách thương hiệu từ Local Storage hoặc thiết lập danh sách mặc định nếu không có
  const [brandsList, setBrandsList] = useState(() => {
    const savedBrands = localStorage.getItem('brandsList');
    return savedBrands
      ? JSON.parse(savedBrands)
      : [
          {
            _id: '1',
            brandName: 'Nike',
            description: 'Leading sports brand',
            country: 'USA',
            slogan: 'Just Do It',
            policies: 'Return policy within 30 days',
            brandColor: '#ff4500',
            logo: 'https://via.placeholder.com/80?text=Nike',
          },
          {
            _id: '2',
            brandName: 'Adidas',
            description: 'Innovative sportswear brand',
            country: 'Germany',
            slogan: 'Impossible is Nothing',
            policies: 'Exchange policy within 15 days',
            brandColor: '#3b82f6',
            logo: 'https://via.placeholder.com/80?text=Adidas',
          },
        ];
  });

  const [brandName, setBrandName] = useState('');
  const [description, setDescription] = useState('');
  const [country, setCountry] = useState('');
  const [slogan, setSlogan] = useState('');
  const [policies, setPolicies] = useState('');
  const [brandColor, setBrandColor] = useState('#ff4500');
  const [logo, setLogo] = useState(null);
  const [editingBrand, setEditingBrand] = useState(null);

  // Cập nhật Local Storage mỗi khi brandsList thay đổi
  useEffect(() => {
    localStorage.setItem('brandsList', JSON.stringify(brandsList));
  }, [brandsList]);

  // Convert file to Base64
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Function to add or update brand
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const logoBase64 = logo ? await convertFileToBase64(logo) : editingBrand ? editingBrand.logo : 'https://via.placeholder.com/80';

    const newBrand = {
      _id: editingBrand ? editingBrand._id : Date.now().toString(),
      brandName,
      description,
      country,
      slogan,
      policies,
      brandColor,
      logo: logoBase64,
    };

    if (editingBrand) {
      // Update brand
      setBrandsList((prevList) =>
        prevList.map((brand) =>
          brand._id === editingBrand._id ? newBrand : brand
        )
      );
      toast.success('Đã cập nhật thương hiệu thành công');
    } else {
      // Add new brand
      setBrandsList((prevList) => [...prevList, newBrand]);
      toast.success('Đã thêm thương hiệu thành công');
    }

    // Clear form fields
    setBrandName('');
    setDescription('');
    setCountry('');
    setSlogan('');
    setPolicies('');
    setBrandColor('#ff4500');
    setLogo(null);
    setEditingBrand(null);
  };

  // Function to populate form with brand data for editing
  const onEditHandler = (brand) => {
    setBrandName(brand.brandName);
    setDescription(brand.description);
    setCountry(brand.country);
    setSlogan(brand.slogan);
    setPolicies(brand.policies);
    setBrandColor(brand.brandColor);
    setLogo(null);
    setEditingBrand(brand);
    
    // Smooth scroll to the top of the page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Function to delete a brand
  const onDeleteHandler = (brandId) => {
    setBrandsList((prevList) => prevList.filter((brand) => brand._id !== brandId));
    toast.success('Đã xóa thương hiệu thành công');
  };

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4 text-center'>Quản lý thương hiệu</h1>
      <form onSubmit={onSubmitHandler} className='flex flex-col gap-4 mb-6'>
        <div className='w-full'>
          <label className='text-base font-medium text-gray-500'>Tên thương hiệu</label>
          <input
            type='text'
            className='w-full px-3 py-2 border border-gray-300 rounded-md'
            placeholder='Nhập tên thương hiệu'
            value={brandName}
            onChange={(e) => setBrandName(e.target.value)}
            required
          />
        </div>
        <div className='w-full'>
          <label className='text-base font-medium text-gray-500'>Mô tả</label>
          <textarea
            className='w-full px-3 py-2 border border-gray-300 rounded-md'
            placeholder='Nhập mô tả thương hiệu'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className='w-full'>
          <label className='text-base font-medium text-gray-500'>Quốc gia</label>
          <input
            type='text'
            className='w-full px-3 py-2 border border-gray-300 rounded-md'
            placeholder='Nhập nước xuất xứ'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>
        <div className='w-full'>
          <label className='text-base font-medium text-gray-500'>Khẩu hiệu</label>
          <input
            type='text'
            className='w-full px-3 py-2 border border-gray-300 rounded-md'
            placeholder='Nhập khẩu hiệu'
            value={slogan}
            onChange={(e) => setSlogan(e.target.value)}
            required
          />
        </div>
        <div className='w-full'>
          <label className='text-base font-medium text-gray-500'>Chính sách</label>
          <textarea
            className='w-full px-3 py-2 border border-gray-300 rounded-md'
            placeholder='Nhập chính sách đổi trả'
            value={policies}
            onChange={(e) => setPolicies(e.target.value)}
            required
          />
        </div>
        <div className='w-full'>
          <label className='text-base font-medium text-gray-500'>Logo</label>
          <input
            type='file'
            className='w-full px-3 py-2 border border-gray-300 rounded-md'
            onChange={(e) => setLogo(e.target.files[0])}
          />
        </div>
        <button
          type='submit'
          className='w-full py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-all duration-300'
        >
          {editingBrand ? 'Cập nhật thương hiệu' : 'Thêm thương hiệu'}
        </button>
      </form>

      <h2 className='text-xl font-bold mb-4'>Danh sách thương hiệu</h2>
      <div className='overflow-auto'>
        <table className='w-full text-left border'>
          <thead>
            <tr className='bg-gray-100'>
              <th className='py-2 px-4 text-center'>Logo</th>
              <th className='py-2 px-4 text-center'>Tên</th>
              <th className='py-2 px-4 text-center'>Mô tả</th>
              <th className='py-2 px-4 whitespace-nowrap'>Quốc gia</th>
              <th className='py-2 px-4 text-center'>Khẩu hiệu</th>
              <th className='py-2 px-4 text-center'>Chính sách</th>
              <th className='py-2 px-4 text-center'>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {brandsList.map((brand) => (
              <tr key={brand._id} className='border-b'>
                <td className='py-2 px-4'>
                  <div className='w-16 h-16 rounded-full overflow-hidden border border-gray-300'>
                    <img src={brand.logo} alt={brand.brandName} className='w-full h-full object-cover' />
                  </div>
                </td>
                <td className='py-2 px-4 text-center'>{brand.brandName}</td>
                <td className='py-2 px-4 text-center'>{brand.description}</td>
                <td className='py-2 px-4 text-center'>{brand.country}</td>
                <td className='py-2 px-4 text-center'>{brand.slogan}</td>
                <td className='py-2 px-4 text-center'>{brand.policies}</td>
                <td className='py-2 px-4 flex gap-2'>
                  <button
                    onClick={() => onEditHandler(brand)}
                    className='px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600'
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDeleteHandler(brand._id)}
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

export default Brands;




