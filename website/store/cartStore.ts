import { create } from 'zustand';

// Define the types for our cart items
export interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface CartState {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  
  addToCart: (item) => {
    set((state) => {
      const existingItem = state.items.find((i) => i._id === item._id);
      if (existingItem) {
        // If it already exists, just increase quantity by 1
        return {
          items: state.items.map((i) =>
            i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      // Otherwise, add new item with quantity 1
      return { items: [...state.items, { ...item, quantity: 1 }] };
    });
  },

  removeFromCart: (id) => {
    set((state) => ({
      items: state.items.filter((item) => item._id !== id),
    }));
  },

  updateQuantity: (id, quantity) => {
    set((state) => ({
      items: state.items.map((item) =>
        item._id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      ),
    }));
  },

  clearCart: () => set({ items: [] }),

  getTotalPrice: () => {
    const { items } = get();
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  },
}));