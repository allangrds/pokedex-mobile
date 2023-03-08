import * as React from 'react'

import { act, renderHook } from '@testing-library/react-native'

import { usePokemons } from './use-pokemons'
import { ApiProvider } from '../../hooks/use-api-context'
import { FetchError } from '../../errors'

const fakeApi = {
  get: jest.fn(),
}

const resolvedListPokemonsPayload = {
  results: [
    {
      name: 'bulbasaur',
      url: 'https://pokeapi.co/api/v2/pokemon/1/',
    },
    {
      name: 'ivysaur',
      url: 'https://pokeapi.co/api/v2/pokemon/2/',
    },
  ],
}
const rejectedListPokemonsPayload = new FetchError('Failed to fetch', 500)
const resolvedFindPokemonPayload = {
  name: 'bulbasaur',
  sprites: {
    other: {
      'official-artwork': {
        front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png',
      },
    },
  },
  id: 1,
  types: [
    {
      type: {
        name: 'grass',
      },
    },
    {
      type: {
        name: 'poison',
      },
    },
  ],
  abilities: [
    {
      ability: {
        name: 'overgrow',
      },
    },
    {
      ability: {
        name: 'chlorophyll',
      },
    },
  ],
  species: {
    name: 'bulbasaur',
  },
  stats: [
    {
      base_stat: 45,
      stat: {
        name: 'hp',
      },
    },
    {
      base_stat: 49,
      stat: {
        name: 'attack',
      },
    },
    {
      base_stat: 49,
      stat: {
        name: 'defense',
      },
    },
    {
      base_stat: 65,
      stat: {
        name: 'special-attack',
      },
    },
    {
      base_stat: 65,
      stat: {
        name: 'special-defense',
      },
    },
    {
      base_stat: 45,
      stat: {
        name: 'speed',
      },
    },
  ],
}

const mockListPokemons = jest.fn().mockResolvedValue(
  resolvedListPokemonsPayload
)
const mockFindPokemon = jest.fn().mockResolvedValue(resolvedFindPokemonPayload)

jest.mock('../../services', () => ({
  listPokemons: () => mockListPokemons(),
  findPokemon: () => mockFindPokemon(),
}))

describe('usePokemons', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('list', () => {
    it('should fetch the list of pokemons', async () => {
      const { result } = renderHook(() => usePokemons(), {
        wrapper: ({ children }) => (
          <ApiProvider api={fakeApi}>
            {children}
          </ApiProvider>
        ),
      })

      expect(result.current.loadingPokemons).toBe(true)

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0))
      })

      expect(result.current.loadingPokemons).toBe(false)
      expect(mockListPokemons).toHaveBeenCalledTimes(1)
      expect(mockFindPokemon).toHaveBeenCalledTimes(2)
      expect(result.current.errorPokemons).toBe(undefined)
      expect(result.current.pokemons).toEqual([
        {
          "artwork": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
          "id": 1,
          "name": "bulbasaur",
          "types": [
            "grass",
            "poison",
          ],
        },
        {
          "artwork": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
          "id": 1,
          "name": "bulbasaur",
          "types": [
            "grass",
            "poison",
          ],
        },
      ])
    })

    it('should throw error when fetch the list of pokemons', async () => {
      mockListPokemons.mockRejectedValue(rejectedListPokemonsPayload)

      const { result } = renderHook(() => usePokemons(), {
        wrapper: ({ children }) => (
          <ApiProvider api={fakeApi}>
            {children}
          </ApiProvider>
        ),
      })

      expect(result.current.loadingPokemons).toBe(true)

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0))
      })

      expect(mockListPokemons).toHaveBeenCalledTimes(1)
      expect(mockFindPokemon).not.toHaveBeenCalled()
      expect(result.current.loadingPokemons).toBe(false)
      expect(result.current.errorPokemons).toBe('Failed to fetch')
    })
  })
  describe('findAll', () => {
    it('should fetch a single pokemon', async () => {
      mockListPokemons.mockResolvedValue(resolvedListPokemonsPayload)

      const { result } = renderHook(() => usePokemons(), {
        wrapper: ({ children }) => (
          <ApiProvider api={fakeApi}>
            {children}
          </ApiProvider>
        ),
      })

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0))
      })

      await act(async () => {
        await result.current.findAll('bulbasaur')
      })

      expect(result.current.loadingPokemons).toBe(false)
      expect(mockListPokemons).toHaveBeenCalledTimes(1)
      expect(mockFindPokemon).toHaveBeenCalledTimes(3)
      expect(result.current.errorPokemons).toBe(undefined)
      expect(result.current.pokemons).toEqual([
        {
          "artwork": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
          "id": 1,
          "name": "bulbasaur",
          "types": [
            "grass",
            "poison",
          ],
        },
      ])
    })

    it('should throw error when fetch the list of pokemons', async () => {
      const { result } = renderHook(() => usePokemons(), {
        wrapper: ({ children }) => (
          <ApiProvider api={fakeApi}>
            {children}
          </ApiProvider>
        ),
      })

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0))
      })

      mockFindPokemon.mockRejectedValue(rejectedListPokemonsPayload)

      await act(async () => {
        await result.current.findAll('bulbasaur')
      })

      expect(mockListPokemons).toHaveBeenCalledTimes(1)
      expect(mockFindPokemon).toHaveBeenCalledTimes(3)
      expect(result.current.loadingPokemons).toBe(false)
      expect(result.current.errorPokemons).toBe('Failed to fetch')
    })
  })
  describe('find', () => {
    it('should fetch a single pokemon', async () => {
      mockListPokemons.mockResolvedValue(resolvedListPokemonsPayload)
      mockFindPokemon.mockResolvedValue(resolvedFindPokemonPayload)

      const { result } = renderHook(() => usePokemons(), {
        wrapper: ({ children }) => (
          <ApiProvider api={fakeApi}>
            {children}
          </ApiProvider>
        ),
      })

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0))
      })

      expect(result.current.loadingPokemons).toBe(false)

      await act(async () => {
        await result.current.find('bulbasaur')
        expect(result.current.loadingPokemons).toBe(true)
      })

      expect(result.current.loadingPokemons).toBe(false)
      expect(mockListPokemons).toHaveBeenCalledTimes(1)
      expect(mockFindPokemon).toHaveBeenCalledTimes(3)
      expect(result.current.errorPokemons).toBe(undefined)
      expect(result.current.pokemon).toEqual({
        "artwork": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
        "id": 1,
        "name": "bulbasaur",
        "types": [
          "grass",
          "poison",
        ],
        "abilities": ["overgrow", "chlorophyll"],
        "species": "bulbasaur",
        "stats": {
          "attack": 49,
          "defense": 49,
          "hp": 45,
          "special-attack": 65,
          "special-defense": 65,
          "speed": 45,
        },
      })
    })

    it('should throw error when fetch the list of pokemons', async () => {
      const { result } = renderHook(() => usePokemons(), {
        wrapper: ({ children }) => (
          <ApiProvider api={fakeApi}>
            {children}
          </ApiProvider>
        ),
      })

      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0))
      })

      mockFindPokemon.mockRejectedValue(rejectedListPokemonsPayload)

      await act(async () => {
        await result.current.find('bulbasaur')
      })

      expect(result.current.loadingPokemons).toBe(false)
      expect(mockListPokemons).toHaveBeenCalledTimes(1)
      expect(mockFindPokemon).toHaveBeenCalledTimes(3)
      expect(result.current.errorPokemons).toBe('Failed to fetch')
      expect(result.current.pokemon).toBe(undefined)
    })
  })
})
