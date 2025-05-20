import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, ChevronRight, Check, Info, ArrowLeft } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import { getProductBySlug } from '../data/products';
import { useCart } from '../context/CartContext';

const ProductPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = slug ? getProductBySlug(slug) : undefined;
  
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  
  // Redirect if product not found
  useEffect(() => {
    if (!product && slug) {
      navigate('/shop');
    }
  }, [product, slug, navigate]);
  
  // Initialize selected image when product loads
  useEffect(() => {
    if (product && product.images.length > 0) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);
  
  // Set page title
  useEffect(() => {
    if (product) {
      document.title = `${product.name} - HollyPC's`;
    }
  }, [product]);
  
  if (!product) {
    return null;
  }
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= product.stock) {
      setQuantity(value);
    }
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedToCart(true);
    
    setTimeout(() => {
      setAddedToCart(false);
    }, 3000);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-400 hover:text-blue-400 transition-colors mb-6"
        >
          <ArrowLeft size={18} className="mr-1" />
          Back
        </button>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Product Images */}
          <div>
            <div className="bg-gray-800 rounded-lg overflow-hidden mb-4">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>
            
            {product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(image)}
                    className={`rounded-md overflow-hidden border-2 ${
                      selectedImage === image
                        ? 'border-blue-500'
                        : 'border-gray-700'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} - view ${index + 1}`}
                      className="w-20 h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Details */}
          <div>
            {/* Status badges */}
            <div className="flex flex-wrap gap-2 mb-3">
              {product.new && (
                <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
                  NEW
                </span>
              )}
              {product.bestSeller && (
                <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
                  BEST SELLER
                </span>
              )}
              {product.stock <= 5 && product.stock > 0 && (
                <span className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium">
                  LOW STOCK
                </span>
              )}
              {product.stock === 0 && (
                <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                  OUT OF STOCK
                </span>
              )}
            </div>
            
            <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>
            
            {/* Price */}
            <div className="mb-4">
              {product.discountPrice ? (
                <div className="flex items-center">
                  <span className="text-3xl font-bold text-white mr-2">
                    ${product.discountPrice}
                  </span>
                  <span className="text-xl text-gray-400 line-through">
                    ${product.price}
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-white">
                  ${product.price}
                </span>
              )}
            </div>
            
            {/* Stock status */}
            <div className="mb-6">
              <span className={`inline-flex items-center ${
                product.stock > 5 
                  ? 'text-green-400' 
                  : product.stock > 0 
                    ? 'text-yellow-400' 
                    : 'text-red-400'
              }`}>
                {product.stock > 5 ? (
                  <>
                    <Check size={18} className="mr-1" />
                    In Stock
                  </>
                ) : product.stock > 0 ? (
                  <>
                    <Info size={18} className="mr-1" />
                    Only {product.stock} left
                  </>
                ) : (
                  <>
                    <Info size={18} className="mr-1" />
                    Out of Stock
                  </>
                )}
              </span>
            </div>
            
            {/* Description */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-white mb-2">Description</h2>
              <p className="text-gray-300">{product.description}</p>
            </div>
            
            {/* Quantity selector */}
            {product.stock > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium text-white mb-2">Quantity</h3>
                <div className="flex items-center">
                  <button
                    onClick={decrementQuantity}
                    className="bg-gray-800 text-white h-10 w-10 rounded-l-md flex items-center justify-center hover:bg-gray-700"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={handleQuantityChange}
                    className="h-10 w-20 border-y border-gray-700 bg-gray-800 text-white text-center"
                  />
                  <button
                    onClick={incrementQuantity}
                    className="bg-gray-800 text-white h-10 w-10 rounded-r-md flex items-center justify-center hover:bg-gray-700"
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
              </div>
            )}
            
            {/* Add to cart button */}
            <div className="mb-8">
              <Button
                variant={addedToCart ? 'secondary' : 'primary'}
                size="lg"
                fullWidth
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="group"
              >
                {addedToCart ? (
                  <>
                    <Check size={20} className="mr-2" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} className="mr-2 group-hover:animate-bounce" />
                    Add to Cart
                  </>
                )}
              </Button>
            </div>
            
            {/* Specs */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Specifications</h2>
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div>
                      <span className="text-gray-400">CPU:</span>
                      <p className="text-white">{product.specs.cpu}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">GPU:</span>
                      <p className="text-white">{product.specs.gpu}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">RAM:</span>
                      <p className="text-white">{product.specs.ram}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Storage:</span>
                      <p className="text-white">{product.specs.storage}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <span className="text-gray-400">Motherboard:</span>
                      <p className="text-white">{product.specs.motherboard}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Power Supply:</span>
                      <p className="text-white">{product.specs.powerSupply}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Cooling:</span>
                      <p className="text-white">{product.specs.cooling}</p>
                    </div>
                    <div>
                      <span className="text-gray-400">Case:</span>
                      <p className="text-white">{product.specs.case}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;