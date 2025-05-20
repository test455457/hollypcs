import React from 'react';
import { Save } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const SettingsPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Settings</h1>

      <div className="space-y-6">
        {/* Store Information */}
        <div className="bg-gray-700 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Store Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Store Name"
              defaultValue="HollyPC's"
              placeholder="Enter store name"
            />
            <Input
              label="Store Email"
              defaultValue="contact@hollypcs.com"
              placeholder="Enter store email"
            />
            <Input
              label="Phone Number"
              defaultValue="+1 (555) 123-4567"
              placeholder="Enter phone number"
            />
            <Input
              label="Currency"
              defaultValue="USD"
              placeholder="Enter currency code"
            />
          </div>
        </div>

        {/* Payment Settings */}
        <div className="bg-gray-700 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Payment Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="stripe"
                defaultChecked
                className="h-4 w-4 text-blue-500 border-gray-600 rounded focus:ring-blue-500 bg-gray-700"
              />
              <label htmlFor="stripe" className="ml-2 text-white">
                Enable Stripe Payments
              </label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Stripe Public Key"
                type="password"
                placeholder="Enter Stripe public key"
              />
              <Input
                label="Stripe Secret Key"
                type="password"
                placeholder="Enter Stripe secret key"
              />
            </div>
          </div>
        </div>

        {/* Email Settings */}
        <div className="bg-gray-700 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Email Settings</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="SMTP Host"
                placeholder="Enter SMTP host"
              />
              <Input
                label="SMTP Port"
                placeholder="Enter SMTP port"
              />
              <Input
                label="SMTP Username"
                placeholder="Enter SMTP username"
              />
              <Input
                label="SMTP Password"
                type="password"
                placeholder="Enter SMTP password"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button variant="primary" size="lg">
            <Save size={16} className="mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;