import { findPokemon } from './find-pokemon'

const mockResponse = {
  status: 200,
  data: {
    id: 132,
    is_default: true,
  },
}

const mockApi = {
  get: jest.fn().mockResolvedValue(mockResponse),
}

describe('services', () => {
  describe('findPokemon', () => {
    it('should call the endpoint and return data', async () => {
      const response = await findPokemon(mockApi, 'ditto')

      expect(mockApi.get).toHaveBeenCalledWith('pokemon/ditto')
      expect(response).toEqual(mockResponse)
    })
  })
})
