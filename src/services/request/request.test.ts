import fetchMock from 'fetch-mock-jest'

import { request } from './request'

const mockResponse = {
  status: 200,
  data: {
    name: 'Allan Silva',
    age: 29,
  },
}

describe('services', () => {
  describe('request', () => {
    beforeEach(() => {
      fetchMock.restore()
    })

    it('should make a GET request and return data', async () => {
      fetchMock.mock('http://example.com/api/user', mockResponse)

      const api = request('http://example.com/api/')
      const response = await api.get('user')

      const calls = fetchMock.calls()
      const [url, options] = calls[0]

      expect(fetchMock).toHaveFetchedTimes(1)
      expect(url).toEqual('http://example.com/api/user')
      expect(options?.method).toEqual('GET')
      expect(response).toEqual(mockResponse)
    })
  })
})
