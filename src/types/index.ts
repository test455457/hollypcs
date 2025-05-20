// User-related types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  address?: Address;
  orders: Order[];
}

export interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

// Product-related types
export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  discountPrice?: number;
  images: string[];
  category: string;
  stock: number;
  featured: boolean;
  new: boolean;
  bestSeller: boolean;
  specs: {
    cpu: string;
    gpu: string;
    ram: string;
    storage: string;
    motherboard: string;
    powerSupply: string;
    cooling: string;
    case: string;
  };
  description: string;
}

// Cart-related types
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
}

// Order-related types
export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed';
  shippingAddress: Address;
  createdAt: string;
}