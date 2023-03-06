import * as http from 'http'

export type Api = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get: (endpoint: string, options?: http.RequestOptions) => Promise<any>
}
