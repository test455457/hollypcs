import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <Card hoverable className="h-full flex flex-col">
      <Link to={`/product/${product.slug}`} className="block h-full">
        <div className="relative">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-60 object-cover rounded-t-lg"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {product.new && (
              <span className="bg-blue-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                NEW
              </span>
            )}
            {product.bestSeller && (
              <span className="bg-orange-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                BEST SELLER
              </span>
            )}
            {product.discountPrice && (
              <span className="bg-red-500 text-white px-2 py-1 rounded-md text-xs font-medium">
                SALE
              </span>
            )}
          </div>
        </div>
        
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">{product.name}</h3>
          
          <div className="mt-2 mb-4 flex-grow">
            <div className="space-y-1">
              <p className="text-sm text-gray-400">
                <span className="font-medium">CPU:</span> {product.specs.cpu}
              </p>
              <p className="text-sm text-gray-400">
                <span className="font-medium">GPU:</span> {product.specs.gpu}
              </p>
              <p className="text-sm text-gray-400">
                <span className="font-medium">RAM:</span> {product.specs.ram}
              </p>
              <p className="text-sm text-gray-400">
                <span className="font-medium">Storage:</span> {product.specs.storage}
              </p>
            </div>
          </div>
          
          <div className="mt-auto">
            <div className="flex items-center justify-between mb-3">
              {product.discountPrice ? (
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold text-white">${product.discountPrice}</span>
                  <span className="text-sm text-gray-400 line-through">${product.price}</span>
                </div>
              ) : (
                <span className="text-xl font-bold text-white">${product.price}</span>
              )}
              
              <span className={`text-sm font-medium ${
                product.stock > 5 
                  ? 'text-green-400' 
                  : product.stock > 0 
                    ? 'text-yellow-400' 
                    : 'text-red-400'
              }`}>
                {product.stock > 5 
                  ? 'In Stock' 
                  : product.stock > 0 
                    ? `Only ${product.stock} left` 
                    : 'Out of Stock'}
              </span>
            </div>
            
            <Button 
              variant="primary" 
              fullWidth
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="group"
            >
              <ShoppingCart size={16} className="mr-2 group-hover:animate-bounce" />
              Add to Cart
            </Button>
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default ProductCard;