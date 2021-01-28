export interface MyOrdersType {
  id: string;
  timestamp: number;
  quantity: number;
  totalPrice: number;
  cashback: number;
  order: CartItemType[];
}

export interface CartItemType {
  id: number;
  name: string;
  quantity: number;
  unitaryPrice: number;
  totalPrice: number;
  imgurl: string;
}

export interface TypeNames {
  typeName: 'fogo' | 'agua' | 'grama' | 'eletrico';
}

export const typeIds = {
  fogo: {
    id: 10,
    title: 'Poké Store Fogo - Temos que pegar!',
  },
  agua: {
    id: 11,
    title: 'Poké Store Água - Temos que pegar!',
  },
  grama: {
    id: 12,
    title: 'Poké Store Grama - Temos que pegar!',
  },
  eletrico: {
    id: 13,
    title: 'Poké Store Elétrico - Temos que pegar!',
  },
};

export interface PokemonType {
  pokemon: {
    name: string;
    url: string;
  };
}
