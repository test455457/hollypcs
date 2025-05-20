import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ui/Button';

const CTABanner: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -right-10 -top-10 w-64 h-64 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute left-1/4 bottom-0 w-72 h-72 bg-blue-400 rounded-full opacity-10 blur-3xl"></div>
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="md:w-2/3">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Elevate Your Gaming Experience?
            </h2>
            <p className="text-blue-100 text-lg max-w-2xl">
              Don't settle for mediocre performance. Join thousands of satisfied gamers who have made the switch to HollyPC's custom-built gaming machines. 
            </p>
          </div>
          
          <div className="md:w-1/3 flex justify-center md:justify-end">
            <Link to="/shop">
              <Button size="lg" variant="secondary" className="whitespace-nowrap">
                Explore Gaming PCs
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTABanner;