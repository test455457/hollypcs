import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, CreditCard, MapPin } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const CheckoutForm: React.FC = () => {
  const { user } = useAuth();
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    cardName: user?.firstName ? `${user.firstName} ${user.lastName}` : '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    zip: user?.address?.postalCode || '',
    country: user?.address?.country || 'USA'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing again
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // Card name validation
    if (!formData.cardName.trim()) {
      newErrors.cardName = 'Cardholder name is required';
    }
    
    // Card number validation
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }
    
    // Expiry date validation
    if (!formData.expiryDate.trim()) {
      newErrors.expiryDate = 'Expiry date is required';
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = 'Please use MM/YY format';
    }
    
    // CVV validation
    if (!formData.cvv.trim()) {
      newErrors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'CVV must be 3 or 4 digits';
    }
    
    // Address validation
    if (!formData.street.trim()) {
      newErrors.street = 'Street address is required';
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }
    
    if (!formData.zip.trim()) {
      newErrors.zip = 'ZIP code is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setProcessing(true);
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSuccess(true);
      
      // Simulate order confirmation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      clearCart();
      navigate('/order-confirmation');
    } catch (error) {
      console.error('Checkout failed:', error);
      setErrors({ 
        form: 'An error occurred during checkout. Please try again.'
      });
    } finally {
      setProcessing(false);
    }
  };

  const formatCardNumber = (value: string) => {
    // Remove non-digits
    const digitsOnly = value.replace(/\D/g, '');
    // Format with spaces every 4 digits
    const formatted = digitsOnly.replace(/(\d{4})(?=\d)/g, '$1 ');
    return formatted.slice(0, 19); // Limit to 16 digits + 3 spaces
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setFormData({ ...formData, cardNumber: formatted });
    
    if (errors.cardNumber) {
      setErrors({ ...errors, cardNumber: '' });
    }
  };

  const formatExpiryDate = (value: string) => {
    // Remove non-digits
    const digitsOnly = value.replace(/\D/g, '');
    // Format as MM/YY
    if (digitsOnly.length > 2) {
      return `${digitsOnly.slice(0, 2)}/${digitsOnly.slice(2, 4)}`;
    }
    return digitsOnly;
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    setFormData({ ...formData, expiryDate: formatted });
    
    if (errors.expiryDate) {
      setErrors({ ...errors, expiryDate: '' });
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <div className="h-16 w-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
          <Check size={32} className="text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Payment Successful!</h2>
        <p className="text-gray-300 mb-6">Your order is being processed.</p>
        <div className="animate-pulse">
          <p className="text-gray-400">Redirecting to confirmation page...</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Payment Information */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <CreditCard className="mr-2 text-blue-400" size={20} />
          Payment Information
        </h3>
        
        <div className="space-y-4">
          <Input
            label="Cardholder Name"
            name="cardName"
            value={formData.cardName}
            onChange={handleChange}
            error={errors.cardName}
            placeholder="John Doe"
            fullWidth
          />
          
          <Input
            label="Card Number"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleCardNumberChange}
            error={errors.cardNumber}
            placeholder="1234 5678 9012 3456"
            fullWidth
            maxLength={19}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Expiry Date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleExpiryDateChange}
              error={errors.expiryDate}
              placeholder="MM/YY"
              maxLength={5}
            />
            
            <Input
              label="CVV"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              error={errors.cvv}
              placeholder="123"
              type="password"
              maxLength={4}
            />
          </div>
        </div>
      </div>
      
      {/* Shipping Address */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
          <MapPin className="mr-2 text-blue-400" size={20} />
          Shipping Address
        </h3>
        
        <div className="space-y-4">
          <Input
            label="Street Address"
            name="street"
            value={formData.street}
            onChange={handleChange}
            error={errors.street}
            placeholder="123 Main St"
            fullWidth
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              error={errors.city}
              placeholder="New York"
            />
            
            <Input
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
              error={errors.state}
              placeholder="NY"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="ZIP Code"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              error={errors.zip}
              placeholder="10001"
            />
            
            <Input
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              error={errors.country}
              placeholder="USA"
            />
          </div>
        </div>
      </div>
      
      {/* Form error */}
      {errors.form && (
        <div className="text-red-500 text-sm bg-red-500/10 p-3 rounded-md">
          {errors.form}
        </div>
      )}
      
      {/* Order summary */}
      <div className="bg-gray-800 rounded-lg p-4">
        <h3 className="font-semibold text-white mb-3">Order Summary</h3>
        
        <div className="space-y-2 mb-3">
          <div className="flex justify-between">
            <span className="text-gray-300">Items ({cart.items.length}):</span>
            <span className="text-white">${cart.subtotal.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-300">Tax:</span>
            <span className="text-white">${cart.tax.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-300">Shipping:</span>
            <span className="text-green-400">Free</span>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-3">
          <div className="flex justify-between">
            <span className="font-semibold text-white">Order Total:</span>
            <span className="font-semibold text-white">${cart.total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        disabled={processing || cart.items.length === 0}
      >
        {processing ? 'Processing Payment...' : `Pay $${cart.total.toFixed(2)}`}
      </Button>
      
      <p className="text-center text-sm text-gray-400">
        By completing your purchase, you agree to our {' '}
        <a href="/terms" className="text-blue-400 hover:text-blue-300">
          Terms of Service
        </a>
        {' '} and {' '}
        <a href="/privacy" className="text-blue-400 hover:text-blue-300">
          Privacy Policy
        </a>
      </p>
    </form>
  );
};

export default CheckoutForm;