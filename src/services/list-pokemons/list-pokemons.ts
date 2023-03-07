import { Api, PokemonsResponse } from '../../types'

type Parameters = {
  limit?: number
  offset?: number
}

export const listPokemons = (
  api: Api,
  parameters: Parameters
): Promise<PokemonsResponse> => {
  const { limit = 8, offset = 0 } = parameters

  const endpoint = `pokemon?offset=${offset}&limit=${limit}`

  return api.get(endpoint)
}
