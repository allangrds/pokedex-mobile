export type PokemonsResults = {
  name: string
  url: string
}

export type PokemonsResponse = {
  count: number
  next: string | null
  previous: string
  results: PokemonsResults[] | []
}
