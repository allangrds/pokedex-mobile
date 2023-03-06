import { Api, PokemonsResponse } from '../../types'

export const listPokemons = (
  api: Api,
  limit = 5,
  offset = 0
): Promise<PokemonsResponse> => {
  const endpoint = `pokemon?offset=${offset}&limit=${limit}`

  return api.get(endpoint)
}
