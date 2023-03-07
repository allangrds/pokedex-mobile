import { Api, PokemonResponse } from '../../types'

export const findPokemon = (
  api: Api,
  identifier: string | number
): Promise<PokemonResponse | null> => {
  const endpoint = `pokemon/${identifier}`

  return api.get(endpoint)
}
