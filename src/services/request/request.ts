import * as http from 'http'

class FetchError extends Error {
  constructor (public res: Response, message?: string) {
    super(message)
  }
}

export const request = (baseUrl: string) => {
  const requester = (endpoint: string, options?: http.RequestOptions) => {
    const url = `${baseUrl}${endpoint}`

    const newOptions = {
      ...options,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(options?.headers ? options.headers : {}),
      },
    }

    return fetch(url, newOptions).then(async (response) => {
      if (!response.ok) {
        throw new FetchError(response)
      }

      try {
        const data = await response.json()

        return data
      } catch (error) {
        return response
      }
    })
  }

  const get = (endpoint: string, options?: http.RequestOptions) => {
    const newOptions = {
      ...options,
      method: 'GET',
    }

    return requester(endpoint, newOptions)
  }

  return {
    get,
  }
}
