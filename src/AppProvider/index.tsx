import React, { createContext, useCallback, useState } from 'react';
import {
  MyOrdersType,
  CartItemType,
  PokemonType,
} from '../services/interfaces';

interface ContextData {
  appContext: ContextType;
  setAppContext(context: ContextType): void;
  getStoredContext(): ContextType;
  searchTerms: string;
  setSearchTerms(terms: string): void;
  toastMessage: string;
  setToastMessage(message: string): void;
}

interface ContextType {
  [key: number]: {
    pokemon: PokemonType[];
    cart: CartItemType[];
    myOrders: MyOrdersType[];
  };
}

export const AppContext = createContext<ContextData>({} as ContextData);

const defaultContextType = {
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

const AppProvider: React.FC = ({ children }) => {
  const [searchTerms, setSearchTerms] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [appContext, changeAppContext] = useState(() => {
    const stored = localStorage.getItem('@pokestore:stored');

    // stored data
    if (stored) {
      return JSON.parse(stored) as ContextType;
    }

    // default data
    return defaultContextType;
  });

  const setAppContext = useCallback((newContext: ContextType) => {
    localStorage.setItem('@pokestore:stored', JSON.stringify(newContext));
    changeAppContext(newContext);
  }, []);

  const getStoredContext = useCallback(() => {
    const stored = localStorage.getItem('@pokestore:stored');

    // stored data
    if (stored) {
      return JSON.parse(stored) as ContextType;
    }
    return defaultContextType;
  }, []);

  return (
    <AppContext.Provider
      value={{
        appContext,
        setAppContext,
        getStoredContext,
        searchTerms,
        setSearchTerms,
        toastMessage,
        setToastMessage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
