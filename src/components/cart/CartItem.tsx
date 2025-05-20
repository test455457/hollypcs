import React from 'react';
import { X, Plus, Minus } from 'lucide-react';
import { CartItem as CartItemType } from '../../types';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { product, quantity } = item;
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity <= 0) {
      removeFromCart(product.id);
    } else {
      updateQuantity(product.id, newQuantity);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row py-6 border-b border-gray-700">
      {/* Product Image */}
      <div className="flex-shrink-0 sm:w-24 sm:h-24 mb-4 sm:mb-0">
        <Link to={`/product/${product.slug}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover rounded-md"
          />
        </Link>
      </div>

      {/* Product Details */}
      <div className="flex-1 sm:ml-6">
        <div className="flex flex-col sm:flex-row justify-between">
          <div className="mb-4 sm:mb-0">
            <h3 className="text-lg font-medium text-white">
              <Link to={`/product/${product.slug}`} className="hover:text-blue-400 transition-colors">
                {product.name}
              </Link>
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              {product.specs.cpu} • {product.specs.gpu} • {product.specs.ram}
            </p>
          </div>

          {/* Price and Actions */}
          <div className="flex sm:flex-col items-center sm:items-end justify-between">
            <div className="flex items-center mb-2 sm:mb-4">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="p-1 text-gray-400 hover:text-white transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="mx-2 w-8 text-center text-white">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="p-1 text-gray-400 hover:text-white transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>

            <div className="flex items-center">
              <span className="text-lg font-medium text-white mr-4">
                ${((product.discountPrice || product.price) * quantity).toFixed(2)}
              </span>
              <button
                onClick={() => removeFromCart(product.id)}
                className="text-gray-400 hover:text-red-400 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;