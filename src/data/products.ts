import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'HollyPC Starter',
    slug: 'hollypc-starter',
    price: 999,
    images: [
      'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ],
    category: 'budget',
    stock: 10,
    featured: false,
    new: true,
    bestSeller: false,
    specs: {
      cpu: 'AMD Ryzen 5 5600X',
      gpu: 'NVIDIA GeForce RTX 3060',
      ram: '16GB DDR4 3200MHz',
      storage: '512GB NVMe SSD',
      motherboard: 'B550 ATX',
      powerSupply: '650W 80+ Bronze',
      cooling: 'Air Cooling',
      case: 'Mid Tower ATX'
    },
    description: 'Perfect for gamers looking to enter the PC gaming world without breaking the bank. The HollyPC Starter delivers solid 1080p gaming performance across most modern titles.'
  },
  {
    id: '2',
    name: 'HollyPC Performance',
    slug: 'hollypc-performance',
    price: 1499,
    images: [
      'https://images.pexels.com/photos/3342740/pexels-photo-3342740.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/2225617/pexels-photo-2225617.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ],
    category: 'mid-range',
    stock: 5,
    featured: true,
    new: false,
    bestSeller: true,
    specs: {
      cpu: 'AMD Ryzen 7 5800X',
      gpu: 'NVIDIA GeForce RTX 3070 Ti',
      ram: '32GB DDR4 3600MHz',
      storage: '1TB NVMe SSD',
      motherboard: 'X570 ATX',
      powerSupply: '750W 80+ Gold',
      cooling: 'AIO Liquid Cooling',
      case: 'Mid Tower RGB'
    },
    description: 'A balanced mid-range PC that offers excellent performance for 1440p gaming and content creation. The HollyPC Performance is our most popular model for a reason.'
  },
  {
    id: '3',
    name: 'HollyPC Elite',
    slug: 'hollypc-elite',
    price: 2499,
    discountPrice: 2299,
    images: [
      'https://images.pexels.com/photos/4792731/pexels-photo-4792731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1038916/pexels-photo-1038916.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ],
    category: 'high-end',
    stock: 3,
    featured: true,
    new: false,
    bestSeller: false,
    specs: {
      cpu: 'AMD Ryzen 9 5950X',
      gpu: 'NVIDIA GeForce RTX 3080 Ti',
      ram: '64GB DDR4 3600MHz',
      storage: '2TB NVMe SSD + 2TB HDD',
      motherboard: 'X570 ATX',
      powerSupply: '850W 80+ Platinum',
      cooling: 'Custom Loop Liquid Cooling',
      case: 'Full Tower Tempered Glass'
    },
    description: 'For enthusiasts who demand the absolute best. The HollyPC Elite handles 4K gaming with ease and makes short work of demanding tasks like video editing and 3D rendering.'
  },
  {
    id: '4',
    name: 'HollyPC Compact',
    slug: 'hollypc-compact',
    price: 1299,
    images: [
      'https://images.pexels.com/photos/3329334/pexels-photo-3329334.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/6804612/pexels-photo-6804612.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ],
    category: 'compact',
    stock: 7,
    featured: false,
    new: true,
    bestSeller: false,
    specs: {
      cpu: 'AMD Ryzen 5 5600X',
      gpu: 'NVIDIA GeForce RTX 3060 Ti',
      ram: '16GB DDR4 3200MHz',
      storage: '1TB NVMe SSD',
      motherboard: 'B550 Mini-ITX',
      powerSupply: '600W SFX 80+ Gold',
      cooling: 'Low-Profile Air Cooling',
      case: 'Mini-ITX Small Form Factor'
    },
    description: 'Big performance in a small package. The HollyPC Compact is perfect for tight spaces without compromising on power.'
  },
  {
    id: '5',
    name: 'HollyPC Ultra',
    slug: 'hollypc-ultra',
    price: 3499,
    images: [
      'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/2399840/pexels-photo-2399840.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ],
    category: 'extreme',
    stock: 2,
    featured: true,
    new: false,
    bestSeller: false,
    specs: {
      cpu: 'Intel Core i9-12900K',
      gpu: 'NVIDIA GeForce RTX 3090',
      ram: '128GB DDR5 5200MHz',
      storage: '4TB NVMe SSD + 4TB HDD',
      motherboard: 'Z690 ATX',
      powerSupply: '1000W 80+ Titanium',
      cooling: 'Custom Loop Liquid Cooling',
      case: 'Full Tower Premium'
    },
    description: 'Our flagship model that pushes the boundaries of what a gaming PC can do. The HollyPC Ultra is designed for those who want the absolute best, regardless of cost.'
  },
  {
    id: '6',
    name: 'HollyPC Creator',
    slug: 'hollypc-creator',
    price: 2799,
    images: [
      'https://images.pexels.com/photos/3321546/pexels-photo-3321546.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    ],
    category: 'workstation',
    stock: 4,
    featured: false,
    new: true,
    bestSeller: true,
    specs: {
      cpu: 'AMD Ryzen 9 5900X',
      gpu: 'NVIDIA GeForce RTX 3080',
      ram: '64GB DDR4 3600MHz',
      storage: '2TB NVMe SSD + 4TB HDD',
      motherboard: 'X570 ATX',
      powerSupply: '850W 80+ Gold',
      cooling: 'AIO Liquid Cooling',
      case: 'Mid Tower Tempered Glass'
    },
    description: 'Optimized for content creators, streamers, and professionals. The HollyPC Creator balances gaming performance with productivity for a seamless work-and-play experience.'
  }
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(product => product.slug === slug);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getNewProducts = (): Product[] => {
  return products.filter(product => product.new);
};

export const getBestSellers = (): Product[] => {
  return products.filter(product => product.bestSeller);
};