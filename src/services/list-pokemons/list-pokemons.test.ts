import { listPokemons } from './list-pokemons'

const mockResponse = {
  status: 200,
  data: {
    count: 1281,
    next: 'https://pokeapi.co/api/v2/pokemon?offset=2&limit=2',
    previous: null,
    results: [
      { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
      { name: 'ivysaur', url: 'https://pokeapi.co/api/v2/pokemon/2/' },
    ],
  },
}

const mockApi = {
  get: jest.fn().mockResolvedValue(mockResponse),
}

describe('services', () => {
  describe('listPokemons', () => {
    it('should call the endpoint and return data', async () => {
      const response = await listPokemons(mockApi, {
        offset: 4,
        limit: 10,
      })

      expect(mockApi.get).toHaveBeenCalledWith('pokemon?offset=4&limit=10')
      expect(response).toEqual(mockResponse)
    })
  })
})
