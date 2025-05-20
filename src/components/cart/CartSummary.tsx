import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const CartSummary: React.FC = () => {
  const { cart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login?redirect=checkout');
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
      
      <div className="space-y-3 mb-6">
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
        
        <div className="pt-3 mt-3 border-t border-gray-700">
          <div className="flex justify-between">
            <span className="text-lg font-bold text-white">Total</span>
            <span className="text-lg font-bold text-white">${cart.total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <Button
        variant="primary"
        fullWidth
        size="lg"
        onClick={handleCheckout}
        disabled={cart.items.length === 0}
      >
        {isAuthenticated ? 'Proceed to Checkout' : 'Sign in to Checkout'}
      </Button>
      
      <div className="mt-6">
        <h3 className="text-sm font-medium text-white mb-2">Accepted Payment Methods</h3>
        <div className="flex space-x-2">
          <div className="bg-gray-700 rounded px-2 py-1 text-xs text-gray-300">Visa</div>
          <div className="bg-gray-700 rounded px-2 py-1 text-xs text-gray-300">MasterCard</div>
          <div className="bg-gray-700 rounded px-2 py-1 text-xs text-gray-300">PayPal</div>
          <div className="bg-gray-700 rounded px-2 py-1 text-xs text-gray-300">Apple Pay</div>
        </div>
      </div>
      
      <div className="mt-6 text-sm text-gray-400">
        <p>Free shipping on all orders over $999.</p>
        <p className="mt-1">30-day hassle-free returns policy.</p>
      </div>
    </div>
  );
};

export default CartSummary;