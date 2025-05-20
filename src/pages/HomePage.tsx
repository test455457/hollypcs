import React, { useEffect } from 'react';
import Hero from '../components/home/Hero';
import FeaturedProducts from '../components/home/FeaturedProducts';
import FeatureHighlights from '../components/home/FeatureHighlights';
import CTABanner from '../components/home/CTABanner';
import { 
  getFeaturedProducts, 
  getBestSellers, 
  getNewProducts 
} from '../data/products';
import Layout from '../components/layout/Layout';

const HomePage: React.FC = () => {
  // Set page title on mount
  useEffect(() => {
    document.title = "HollyPC's - Premium Gaming Computers";
  }, []);

  const featuredProducts = getFeaturedProducts();
  const bestSellers = getBestSellers();
  const newProducts = getNewProducts();

  return (
    <Layout>
      <Hero />
      
      <FeaturedProducts
        title="Featured Gaming PCs"
        subtitle="Our handpicked selection of premium builds"
        products={featuredProducts}
        viewAllLink="/shop"
      />
      
      <FeatureHighlights />
      
      <div className="bg-gray-900">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          <FeaturedProducts
            title="Best Sellers"
            products={bestSellers}
            viewAllLink="/shop?category=best-sellers"
          />
          
          <FeaturedProducts
            title="New Arrivals"
            products={newProducts}
            viewAllLink="/shop?category=new"
          />
        </div>
      </div>
      
      <CTABanner />
    </Layout>
  );
};

export default HomePage;