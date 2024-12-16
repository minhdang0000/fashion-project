import React from 'react';
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SellStatistics = () => {
  // Existing data for summary cards
  const summaryData = [
    { label: 'Tổng doanh số', value: '₫40.000.000', change: '+16.24%', link: 'View net earnings', color: 'text-green-500' },
    { label: 'Tổng đơn hàng', value: '200 (đơn)', change: '+8.00%', link: 'View all orders', color: 'text-green-500' },
    { label: 'Lượng khách truy cập hàng ngày', value: '10.000 (người)', change: '+80.00%', link: 'See details', color: 'text-blue-500' },
  ];

  // Existing data for sales line chart
  const salesData = [
    { month: 'Jan', sales: 50 },
    { month: 'Feb', sales: 75 },
    { month: 'Mar', sales: 100 },
    { month: 'Apr', sales: 125 },
    { month: 'May', sales: 175 },
    { month: 'Jun', sales: 150 },
    { month: 'Jul', sales: 190 },
    { month: 'Aug', sales: 175 },
    { month: 'Sep', sales: 150 },
    { month: 'Oct', sales: 125 },
    { month: 'Nov', sales: 200 },
    { month: 'Dec', sales: 10 },
  ];

  // Updated data for monthly statistics bar chart with data for all 12 months
  const monthlyData = [
    { name: 'Jan', profit: 13570000, refunds: 35587700, expenses: 35587700 },
    { name: 'Feb', profit: 16500000, refunds: 28700000, expenses: 39000000 },
    { name: 'Mar', profit: 17200000, refunds: 30200000, expenses: 41000000 },
    { name: 'Apr', profit: 15000000, refunds: 30000000, expenses: 40000000 },
    { name: 'May', profit: 18000000, refunds: 32000000, expenses: 38000000 },
    { name: 'Jun', profit: 15500000, refunds: 29000000, expenses: 37000000 },
    { name: 'Jul', profit: 16000000, refunds: 30000000, expenses: 36000000 },
    { name: 'Aug', profit: 17000000, refunds: 33000000, expenses: 39000000 },
    { name: 'Sep', profit: 17500000, refunds: 35000000, expenses: 38000000 },
    { name: 'Oct', profit: 18000000, refunds: 34000000, expenses: 37000000 },
    { name: 'Nov', profit: 16500000, refunds: 33000000, expenses: 40000000 },
    { name: 'Dec', profit: 1000000, refunds: 2000000, expenses: 5000000 },
  ];

  // Existing data for recent orders
  const recentOrders = [
    { id: '#Kz025417', customer: 'Alshan', product: 'Leather bag', amount: '$55.00', vendor: 'Garikokar Fashion', status: 'Paid' },
    { id: '#Kz025418', customer: 'John', product: 'Watch', amount: '$120.00', vendor: 'Garikokar Fashion', status: 'Pending' },
  ];

   const currencyFormatter = (value) => {
    if (value >= 1_000_000_000) {
      return `₫${(value / 1_000_000_000).toFixed(1)} tỷ`;
    } else if (value >= 1_000_000) {
      return `₫${(value / 1_000_000).toFixed(1)} triệu`;
    }
    return `₫${value.toLocaleString('vi-VN')}`;
  };

  // New data for revenue line chart
  const revenueData = [
    { month: 'Jan', visitor: 80, sales: 40, profit: 30 },
    { month: 'Feb', visitor: 90, sales: 30, profit: 40 },
    { month: 'Mar', visitor: 70, sales: 60, profit: 20 },
    { month: 'Apr', visitor: 50, sales: 70, profit: 50 },
    { month: 'May', visitor: 60, sales: 30, profit: 40 },
    { month: 'Jun', visitor: 90, sales: 50, profit: 30 },
    { month: 'Jul', visitor: 100, sales: 70, profit: 60 },
    { month: 'Aug', visitor: 60, sales: 40, profit: 30 },
    { month: 'Sep', visitor: 70, sales: 90, profit: 60 },
    { month: 'Oct', visitor: 80, sales: 40, profit: 20 },
    { month: 'Nov', visitor: 60, sales: 30, profit: 40 },
    { month: 'Dec', visitor: 50, sales: 70, profit: 30 },
  ];

  // New data for top products
  const topProducts = [
    { name: 'Áo nỉ Loose Fit', price: '₫399,000', originalPrice: '₫499,000', rating: 4.5, sales: '(60)', image: 'https://lp2.hm.com/hmgoepprod?set=quality%5B79%5D%2Csource%5B%2F04%2F20%2F042014199194cf3f41f0ea2bcdc3456d6731a4a1.jpg%5D%2Corigin%5Bdam%5D%2Ccategory%5B%5D%2Ctype%5BLOOKBOOK%5D%2Cres%5Bm%5D%2Chmver%5B1%5D&call=url[file:/product/main]' },
    { name: 'Áo thun Regular Fit', price: '₫149,000', originalPrice: '₫549,000', rating: 4.7, sales: '(45)', image: 'https://image.hm.com/assets/hm/76/5a/765ac1ff28fef3eeca3167ca8aa1252a936025fb.jpg?imwidth=384' },
    { name: 'Áo gân nổi sợi sồi pha', price: '₫249,000', originalPrice: '₫749,000', rating: 4.2, sales: '(50)', image: 'https://image.hm.com/assets/hm/54/0b/540b7d4d41ebff55a2f7f7b249053de9523bf9c5.jpg?imwidth=384' },
    { name: 'Áo jersey may nhún vải', price: '₫229,000', originalPrice: '₫429,000', rating: 4.6, sales: '(55)', image: 'https://image.hm.com/assets/hm/b9/09/b909ead1b0a96a4fd487b2fc318f3fb15b478e90.jpg?imwidth=384' },
  ];

  return (
    <div className="p-6 bg-orange-50">
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {summaryData.map((item, index) => (
          <div key={index} className="p-4 bg-pink-50 rounded-lg shadow flex flex-col items-center text-center">
            <h3 className="text-gray-600 text-lg">{item.label}</h3>
            <p className="text-base font-bold">{item.value}</p>
            <p className={`text-sm ${item.color}`}>{item.change}</p>
            <a href="#" className="text-blue-500 text-sm">{item.link}</a>
          </div>
        ))}
      </div>

      {/* Total Sales Area Chart */}
      <div className="bg-blue-50 rounded-lg shadow p-4 mb-6">
        <h3 className="text-lg font-semibold mb-4">Tổng doanh thu</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={salesData}>
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8884d8" stopOpacity={0.5} />
                <stop offset="100%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="#8884d8"
              strokeWidth={3}
              fill="url(#colorSales)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly Statistics Bar Chart */}
      <div className="bg-blue-50 rounded-lg shadow p-4 mb-6">
        <h3 className="text-lg font-semibold mb-4">Thống kê hàng tháng</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={currencyFormatter} />
            <Tooltip formatter={(value) => currencyFormatter(value)} />
            <Legend />
            <Bar dataKey="profit" fill="#FFD700" name="Lợi nhuận" />
            <Bar dataKey="refunds" fill="#FF69B4" name="Hoàn tiền" />
            <Bar dataKey="expenses" fill="#82ca9d" name="Doanh thu" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Revenue Line Chart */}
      <div className="bg-blue-50 rounded-lg shadow p-4 mb-6">
        <h3 className="text-lg font-semibold mb-4">Doanh thu</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="visitor" stroke="#FFD700" fillOpacity={0.2} fill="#FFD700" name="Khách truy cập"  />
            <Area type="monotone" dataKey="sales" stroke="#82ca9d" fillOpacity={0.2} fill="#82ca9d" name="Sales"  />
            <Area type="monotone" dataKey="profit" stroke="#8884d8" fillOpacity={0.2} fill="#8884d8" name="Lợi nhuận"  />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Top Products Section */}
      <div className="bg-pink-50 rounded-lg shadow p-4 mb-6">
        <h3 className="text-lg font-semibold mb-4"></h3>
        <div className="grid grid-cols-4 gap-4">
          {topProducts.map((product, index) => (
            <div key={index} className="p-4 bg-blue-50 rounded-lg shadow text-center">
              <img src={product.image} alt={product.name} className="w-full h-48 object-contain rounded-lg mb-2" />
              <h4 className="text-sm font-semibold mb-1">{product.name}</h4>
              <div className="flex items-center justify-center space-x-2">
                <p className="text-black line-through">{product.originalPrice}</p>
                <p className="text-base font-bold text-red-500">{product.price}</p>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <p className="text-orange-500 mb-1">★ {product.rating}</p>
                <p className="text-gray-500">Sales: {product.sales}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SellStatistics;





