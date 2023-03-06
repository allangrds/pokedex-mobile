import * as React from 'react'

import { Api } from '../../types'

const ApiContext = React.createContext<Api | undefined>(undefined)

type ProviderProps = {
  api: Api
  children: React.ReactNode
}
export const ApiProvider = ({ api, children }: ProviderProps) => (
  <ApiContext.Provider value={api}>{children}</ApiContext.Provider>
)

export const useApiContext = () => {
  const context = React.useContext(ApiContext)

  if (context === undefined) {
    throw new Error('useApiContext must be used within a Provider')
  }

  return {
    api: context,
  }
}
