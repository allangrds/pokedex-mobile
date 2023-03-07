import * as React from 'react'

import { useApiContext } from '../hooks/use-api-context'
import {
  findPokemon as fetchFindPokemon,
  listPokemons as fetchListPokemons,
} from '../services'
import { FetchError } from '../errors'

import { Api, PokemonResponse, PokemonShortResponse, PokemonsResults } from '../types'

const getPokemonsList = async (api: Api, offset: number, limit: number) => {
  const response = await fetchListPokemons(api, { offset, limit })
  const pokemonsList = response.results

  return pokemonsList
}

const getPokemonsIds = (pokemonsList: PokemonsResults[]) => {
  const pokemonsIds = pokemonsList.map(pokemon => {
    const pokemonId = pokemon.url.split('/').filter(Boolean).pop()

    if (!pokemonId) {
      return ''
    }

    return pokemonId
  })

  return pokemonsIds
}

const formatPokemonInformation = (
  pokemon: PokemonResponse
): PokemonShortResponse => ({
  id: pokemon.id,
  name: pokemon.name,
  artwork: pokemon.sprites.other['official-artwork'].front_default,
  types: pokemon.types.map((
    type: { type: { name: string }}
  ) => type.type.name),
})

const getPokemonsInformation = async (api: Api, pokemonsIds? : string[]) => {
  if (!pokemonsIds) {
    return Promise.resolve([])
  }

  const pokemonDataPromise = pokemonsIds.map(id => (
    fetchFindPokemon(api, id || '')
  ))
  const pokemonData = await Promise.all(pokemonDataPromise)

  const pokemonsFormatedData = pokemonData.map(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (pokemon: any) => formatPokemonInformation(pokemon)
  )

  return pokemonsFormatedData
}

export const usePokemons = () => {
  const [loadingPokemons, setLoadingPokemons] = React.useState(false)
  const [refreshingPokemons, setRefreshingPokemons] = React.useState(false)
  const [errorPokemons, setErrorPokemons] = React.useState<string>()
  const [pokemons, setPokemons] = React.useState<
    PokemonShortResponse[] | null
  >(null)
  const [offset, setOffset] = React.useState(0)
  const BASE_OFFSET = 8

  const { api } = useApiContext()

  const list = async (type?: 'REFRESH' | 'LIST') => {
    const setLoading = type === 'REFRESH'
      ? setRefreshingPokemons
      : setLoadingPokemons

    setLoading(true)

    try {
      const pokemonsList = await getPokemonsList(api, 0, BASE_OFFSET)

      if (pokemonsList.length === 0) {
        setLoading(false)
        setPokemons([])
        return
      }

      const pokemonsIds = getPokemonsIds(pokemonsList)
      const pokemonsData = await getPokemonsInformation(api, pokemonsIds)

      setPokemons(pokemonsData)
      setLoading(false)
      setOffset(BASE_OFFSET)
    } catch (error: unknown) {
      if (error instanceof FetchError) {
        setErrorPokemons(error.message)
      }

      setLoading(false)
    }
  }

  const find = async (text: string) => {
    setLoadingPokemons(true)

    try {
      const choosedPokemon = await fetchFindPokemon(api, text)

      if (!choosedPokemon) {
        setPokemons(null)
        setLoadingPokemons(false)

        return
      }

      const formatedPokemon = formatPokemonInformation(choosedPokemon)

      setPokemons([formatedPokemon])
      setLoadingPokemons(false)
    } catch (error: unknown) {
      if (error instanceof FetchError) {
        setPokemons(null)
        setLoadingPokemons(false)

        if (error.status === 404) {
          return
        }

        setErrorPokemons(error.message)
      }
    }
  }

  const loadMore = async () => {
    try {
      const pokemonsList = await getPokemonsList(api, offset, BASE_OFFSET)

      if (pokemonsList.length === 0) {
        return
      }

      const pokemonsIds = getPokemonsIds(pokemonsList)
      const pokemonsData = await getPokemonsInformation(api, pokemonsIds)

      setPokemons([
        ...pokemons || [],
        ...pokemonsData,
      ])
      setOffset(offset + BASE_OFFSET)
    } catch (error: unknown) {
      if (error instanceof FetchError) {
        setErrorPokemons(error.message)
      }
    }
  }

  React.useEffect(() => {
    list()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    errorPokemons,
    find,
    list,
    loadingPokemons,
    loadMore,
    pokemons,
    refreshingPokemons,
  }
}
