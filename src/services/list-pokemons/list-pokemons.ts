import { Api, PokemonsResponse } from '../../types'

type Parameters = {
  limit?: number
  offset?: number
}

export const listPokemons = (
  api: Api,
  parameters: Parameters = {
    limit: 5,
    offset: 0,
  }
): Promise<PokemonsResponse> => {
  const { limit, offset } = parameters
  const endpoint = `pokemon?offset=${offset}&limit=${limit}`

  return api.get(endpoint)
}
