import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import Layout from '../components/layout/Layout';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import Button from '../components/ui/Button';
import { useCart } from '../context/CartContext';

const CartPage: React.FC = () => {
  const { cart } = useCart();

  // Set page title on mount
  useEffect(() => {
    document.title = "Shopping Cart - HollyPC's";
  }, []);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-white mb-8">Shopping Cart</h1>
        
        {cart.items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                <div className="space-y-0">
                  {cart.items.map((item) => (
                    <CartItem key={item.product.id} item={item} />
                  ))}
                </div>
              </div>
              
              {/* Continue Shopping */}
              <div className="mt-6">
                <Link to="/shop" className="text-blue-400 hover:text-blue-300 flex items-center">
                  <ShoppingBag size={16} className="mr-2" />
                  Continue Shopping
                </Link>
              </div>
            </div>
            
            {/* Cart Summary */}
            <div>
              <CartSummary />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 bg-gray-800 rounded-lg">
            <ShoppingBag size={64} className="mb-4 text-gray-500" />
            <h2 className="text-2xl font-bold text-white mb-2">Your cart is empty</h2>
            <p className="text-gray-400 mb-8 text-center max-w-md">
              Looks like you haven't added any gaming PCs to your cart yet.
              Browse our collection to find your perfect machine.
            </p>
            <Link to="/shop">
              <Button variant="primary" size="lg" className="group">
                Browse Gaming PCs
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;