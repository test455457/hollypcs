import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ProductFilters from '../components/shop/ProductFilters';
import ProductCard from '../components/product/ProductCard';
import { products as allProducts } from '../data/products';
import { Product } from '../types';

const ShopPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  
  const [products, setProducts] = useState<Product[]>(allProducts);
  const [filters, setFilters] = useState({
    category: categoryParam ? [categoryParam] : [],
    priceRange: [0, 5000] as [number, number]
  });

  // Set page title on mount
  useEffect(() => {
    document.title = "Shop - HollyPC's";
  }, []);

  // Update filters when URL params change
  useEffect(() => {
    if (categoryParam) {
      setFilters(prev => ({
        ...prev,
        category: [categoryParam]
      }));
    }
  }, [categoryParam]);

  // Apply filters whenever they change
  useEffect(() => {
    let filteredProducts = [...allProducts];
    
    // Apply category filter
    if (filters.category.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        filters.category.includes(product.category)
      );
    }
    
    // Apply special filters
    if (filters.category.includes('best-sellers')) {
      filteredProducts = allProducts.filter(product => product.bestSeller);
    } else if (filters.category.includes('new')) {
      filteredProducts = allProducts.filter(product => product.new);
    }
    
    // Apply price range filter
    filteredProducts = filteredProducts.filter(product => {
      const price = product.discountPrice || product.price;
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });
    
    setProducts(filteredProducts);
  }, [filters]);

  const handleFilterChange = (newFilters: {
    category: string[];
    priceRange: [number, number];
  }) => {
    setFilters(newFilters);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Gaming PCs</h1>
          <p className="text-gray-400 mt-2">
            Browse our selection of pre-built gaming computers, designed for performance and reliability.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters */}
          <div className="lg:w-1/4">
            <ProductFilters
              onFilterChange={handleFilterChange}
              initialFilters={filters}
            />
          </div>
          
          {/* Products Grid */}
          <div className="lg:w-3/4">
            {products.length > 0 ? (
              <>
                <div className="flex justify-between items-center mb-6">
                  <p className="text-gray-400">
                    Showing {products.length} {products.length === 1 ? 'product' : 'products'}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-gray-800 rounded-lg p-8 text-center">
                <h3 className="text-xl font-medium text-white mb-2">No products found</h3>
                <p className="text-gray-400">
                  Try adjusting your filters to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ShopPage;