import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import CheckoutForm from '../components/checkout/CheckoutForm';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const CheckoutPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  // Set page title on mount
  useEffect(() => {
    document.title = "Checkout - HollyPC's";
  }, []);

  // Redirect if not logged in or cart is empty
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login?redirect=checkout');
    } else if (cart.items.length === 0) {
      navigate('/cart');
    }
  }, [isAuthenticated, cart.items.length, navigate]);

  if (!isAuthenticated || cart.items.length === 0) {
    return null;
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg shadow-lg p-6">
              <CheckoutForm />
            </div>
          </div>
          
          <div>
            <div className="bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-white mb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {cart.items.map((item) => (
                  <div key={item.product.id} className="flex justify-between">
                    <div className="flex items-start">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-12 h-12 rounded object-cover mr-3"
                      />
                      <div>
                        <h3 className="text-white font-medium">{item.product.name}</h3>
                        <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <span className="text-white">
                      ${((item.product.discountPrice || item.product.price) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-700 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-300">Subtotal</span>
                  <span className="text-white">${cart.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Tax</span>
                  <span className="text-white">${cart.tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Shipping</span>
                  <span className="text-green-400">Free</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-700">
                  <span className="text-lg font-bold text-white">Total</span>
                  <span className="text-lg font-bold text-white">${cart.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;