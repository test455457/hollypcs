import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';
import Button from '../ui/Button';

interface FilterOptions {
  category: string[];
  priceRange: [number, number];
}

interface ProductFiltersProps {
  onFilterChange: (filters: FilterOptions) => void;
  initialFilters?: FilterOptions;
}

const categories = [
  { id: 'all', name: 'All PCs' },
  { id: 'budget', name: 'Budget' },
  { id: 'mid-range', name: 'Mid-Range' },
  { id: 'high-end', name: 'High-End' },
  { id: 'extreme', name: 'Extreme' },
  { id: 'compact', name: 'Compact' },
  { id: 'workstation', name: 'Workstation' }
];

const ProductFilters: React.FC<ProductFiltersProps> = ({
  onFilterChange,
  initialFilters = { category: [], priceRange: [0, 5000] }
}) => {
  const [filters, setFilters] = useState<FilterOptions>(initialFilters);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>(initialFilters.priceRange);
  
  const handleCategoryChange = (categoryId: string) => {
    let newCategories: string[];
    
    if (categoryId === 'all') {
      newCategories = [];
    } else if (filters.category.includes(categoryId)) {
      newCategories = filters.category.filter(id => id !== categoryId);
    } else {
      newCategories = [...filters.category, categoryId];
    }
    
    const newFilters = { ...filters, category: newCategories };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = parseInt(e.target.value);
    const newRange = [...priceRange] as [number, number];
    newRange[index] = value;
    
    // Ensure min <= max
    if (index === 0 && value > newRange[1]) {
      newRange[1] = value;
    } else if (index === 1 && value < newRange[0]) {
      newRange[0] = value;
    }
    
    setPriceRange(newRange);
  };

  const applyPriceFilter = () => {
    const newFilters = { ...filters, priceRange };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    const resetFilters = { category: [], priceRange: [0, 5000] };
    setFilters(resetFilters);
    setPriceRange([0, 5000]);
    onFilterChange(resetFilters);
  };

  // Filter content shared between desktop and mobile
  const filterContent = (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="text-lg font-medium text-white mb-3">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center">
              <input
                id={`category-${category.id}`}
                name={`category-${category.id}`}
                type="checkbox"
                checked={
                  category.id === 'all' 
                    ? filters.category.length === 0 
                    : filters.category.includes(category.id)
                }
                onChange={() => handleCategoryChange(category.id)}
                className="h-4 w-4 text-blue-500 border-gray-600 rounded focus:ring-blue-500 bg-gray-700"
              />
              <label
                htmlFor={`category-${category.id}`}
                className="ml-3 text-gray-300"
              >
                {category.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-lg font-medium text-white mb-3">Price Range</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-1/2">
              <label htmlFor="min-price" className="block text-sm text-gray-400 mb-1">
                Min ($)
              </label>
              <input
                type="number"
                id="min-price"
                min="0"
                max="5000"
                value={priceRange[0]}
                onChange={(e) => handlePriceRangeChange(e, 0)}
                className="w-full rounded-md border border-gray-600 bg-gray-700 text-gray-100 py-2 px-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="w-1/2">
              <label htmlFor="max-price" className="block text-sm text-gray-400 mb-1">
                Max ($)
              </label>
              <input
                type="number"
                id="max-price"
                min="0"
                max="5000"
                value={priceRange[1]}
                onChange={(e) => handlePriceRangeChange(e, 1)}
                className="w-full rounded-md border border-gray-600 bg-gray-700 text-gray-100 py-2 px-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div className="text-sm text-gray-400">$0</div>
              <div className="text-sm text-gray-400">$5000</div>
            </div>
            <input
              type="range"
              min="0"
              max="5000"
              value={priceRange[0]}
              onChange={(e) => handlePriceRangeChange(e, 0)}
              className="w-full appearance-none h-1 rounded-md bg-gray-600 outline-none slider-thumb"
            />
            <input
              type="range"
              min="0"
              max="5000"
              value={priceRange[1]}
              onChange={(e) => handlePriceRangeChange(e, 1)}
              className="w-full appearance-none h-1 -mt-1 rounded-md bg-gray-600 outline-none slider-thumb"
            />
          </div>
          
          <Button size="sm" variant="primary" onClick={applyPriceFilter}>
            Apply Price
          </Button>
        </div>
      </div>

      {/* Reset Filters */}
      <div className="pt-4 border-t border-gray-700">
        <Button variant="outline" size="sm" onClick={resetFilters} fullWidth>
          Reset All Filters
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile filter dialog */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setMobileFiltersOpen(false)} />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-gray-800 shadow-xl overflow-y-auto">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium text-white">Filters</h2>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>
              {filterContent}
            </div>
          </div>
        </div>
      )}

      {/* Mobile filter button */}
      <div className="lg:hidden mb-4">
        <Button
          onClick={() => setMobileFiltersOpen(true)}
          variant="outline"
          className="w-full flex justify-center items-center"
        >
          <Filter size={16} className="mr-2" />
          Filters
        </Button>
      </div>

      {/* Desktop filters */}
      <div className="hidden lg:block sticky top-24">
        <h2 className="text-xl font-bold text-white mb-4">Filters</h2>
        {filterContent}
      </div>
    </>
  );
};

export default ProductFilters;