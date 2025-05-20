import { User } from '../types';

// Mock user data for demo purposes
export const users: User[] = [
  {
    id: '1',
    email: 'john.doe@example.com',
    firstName: 'John',
    lastName: 'Doe',
    address: {
      street: '123 Main St',
      city: 'Techville',
      state: 'CA',
      postalCode: '90210',
      country: 'USA'
    },
    orders: []
  },
  {
    id: '2',
    email: 'jane.smith@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    address: {
      street: '456 Oak Ave',
      city: 'Gametown',
      state: 'NY',
      postalCode: '10001',
      country: 'USA'
    },
    orders: []
  }
];

export const getUserByEmail = (email: string): User | undefined => {
  return users.find(user => user.email === email);
};

export const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};