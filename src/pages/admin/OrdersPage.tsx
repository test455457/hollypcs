import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';

// Mock orders data
const orders = [
  {
    id: 'ORD-001',
    customer: 'John Doe',
    date: '2024-03-15',
    total: 1299.99,
    status: 'completed',
    items: 2
  },
  {
    id: 'ORD-002',
    customer: 'Jane Smith',
    date: '2024-03-14',
    total: 2499.99,
    status: 'processing',
    items: 1
  },
  {
    id: 'ORD-003',
    customer: 'Mike Johnson',
    date: '2024-03-13',
    total: 899.99,
    status: 'pending',
    items: 3
  }
];

const OrdersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-500';
      case 'processing':
        return 'bg-blue-500/20 text-blue-500';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-500';
      default:
        return 'bg-gray-500/20 text-gray-500';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Orders</h1>
        <button className="bg-gray-700 p-2 rounded-lg text-gray-400 hover:text-white transition-colors">
          <Filter size={20} />
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Orders table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-700">
              <th className="px-6 py-3 text-gray-400 font-medium">Order ID</th>
              <th className="px-6 py-3 text-gray-400 font-medium">Customer</th>
              <th className="px-6 py-3 text-gray-400 font-medium">Date</th>
              <th className="px-6 py-3 text-gray-400 font-medium">Items</th>
              <th className="px-6 py-3 text-gray-400 font-medium">Total</th>
              <th className="px-6 py-3 text-gray-400 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-gray-700">
                <td className="px-6 py-4">
                  <span className="text-blue-400 hover:text-blue-300 cursor-pointer">
                    {order.id}
                  </span>
                </td>
                <td className="px-6 py-4 text-white">{order.customer}</td>
                <td className="px-6 py-4 text-gray-300">{order.date}</td>
                <td className="px-6 py-4 text-gray-300">{order.items}</td>
                <td className="px-6 py-4 text-gray-300">${order.total}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersPage;