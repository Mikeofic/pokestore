import React, { createContext, useCallback, useState } from 'react';
import { PokemonType } from '../pages/Page';
import { CartItemType } from '../components/CartItem';

interface ContextData {
  appContext: ContextType;
  setAppContext(context: ContextType): void;
}

interface ContextType {
  // tipo fogo
  10: {
    pokemon: PokemonType[];
    cart: CartItemType[];
  };
  // tipo agua
  11: {
    pokemon: PokemonType[];
    cart: CartItemType[];
  };
  // tipo grama
  12: {
    pokemon: PokemonType[];
    cart: CartItemType[];
  };
  // tipo eletrico
  13: {
    pokemon: PokemonType[];
    cart: CartItemType[];
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
      },
      // tipo agua
      11: {
        pokemon: [],
        cart: [],
      },
      // tipo grama
      12: {
        pokemon: [],
        cart: [],
      },
      // tipo eletrico
      13: {
        pokemon: [],
        cart: [],
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
