type Pokemon = {
  name: string
  url: string
}

export type PokemonsResponse = {
  count: number
  next: string
  previous: string
  results: Pokemon[] | []
}
