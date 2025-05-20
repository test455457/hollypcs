import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    return location.pathname === `/admin${path}` ? 'bg-blue-500' : 'hover:bg-gray-700';
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { path: '', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/products', icon: Package, label: 'Products' },
    { path: '/orders', icon: ShoppingCart, label: 'Orders' },
    { path: '/customers', icon: Users, label: 'Customers' },
    { path: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen transition-transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-800 w-64">
          <div className="flex items-center justify-between mb-6 px-2">
            <Link to="/admin" className="flex items-center">
              <div className="h-8 w-8 bg-blue-500 rounded flex items-center justify-center">
                <span className="text-white font-bold">H</span>
              </div>
              <span className="ml-3 text-xl font-bold text-white">Admin</span>
            </Link>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden text-gray-400 hover:text-white"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={`/admin${item.path}`}
                className={`flex items-center px-4 py-3 text-gray-300 rounded-lg ${isActive(
                  item.path
                )} transition-colors`}
              >
                <item.icon className="h-5 w-5 mr-3" />
                <span>{item.label}</span>
              </Link>
            ))}

            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-3 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <LogOut className="h-5 w-5 mr-3" />
              <span>Logout</span>
            </button>
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <div className={`p-4 md:ml-64`}>
        {/* Mobile header */}
        <div className="md:hidden flex items-center justify-between mb-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-gray-400 hover:text-white"
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center">
            <span className="text-white mr-2">{user?.firstName}</span>
            <button
              onClick={handleLogout}
              className="text-gray-400 hover:text-white"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>

        {/* Page content */}
        <div className="p-4 rounded-lg bg-gray-800">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;