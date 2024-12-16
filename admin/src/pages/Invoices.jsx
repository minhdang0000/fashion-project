import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const Invoices = () => {
  const [invoiceList, setInvoiceList] = useState(() => {
    const savedInvoices = localStorage.getItem('invoiceList');
    return savedInvoices ? JSON.parse(savedInvoices) : [
      {
        _id: '1',
        invoiceNumber: 'INV001',
        customerName: 'John Doe',
        customerAddress: '123 Main St, City',
        customerPhone: '0123456789',
        date: '2023-01-15',
        quantity: 1,
        unitPrice: 250000,
        totalAmount: 250000,
      },
    ];
  });

  const [newInvoice, setNewInvoice] = useState({
    invoiceNumber: '',
    customerName: '',
    customerAddress: '',
    customerPhone: '',
    date: '',
    quantity: 1,
    unitPrice: 0,
    totalAmount: 0,
  });
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isClosing, setIsClosing] = useState(false); // State to manage closing animation

  const formatVietnamesePhoneNumber = (phoneNumber) => {
    // Remove any non-digit characters
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    
    // Check if it's a valid Vietnamese number length (10 or 11 digits)
    if (cleaned.length === 10) {
      // Format for 10-digit number: 0XX XXX XXXX
      return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
    } else if (cleaned.length === 11) {
      // Format for 11-digit number: 0XXX XXX XXX
      return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
    } else {
      // Return the original number if it doesn't match expected formats
      return phoneNumber;
    }
  };

  useEffect(() => {
    localStorage.setItem('invoiceList', JSON.stringify(invoiceList));
  }, [invoiceList]);

  const addNewInvoice = () => {
    if (!newInvoice.invoiceNumber || !newInvoice.customerName || !newInvoice.date || newInvoice.unitPrice <= 0) {
      toast.error("Vui lòng điền đầy đủ thông tin hóa đơn.");
      return;
    }

    const totalAmount = newInvoice.quantity * newInvoice.unitPrice;

    setInvoiceList((prevList) => [
      ...prevList,
      { ...newInvoice, totalAmount, _id: Date.now().toString() },
    ]);

    setNewInvoice({
      invoiceNumber: '',
      customerName: '',
      customerAddress: '',
      customerPhone: '',
      date: '',
      quantity: 1,
      unitPrice: 0,
      totalAmount: 0,
    });
    toast.success('Hóa đơn đã được thêm thành công');
  };

  const openInvoiceDetails = (invoice) => {
    setSelectedInvoice(invoice);
    setIsClosing(false);
    setShowModal(true);
  };

  const closeModal = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowModal(false);
      setSelectedInvoice(null);
      setIsClosing(false);
    }, 400); // Wait for the animation to finish
  };

  const printInvoice = (invoice) => {
    const printWindow = window.open('', '', 'height=800,width=600');
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice - ${invoice.invoiceNumber}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            h2 { text-align: center; }
            .invoice-details { width: 100%; margin-top: 20px; }
            .invoice-details td { padding: 8px; }
            .items-table, .items-table th, .items-table td {
              border: 1px solid #ddd;
              border-collapse: collapse;
              padding: 8px;
            }
            .items-table { width: 100%; margin-top: 20px; }
            .items-table th { background-color: #f2f2f2; }
            .total { text-align: right; margin-top: 20px; font-weight: bold; }
          </style>
        </head>
        <body>
          <h2>HÓA ĐƠN</h2>
          <table class="invoice-details">
            <tr>
              <td><strong>Mã sản phẩm:</strong> ${invoice.invoiceNumber}</td>
              <td><strong>Ngày:</strong> ${new Date(invoice.date).toLocaleDateString()}</td>
            </tr>
            <tr>
              <td><strong>Khách hàng:</strong> ${invoice.customerName}</td>
              <td><strong>Số điện thoại:</strong> ${formatVietnamesePhoneNumber(invoice.customerPhone)}</td>
            </tr>
            <tr>
              <td><strong>Địa chỉ:</strong> ${invoice.customerAddress}</td>
              <td><strong>Tổng tiền:</strong> ₫${invoice.totalAmount.toLocaleString()}</td>
            </tr>
          </table>
          <table class="items-table">
            <thead>
              <tr>
                <th>Số lượng</th>
                <th>Đơn giá</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${invoice.quantity}</td>
                <td>₫${invoice.unitPrice.toLocaleString()}</td>
                <td>₫${invoice.totalAmount.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>
          <p class="total">Tổng tiền: ₫${invoice.totalAmount.toLocaleString()}</p>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className='p-6'>
      <style>
        {`
          @keyframes slideUp {
            0% { transform: translateY(100px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }

          @keyframes slideDown {
            0% { transform: translateY(0); opacity: 1; }
            100% { transform: translateY(100px); opacity: 0; }
          }

          .slide-up {
            animation: slideUp 0.5s ease-out forwards;
          }

          .slide-down {
            animation: slideDown 0.5s ease-in forwards;
          }
        `}
      </style>

      <h1 className='text-2xl font-bold mb-4 text-center'>Quản lý hóa đơn</h1>

      <div className='mb-6'>
        <h2 className='text-lg font-bold text-gray-500'>Thêm hóa đơn mới</h2>
        {/* Form for adding new invoices */}
        <input
          type='text'
          placeholder='Mã sản phẩm'
          value={newInvoice.invoiceNumber}
          onChange={(e) => setNewInvoice({ ...newInvoice, invoiceNumber: e.target.value })}
          className='w-full px-3 py-2 border border-gray-300 rounded-md my-2'
        />
        <input
          type='text'
          placeholder='Tên khách hàng'
          value={newInvoice.customerName}
          onChange={(e) => setNewInvoice({ ...newInvoice, customerName: e.target.value })}
          className='w-full px-3 py-2 border border-gray-300 rounded-md my-2'
        />
        <input
          type='text'
          placeholder='Địa chỉ khách hàng'
          value={newInvoice.customerAddress}
          onChange={(e) => setNewInvoice({ ...newInvoice, customerAddress: e.target.value })}
          className='w-full px-3 py-2 border border-gray-300 rounded-md my-2'
        />
        <input
          type='text'
          placeholder='Số điện thoại'
          value={newInvoice.customerPhone}
          onChange={(e) => setNewInvoice({ ...newInvoice, customerPhone: e.target.value })}
          className='w-full px-3 py-2 border border-gray-300 rounded-md my-2'
        />
        <input
          type='date'
          value={newInvoice.date}
          onChange={(e) => setNewInvoice({ ...newInvoice, date: e.target.value })}
          className='w-full px-3 py-2 border border-gray-300 rounded-md my-2'
        />
        <input
          type='number'
          placeholder='Số lượng'
          value={newInvoice.quantity}
          onChange={(e) => setNewInvoice({ ...newInvoice, quantity: e.target.value })}
          className='w-full px-3 py-2 border border-gray-300 rounded-md my-2'
        />
        <input
          type='text'
          placeholder='Đơn giá'
          value={newInvoice.unitPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          onChange={(e) => {
            const rawValue = e.target.value.replace(/,/g, '');
            if (!isNaN(rawValue)) {
              setNewInvoice({ ...newInvoice, unitPrice: rawValue });
            }
          }}
          className='w-full px-3 py-2 border border-gray-300 rounded-md my-2'
        />
        <button
          onClick={addNewInvoice}
          className='w-full py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-all duration-300'
        >
          Thêm hóa đơn
        </button>
      </div>

      <div className='overflow-auto'>
        <table className='w-full text-left border'>
          <thead>
            <tr className='bg-gray-200'>
              <th className='py-2 px-4 whitespace-nowrap text-center'>Mã sản phẩm</th>
              <th className='py-2 px-4 whitespace-nowrap text-center'>Tên khách hàng</th>
              <th className='py-2 px-4 whitespace-nowrap text-center'>Địa chỉ</th>
              <th className='py-2 px-4 whitespace-nowrap text-center'>Số điện thoại</th>
              <th className='py-2 px-4 whitespace-nowrap text-center'>Ngày</th>
              <th className='py-2 px-4 whitespace-nowrap text-center'>Số lượng</th>
              <th className='py-2 px-4 whitespace-nowrap text-center'>Tổng tiền</th>
              <th className='py-2 px-4 whitespace-nowrap text-center'>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {invoiceList.map((invoice) => (
              <tr key={invoice._id} className='border-b'>
                <td className='py-2 px-4 text-center'>{invoice.invoiceNumber}</td>
                <td className='py-2 px-4 text-center'>{invoice.customerName}</td>
                <td className='py-2 px-4 whitespace-nowrap text-center'>{invoice.customerAddress}</td>
                <td className='py-2 px-4 text-center'>{invoice.customerPhone}</td>
                <td className='py-2 px-4'>{new Date(invoice.date).toLocaleDateString()}</td>
                <td className='py-2 px-4 text-center'>{invoice.quantity}</td>
                <td className='py-2 px-4 text-center'>₫{invoice.totalAmount.toLocaleString()}</td>
                <td className='py-2 px-4 flex gap-2'>
                  <button
                    onClick={() => openInvoiceDetails(invoice)}
                    className='px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600'
                  >
                    Xem
                  </button>
                  <button
                    onClick={() => printInvoice(invoice)}
                    className='px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600'
                  >
                    In
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedInvoice && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${isClosing ? 'opacity-0' : 'opacity-100'}`}>
          <div className={`bg-white w-4/5 sm:w-3/5 lg:w-2/5 p-6 rounded-lg shadow-lg transform ${isClosing ? 'slide-down' : 'slide-up'}`}>
            <button
              onClick={closeModal}
              className='absolute top-2 right-2 text-gray-600 hover:text-gray-800 text-2xl'
            >
              &times;
            </button>
            <h2 className='text-xl font-bold mb-4 text-center'>HÓA ĐƠN</h2>
            <p className='text-center mb-6'>Mã sản phẩm: {selectedInvoice.invoiceNumber}</p>
            <div className='text-sm mb-6'>
              <p><strong>Ngày:</strong> {new Date(selectedInvoice.date).toLocaleDateString()}</p>
              <p className='mt-2'><strong>Khách hàng:</strong> {selectedInvoice.customerName}</p>
              <p className='mt-2'><strong>Địa chỉ:</strong> {selectedInvoice.customerAddress}</p>
              <p className='mt-2'><strong>Số điện thoại:</strong> {formatVietnamesePhoneNumber(selectedInvoice.customerPhone)}</p>
            </div>
            <table className='w-full mb-4'>
              <thead>
                <tr className='border-b'>
                  <th className='py-2 text-center'>Số lượng</th>
                  <th className='text-right py-2'>Đơn giá</th>
                  <th className='text-right py-2'>Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                <tr className='border-b'>
                  <td className='py-2 text-center'>{selectedInvoice.quantity}</td>
                  <td className='text-right py-2'>₫{selectedInvoice.unitPrice.toLocaleString()}</td>
                  <td className='text-right py-2'>₫{selectedInvoice.totalAmount.toLocaleString()}</td>
                </tr>
              </tbody>
            </table>
            <div className='text-right text-lg font-bold'>
              <p>Tổng tiền: ₫{selectedInvoice.totalAmount.toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invoices;










