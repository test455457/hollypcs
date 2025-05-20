import React, { useState } from 'react';
import { Search, Mail, Phone } from 'lucide-react';
import { users } from '../../data/users';

const CustomersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = users.filter(user =>
    `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Customers</h1>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Customers grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCustomers.map((customer) => (
          <div key={customer.id} className="bg-gray-700 rounded-lg p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg font-semibold">
                    {customer.firstName[0]}{customer.lastName[0]}
                  </span>
                </div>
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-medium text-white">
                  {customer.firstName} {customer.lastName}
                </h3>
                <div className="mt-2 space-y-2">
                  <div className="flex items-center text-gray-400">
                    <Mail size={16} className="mr-2" />
                    <span className="text-sm">{customer.email}</span>
                  </div>
                  {customer.address && (
                    <div className="flex items-center text-gray-400">
                      <Phone size={16} className="mr-2" />
                      <span className="text-sm">{customer.address.city}, {customer.address.state}</span>
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <div className="text-sm text-gray-400">
                    Orders: <span className="text-white">{customer.orders.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomersPage;