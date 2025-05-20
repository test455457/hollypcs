import React from 'react';
import { Truck, RefreshCw, Shield, HeadsetIcon } from 'lucide-react';

const features = [
  {
    icon: <Truck size={40} className="text-blue-500" />,
    title: 'Free Shipping',
    description: 'Free shipping on all orders over $999. Fast delivery across the continental US.',
  },
  {
    icon: <RefreshCw size={40} className="text-blue-500" />,
    title: '30-Day Returns',
    description: 'Not satisfied? Return within 30 days for a full refund. No questions asked.',
  },
  {
    icon: <Shield size={40} className="text-blue-500" />,
    title: '2-Year Warranty',
    description: 'All our systems come with a comprehensive 2-year warranty for peace of mind.',
  },
  {
    icon: <HeadsetIcon size={40} className="text-blue-500" />,
    title: '24/7 Support',
    description: 'Our technical support team is available around the clock to assist with any issues.',
  },
];

const FeatureHighlights: React.FC = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Why Choose HollyPC's?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We build premium gaming PCs with top-tier components, rigorous testing, and dedicated support.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-900 rounded-lg p-6 transform transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;