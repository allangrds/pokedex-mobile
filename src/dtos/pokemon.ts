import { PokemonLongResponse, PokemonResponse } from '../types'

type GetStats = {
  hp: number
  attack: number
  defense: number
  'special-attack': number
  'special-defense': number
  speed: number
}

const getStats = (pokemon: PokemonResponse): GetStats => {
  let stats = {
    hp: 0,
    attack: 0,
    defense: 0,
    'special-attack': 0,
    'special-defense': 0,
    speed: 0,
  }

  pokemon.stats.map(stat => {
    stats = {
      ...stats,
      [stat.stat.name]: stat.base_stat,
    }
  })

  return stats
}

export const PokemonDto = {
  parseData: (pokemon: PokemonResponse): PokemonLongResponse => {
    return {
      id: pokemon.id,
      name: pokemon.name,
      artwork: pokemon.sprites.other['official-artwork'].front_default,
      types: pokemon.types.map((
        type: { type: { name: string }}
      ) => type.type.name),
      abilities: pokemon.abilities.map(ability => ability.ability.name),
      species: pokemon.species.name,
      stats: getStats(pokemon),
    }
  },
}
