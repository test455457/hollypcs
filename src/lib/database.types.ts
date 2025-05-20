export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          first_name: string;
          last_name: string;
          role: 'user' | 'admin';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          first_name: string;
          last_name: string;
          role?: 'user' | 'admin';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          first_name?: string;
          last_name?: string;
          role?: 'user' | 'admin';
          created_at?: string;
          updated_at?: string;
        };
      };
      products: {
        Row: {
          id: string;
          name: string;
          slug: string;
          price: number;
          discount_price: number | null;
          images: string[];
          category: string;
          stock: number;
          featured: boolean;
          new: boolean;
          best_seller: boolean;
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
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          price: number;
          discount_price?: number | null;
          images: string[];
          category: string;
          stock: number;
          featured?: boolean;
          new?: boolean;
          best_seller?: boolean;
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
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          price?: number;
          discount_price?: number | null;
          images?: string[];
          category?: string;
          stock?: number;
          featured?: boolean;
          new?: boolean;
          best_seller?: boolean;
          specs?: {
            cpu: string;
            gpu: string;
            ram: string;
            storage: string;
            motherboard: string;
            powerSupply: string;
            cooling: string;
            case: string;
          };
          description?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          user_id: string;
          items: CartItem[];
          subtotal: number;
          tax: number;
          total: number;
          status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
          payment_status: 'pending' | 'paid' | 'failed';
          shipping_address: Address;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          items: CartItem[];
          subtotal: number;
          tax: number;
          total: number;
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
          payment_status?: 'pending' | 'paid' | 'failed';
          shipping_address: Address;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          items?: CartItem[];
          subtotal?: number;
          tax?: number;
          total?: number;
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
          payment_status?: 'pending' | 'paid' | 'failed';
          shipping_address?: Address;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}