import React, { createContext, useCallback, useState } from 'react';
import { PokemonType } from '../pages/PageFogo';
import { CartItemType } from '../components/CartItem';

interface ContextData {
  appContext: ContextType;
  setAppContext(context: ContextType): void;
}

export interface MyOrdersType {
  id: string;
  timestamp: number;
  quantity: number;
  totalPrice: number;
  cashback: number;
  order: CartItemType[];
}

export const typeIds = {
  fogo: 10,
  agua: 11,
  grama: 12,
  eletrico: 13,
};

interface ContextType {
  // tipo fogo
  [key: number]: {
    pokemon: PokemonType[];
    cart: CartItemType[];
    myOrders: MyOrdersType[];
  };
}

export const AppContext = createContext<ContextData>({} as ContextData);

const AppProvider: React.FC = ({ children }) => {
  const [appContext, changeAppContext] = useState(() => {
    const stored = localStorage.getItem('@pokestore:stored');

    // stored data
    if (stored) {
      return JSON.parse(stored) as ContextType;
    }

    // default data
    return {
      // tipo fogo
      10: {
        pokemon: [],
        cart: [],
        myOrders: [],
      },
      // tipo agua
      11: {
        pokemon: [],
        cart: [],
        myOrders: [],
      },
      // tipo grama
      12: {
        pokemon: [],
        cart: [],
        myOrders: [],
      },
      // tipo eletrico
      13: {
        pokemon: [],
        cart: [],
        myOrders: [],
      },
    };
  });

  const setAppContext = useCallback((newContext: ContextType) => {
    localStorage.setItem('@pokestore:stored', JSON.stringify(newContext));
    changeAppContext(newContext);
  }, []);

  return (
    <AppContext.Provider value={{ appContext, setAppContext }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
