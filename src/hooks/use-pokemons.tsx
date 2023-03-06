import * as React from 'react'

import { useApiContext } from '../hooks/use-api-context'
import { listPokemons as fetchListPokemons } from '../services'
import { PokemonsResponse } from '../types'

export const usePokemons = () => {
  const [loadingPokemons, setLoadingPokemons] = React.useState<boolean>(true)
  const [pokemons, setPokemons] = React.useState<null | PokemonsResponse>(null)
  const [errorPokemons, setErrorPokemons] = React.useState<string | null>(null)
  const { api } = useApiContext()

  const listPokemons = () => {
    setLoadingPokemons(true)

    return fetchListPokemons(api)
      .then((response: PokemonsResponse) => {
        setPokemons(response)
        setLoadingPokemons(false)
      })
      .catch((error: Error) => {
        setErrorPokemons(error.message)
        setLoadingPokemons(false)
      })
  }

  return {
    errorPokemons,
    listPokemons,
    loadingPokemons,
    pokemons,
  }
}
