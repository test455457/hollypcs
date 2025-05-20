import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { DollarSign, Users, ShoppingBag, TrendingUp } from 'lucide-react';

const salesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 2000 },
  { name: 'Apr', sales: 2780 },
  { name: 'May', sales: 1890 },
  { name: 'Jun', sales: 2390 },
];

const productData = [
  { name: 'HollyPC Starter', sales: 12 },
  { name: 'HollyPC Performance', sales: 19 },
  { name: 'HollyPC Elite', sales: 8 },
  { name: 'HollyPC Ultra', sales: 5 },
];

const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white mb-6">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-700 p-6 rounded-lg">
          <div className="flex items-center">
            <div className="bg-blue-500/20 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-blue-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-400">Total Revenue</p>
              <h3 className="text-2xl font-bold text-white">$24,780</h3>
            </div>
          </div>
          <div className="mt-4 flex items-center text-green-500">
            <TrendingUp size={16} className="mr-1" />
            <span className="text-sm">+12.5% from last month</span>
          </div>
        </div>

        <div className="bg-gray-700 p-6 rounded-lg">
          <div className="flex items-center">
            <div className="bg-emerald-500/20 p-3 rounded-lg">
              <Users className="h-6 w-6 text-emerald-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-400">Total Customers</p>
              <h3 className="text-2xl font-bold text-white">1,482</h3>
            </div>
          </div>
          <div className="mt-4 flex items-center text-green-500">
            <TrendingUp size={16} className="mr-1" />
            <span className="text-sm">+8.2% from last month</span>
          </div>
        </div>

        <div className="bg-gray-700 p-6 rounded-lg">
          <div className="flex items-center">
            <div className="bg-purple-500/20 p-3 rounded-lg">
              <ShoppingBag className="h-6 w-6 text-purple-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-400">Total Orders</p>
              <h3 className="text-2xl font-bold text-white">352</h3>
            </div>
          </div>
          <div className="mt-4 flex items-center text-green-500">
            <TrendingUp size={16} className="mr-1" />
            <span className="text-sm">+5.7% from last month</span>
          </div>
        </div>

        <div className="bg-gray-700 p-6 rounded-lg">
          <div className="flex items-center">
            <div className="bg-orange-500/20 p-3 rounded-lg">
              <ShoppingBag className="h-6 w-6 text-orange-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-400">Avg. Order Value</p>
              <h3 className="text-2xl font-bold text-white">$892</h3>
            </div>
          </div>
          <div className="mt-4 flex items-center text-green-500">
            <TrendingUp size={16} className="mr-1" />
            <span className="text-sm">+2.4% from last month</span>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-700 p-6 rounded-lg">
          <h2 className="text-lg font-semibold text-white mb-4">Monthly Sales</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '0.5rem',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#3B82F6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-gray-700 p-6 rounded-lg">
          <h2 className="text-lg font-semibold text-white mb-4">
            Product Performance
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '0.5rem',
                  }}
                />
                <Legend />
                <Bar dataKey="sales" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;