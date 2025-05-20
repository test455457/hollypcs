import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Package, Truck } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';

const OrderConfirmationPage: React.FC = () => {
  // Set page title on mount
  useEffect(() => {
    document.title = "Order Confirmation - HollyPC's";
  }, []);
  
  // Generate a random order number for demo purposes
  const orderNumber = `HPC-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
  
  // Random delivery date for demo (7-10 days from now)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + Math.floor(Math.random() * 4) + 7);
  const formattedDeliveryDate = deliveryDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 sm:p-10">
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-green-500 mb-4">
                <CheckCircle size={40} className="text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Order Confirmed!</h1>
              <p className="text-gray-300">
                Thank you for your purchase. Your order has been received.
              </p>
            </div>
            
            <div className="border border-gray-700 rounded-lg p-6 mb-8">
              <div className="flex flex-col sm:flex-row justify-between mb-6">
                <div className="mb-4 sm:mb-0">
                  <h2 className="text-lg font-medium text-white mb-1">Order Number</h2>
                  <p className="text-gray-300">{orderNumber}</p>
                </div>
                <div>
                  <h2 className="text-lg font-medium text-white mb-1">Order Date</h2>
                  <p className="text-gray-300">{new Date().toLocaleDateString()}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Package className="text-blue-400 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-white font-medium">Order Processing</h3>
                    <p className="text-sm text-gray-400">
                      Your order is being processed and prepared for shipping.
                      You'll receive an email when it ships.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Truck className="text-blue-400 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-white font-medium">Estimated Delivery</h3>
                    <p className="text-sm text-gray-400">
                      Your order should arrive by {formattedDeliveryDate}.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">Need Help?</h2>
              <p className="text-gray-300 mb-4">
                If you have any questions about your order, feel free to contact our support team.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <Link to="/contact">
                  <Button variant="outline">Contact Support</Button>
                </Link>
                <Link to="/faq">
                  <Button variant="ghost">View FAQ</Button>
                </Link>
              </div>
            </div>
            
            <div className="text-center">
              <Link to="/">
                <Button variant="primary" size="lg">
                  Return to Homepage
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmationPage;