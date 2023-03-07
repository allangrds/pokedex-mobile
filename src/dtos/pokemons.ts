import { PokemonResponse, PokemonShortResponse } from '../types'

export const PokemonsDto = {
  parseData: (pokemon: PokemonResponse): PokemonShortResponse => ({
    id: pokemon.id,
    name: pokemon.name,
    artwork: pokemon.sprites.other['official-artwork'].front_default,
    types: pokemon.types.map((
      type: { type: { name: string }}
    ) => type.type.name),
  }),
}
