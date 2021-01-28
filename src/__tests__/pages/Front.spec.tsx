import React from 'react';
import { render } from '@testing-library/react';
import Front from '../../pages/Front';

jest.mock('react-router-dom', () => {
  return {
    useLocation: () => ({
      search: '',
      hash: '',
    }),
    useHistory: () => ({
      push: jest.fn(),
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../AppProvider', () => {
  return {
    useAppContext: () => ({
      appContext: {
        10: {
          pokemon: [],
          cart: [],
          myOrders: [],
        },
        11: {
          pokemon: [],
          cart: [],
          myOrders: [],
        },
        12: {
          pokemon: [],
          cart: [],
          myOrders: [],
        },
        13: {
          pokemon: [],
          cart: [],
          myOrders: [],
        },
      },
      setAppContext: jest.fn(),
      getStoredContext: jest.fn(),
      searchBarTerms: '',
      setToastMessage: jest.fn(),
    }),
  };
});

it('should render front page', () => {
  const { debug } = render(<Front typeName="fogo" />);

  debug();
});
