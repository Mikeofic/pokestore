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
  fogo: 10,
  agua: 11,
  grama: 12,
  eletrico: 13,
};

export interface PokemonType {
  pokemon: {
    name: string;
    url: string;
  };
  slot: number;
}
