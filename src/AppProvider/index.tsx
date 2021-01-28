import React, { createContext, useCallback, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  MyOrdersType,
  CartItemType,
  PokemonType,
} from '../services/interfaces';
import api from '../services/api';
import { PokemonData, PokemonApiData } from '../components/PokeCard';
import DefaultPokemonImg from '../assets/default_pokemon.png';

export interface ContextData {
  appContext: ContextType;
  setAppContext(context: ContextType): void;
  fetchPokemonTypeData(typeId: number): Promise<PokemonType[]>;
  fetchPokemonData(url: string): Promise<PokemonData | null>;
  getStoredContext(): ContextType;
  searchBarTerms: string;
  setSearchBarTerms(terms: string): void;
  toastMessage: string;
  setToastMessage(message: string): void;
  minusOneOnCart(
    typeId: number,
    quantity: number,
    cartItemId: number,
    fn?: (n: number) => void,
  ): void;
  plusOneOnCart(
    typeId: number,
    quantity: number,
    cartItemId: number,
    fn?: (n: number) => void,
  ): void;
}

export interface ContextType {
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
  const location = useLocation();
  const [searchBarTerms, setSearchBarTerms] = useState(() => {
    const query = new URLSearchParams(location.search).get('ps');
    return query ? query.trim().toLowerCase() : '';
  });
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

  const fetchPokemonTypeData = useCallback(
    async (typeId: number): Promise<PokemonType[]> => {
      try {
        const typeResponse = await api.get<{ pokemon: PokemonType[] }>(
          `type/${typeId}`,
        );

        const { pokemon } = typeResponse.data;

        const storedContext = getStoredContext();

        setAppContext({
          ...storedContext,
          [typeId]: {
            ...storedContext[typeId],
            pokemon,
          },
        });

        return pokemon;
      } catch (error) {
        setToastMessage(
          'Não foi possível se conectar à API. Tente novamente mais tarde.',
        );
        return [];
      }
    },
    [getStoredContext, setAppContext],
  );

  const fetchPokemonData = useCallback(
    async (url: string): Promise<PokemonData | null> => {
      try {
        const response = await api.get<PokemonApiData>(url);

        const { sprites } = response.data;

        const img_url =
          sprites.other['official-artwork'].front_default ||
          sprites.other.dream_world.front_default ||
          sprites.front_default ||
          DefaultPokemonImg;

        const newCardData = {
          quantity: 1,
          price: response.data.base_experience,
          ...response.data,
          name: response.data.name.trim(),
          img_url,
        };

        // uppercase first letter
        newCardData.name =
          newCardData.name.charAt(0).toUpperCase() + newCardData.name.slice(1);

        return newCardData;
      } catch (error) {
        setToastMessage(
          'Não foi possível se conectar à API. Tente novamente mais tarde.',
        );
        return null;
      }
    },
    [],
  );

  const minusOneOnCart = useCallback(
    (
      typeId: number,
      quantity: number,
      cartItemId: number,
      fn?: (n: number) => void,
    ) => {
      let newQuantity = quantity - 1;

      if (newQuantity > 999) {
        newQuantity = 999;
      } else if (newQuantity < 1) {
        newQuantity = 1;
      }

      if (Number.isNaN(newQuantity)) {
        newQuantity = 1;
      }

      const cart = appContext[typeId].cart.slice(0);
      const itemIndex = cart.findIndex(cartItem => cartItem.id === cartItemId);

      cart[itemIndex] = {
        ...cart[itemIndex],
        quantity: newQuantity,
        totalPrice: newQuantity * cart[itemIndex].unitaryPrice,
      };

      if (fn) {
        fn(newQuantity);
      }

      const storedContext = getStoredContext();

      const newAppContext = {
        ...storedContext,
        [typeId]: {
          ...storedContext[typeId],
          cart,
        },
      };
      setAppContext(newAppContext);
    },
    [appContext, getStoredContext, setAppContext],
  );

  const plusOneOnCart = useCallback(
    (
      typeId: number,
      quantity: number,
      cartItemId: number,
      fn?: (n: number) => void,
    ) => {
      let newQuantity = quantity + 1;

      if (newQuantity > 999) {
        newQuantity = 999;
      } else if (newQuantity < 1) {
        newQuantity = 1;
      }

      if (Number.isNaN(newQuantity)) {
        newQuantity = 1;
      }

      const cart = appContext[typeId].cart.slice(0);
      const itemIndex = cart.findIndex(cartItem => cartItem.id === cartItemId);

      cart[itemIndex] = {
        ...cart[itemIndex],
        quantity: newQuantity,
        totalPrice: newQuantity * cart[itemIndex].unitaryPrice,
      };

      if (fn) {
        fn(newQuantity);
      }

      const storedContext = getStoredContext();

      const newAppContext = {
        ...storedContext,
        [typeId]: {
          ...storedContext[typeId],
          cart,
        },
      };
      setAppContext(newAppContext);
    },
    [appContext, getStoredContext, setAppContext],
  );

  return (
    <AppContext.Provider
      value={{
        appContext,
        setAppContext,
        getStoredContext,
        searchBarTerms,
        setSearchBarTerms,
        toastMessage,
        setToastMessage,
        fetchPokemonTypeData,
        fetchPokemonData,
        minusOneOnCart,
        plusOneOnCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useAppContext = (): ContextData => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }

  return context;
};

export default AppProvider;
