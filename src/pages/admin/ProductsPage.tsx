import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import Button from '../../components/ui/Button';
import { products } from '../../data/products';

const ProductsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Products</h1>
        <Button variant="primary">
          <Plus size={16} className="mr-2" />
          Add Product
        </Button>
      </div>

      {/* Search and filters */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Products table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-700">
              <th className="px-6 py-3 text-gray-400 font-medium">Product</th>
              <th className="px-6 py-3 text-gray-400 font-medium">Category</th>
              <th className="px-6 py-3 text-gray-400 font-medium">Price</th>
              <th className="px-6 py-3 text-gray-400 font-medium">Stock</th>
              <th className="px-6 py-3 text-gray-400 font-medium">Status</th>
              <th className="px-6 py-3 text-gray-400 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="border-b border-gray-700">
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-10 h-10 rounded object-cover mr-3"
                    />
                    <div>
                      <div className="font-medium text-white">{product.name}</div>
                      <div className="text-sm text-gray-400">{product.specs.cpu}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-300">{product.category}</td>
                <td className="px-6 py-4 text-gray-300">
                  ${product.discountPrice || product.price}
                </td>
                <td className="px-6 py-4 text-gray-300">{product.stock}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.stock > 0
                        ? 'bg-green-500/20 text-green-500'
                        : 'bg-red-500/20 text-red-500'
                    }`}
                  >
                    {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button className="p-1 text-gray-400 hover:text-blue-500 transition-colors">
                      <Pencil size={16} />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsPage;