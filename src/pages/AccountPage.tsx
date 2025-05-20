import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Settings, Package, LogOut } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

const AccountPage: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  // Redirect if not logged in
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Set page title on mount
  useEffect(() => {
    document.title = "My Account - HollyPC's";
  }, []);

  if (!user) return null;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <div className="bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-blue-500 rounded-full h-16 w-16 flex items-center justify-center text-white text-2xl font-bold">
                  {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    {user.firstName} {user.lastName}
                  </h2>
                  <p className="text-gray-400">{user.email}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <a href="#profile" className="flex items-center space-x-2 p-3 rounded-md bg-gray-700 text-white">
                  <User size={18} />
                  <span>Profile</span>
                </a>
                <a href="#orders" className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700 text-gray-300 hover:text-white transition-colors">
                  <Package size={18} />
                  <span>Orders</span>
                </a>
                <a href="#settings" className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700 text-gray-300 hover:text-white transition-colors">
                  <Settings size={18} />
                  <span>Settings</span>
                </a>
                <button 
                  onClick={logout}
                  className="flex items-center space-x-2 p-3 rounded-md hover:bg-gray-700 text-gray-300 hover:text-white transition-colors w-full text-left"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="md:w-3/4">
            <div id="profile" className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">My Profile</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={user.firstName}
                      readOnly
                      className="w-full rounded-md border border-gray-600 bg-gray-700 text-white px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={user.lastName}
                      readOnly
                      className="w-full rounded-md border border-gray-600 bg-gray-700 text-white px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    readOnly
                    className="w-full rounded-md border border-gray-600 bg-gray-700 text-white px-4 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-white mb-2">Shipping Address</h3>
                  
                  {user.address ? (
                    <div className="bg-gray-700 rounded-md p-4">
                      <p className="text-white">{user.address.street}</p>
                      <p className="text-white">
                        {user.address.city}, {user.address.state} {user.address.postalCode}
                      </p>
                      <p className="text-white">{user.address.country}</p>
                    </div>
                  ) : (
                    <div className="bg-gray-700 rounded-md p-4 text-gray-400">
                      No address on file.
                    </div>
                  )}
                </div>
                
                <div className="pt-4">
                  <Button variant="outline">
                    Edit Profile
                  </Button>
                </div>
              </div>
            </div>
            
            <div id="orders" className="bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Order History</h2>
              
              {user.orders.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Order ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Total
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {user.orders.map((order) => (
                        <tr key={order.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                            {order.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                            ${order.total.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              order.status === 'delivered'
                                ? 'bg-green-100 text-green-800'
                                : order.status === 'shipped'
                                ? 'bg-blue-100 text-blue-800'
                                : order.status === 'processing'
                                ? 'bg-yellow-100 text-yellow-800'
                                : order.status === 'cancelled'
                                ? 'bg-red-100 text-red-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                            <a href={`/order/${order.id}`} className="text-blue-400 hover:text-blue-300">
                              View
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="bg-gray-700 rounded-md p-6 text-center">
                  <p className="text-gray-300 mb-4">You haven't placed any orders yet.</p>
                  <Button 
                    variant="primary"
                    onClick={() => navigate('/shop')}
                  >
                    Start Shopping
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AccountPage;