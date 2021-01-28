import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import api from '../services/api';
import { mock_typeIds } from '../services/interfaces';
import AppProvider, { useAppContext } from '../AppProvider';
import DefaultPokemonImg from '../assets/default_pokemon.png';

const apiMock = new MockAdapter(api);

jest.mock('react-router-dom', () => {
  return {
    useLocation: () => ({
      search: '',
      hash: '',
    }),
  };
});

describe('App Provider', () => {
  it('should be able to fetch pokemon type data from API and store it', async () => {
    const response = {
      pokemon: [
        {
          pokemon: {
            name: 'charmander',
            url: 'https://pokeapi.co/api/v2/pokemon/4/',
          },
        },
        {
          pokemon: {
            name: 'charmeleon',
            url: 'https://pokeapi.co/api/v2/pokemon/5/',
          },
        },
        {
          pokemon: {
            name: 'charizard',
            url: 'https://pokeapi.co/api/v2/pokemon/6/',
          },
        },
      ],
    };

    apiMock.onGet(`type/${mock_typeIds.fogo.id}`).reply(200, response);

    const { result, waitForValueToChange } = renderHook(() => useAppContext(), {
      wrapper: AppProvider,
    });

    result.current.fetchPokemonTypeData(mock_typeIds.fogo.id);

    await waitForValueToChange(
      () => result.current.appContext[mock_typeIds.fogo.id].pokemon,
    );

    expect(result.current.appContext[mock_typeIds.fogo.id].pokemon).toEqual(
      response.pokemon,
    );
  });

  it('should be able to fetch 1 pokemon data from API', async () => {
    const response = {
      id: 4,
      base_experience: 62,
      name: 'charmander',
      sprites: {
        front_default:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png',

        other: {
          dream_world: {
            front_default:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/4.svg',
          },
          'official-artwork': {
            front_default:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
          },
        },
      },
    };

    apiMock.onGet(`https://pokeapi.co/api/v2/pokemon/4/`).reply(200, response);

    const { result } = renderHook(() => useAppContext(), {
      wrapper: AppProvider,
    });

    const returnedData = await result.current.fetchPokemonData(
      'https://pokeapi.co/api/v2/pokemon/4/',
    );

    expect(returnedData).toEqual({
      ...response,
      name: `${response.name.charAt(0).toUpperCase()}${response.name.slice(1)}`,
      price: response.base_experience,
      quantity: 1,
      img_url:
        response.sprites.other['official-artwork'].front_default ||
        response.sprites.other.dream_world.front_default ||
        response.sprites.front_default ||
        DefaultPokemonImg,
    });
  });

  it('add 1 item when plus button is clicked on cart item', () => {
    const { result } = renderHook(() => useAppContext(), {
      wrapper: AppProvider,
    });

    const newAppContext = {
      ...result.current.appContext,
      10: {
        ...result.current.appContext[10],
        cart: [
          {
            id: 4,
            name: 'Charmander',
            imgurl:
              'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png',
            unitaryPrice: 62,
            quantity: 5,
            totalPrice: 310,
          },
        ],
      },
    };
    result.current.setAppContext(newAppContext);

    result.current.plusOneOnCart(10, 5, 4);

    expect(result.current.appContext[10].cart[0].quantity).toEqual(6);
  });
});
