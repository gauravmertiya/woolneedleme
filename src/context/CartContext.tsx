import React, { createContext, useContext, useReducer, useEffect } from "react";
import { Product } from "@/data/products";
import { toast } from "sonner";

/* ================= TYPES ================= */

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD_ITEM"; product: Product }
  | { type: "REMOVE_ITEM"; productId: string }
  | { type: "UPDATE_QUANTITY"; productId: string; quantity: number }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; items: CartItem[] };

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  increaseQty: (productId: string) => void;
  decreaseQty: (productId: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

/* ================= CONTEXT ================= */

const CartContext = createContext<CartContextType | null>(null);

/* ================= REDUCER ================= */

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(
        (i) => i.product.id === action.product.id
      );

      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === action.product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }

      return {
        items: [...state.items, { product: action.product, quantity: 1 }],
      };
    }

    case "REMOVE_ITEM":
      return {
        items: state.items.filter(
          (i) => i.product.id !== action.productId
        ),
      };

    case "UPDATE_QUANTITY":
      if (action.quantity <= 0) {
        return {
          items: state.items.filter(
            (i) => i.product.id !== action.productId
          ),
        };
      }

      return {
        items: state.items.map((i) =>
          i.product.id === action.productId
            ? { ...i, quantity: action.quantity }
            : i
        ),
      };

    case "CLEAR_CART":
      return { items: [] };

    case "LOAD_CART":
      return { items: action.items };

    default:
      return state;
  }
}

/* ================= PROVIDER ================= */

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  /* ===== Load from localStorage ===== */
  useEffect(() => {
    try {
      const saved = localStorage.getItem("crochet-cart");
      if (saved) {
        dispatch({ type: "LOAD_CART", items: JSON.parse(saved) });
      }
    } catch (err) {
      console.error("Failed to load cart", err);
    }
  }, []);

  /* ===== Save to localStorage ===== */
  useEffect(() => {
    localStorage.setItem("crochet-cart", JSON.stringify(state.items));
  }, [state.items]);

  /* ================= ACTIONS ================= */

  const addItem = (product: Product) => {
    dispatch({ type: "ADD_ITEM", product });
    toast.success(`${product.name} added to cart`);
  };

  const removeItem = (productId: string) => {
    dispatch({ type: "REMOVE_ITEM", productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", productId, quantity });
  };

  const increaseQty = (productId: string) => {
    const item = state.items.find((i) => i.product.id === productId);
    if (item) {
      dispatch({
        type: "UPDATE_QUANTITY",
        productId,
        quantity: item.quantity + 1,
      });
    }
  };

  const decreaseQty = (productId: string) => {
    const item = state.items.find((i) => i.product.id === productId);
    if (item) {
      dispatch({
        type: "UPDATE_QUANTITY",
        productId,
        quantity: item.quantity - 1,
      });
    }
  };

  /* ================= DERIVED VALUES ================= */

  const totalItems = state.items.reduce(
    (sum, i) => sum + i.quantity,
    0
  );

  const totalPrice = state.items.reduce(
    (sum, i) => sum + i.product.price * i.quantity,
    0
  );

  /* ================= PROVIDER ================= */

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addItem,
        removeItem,
        updateQuantity,
        increaseQty,
        decreaseQty,
        clearCart: () => dispatch({ type: "CLEAR_CART" }),
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

/* ================= HOOK ================= */

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}