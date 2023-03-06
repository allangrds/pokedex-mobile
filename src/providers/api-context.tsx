import { variables } from '../config'
import { ApiProvider } from '../hooks'
import { request } from '../services/request'

const api = request(variables.API_BASE_URL || '')

type Props = {
  children: React.ReactNode
}

export const ApiContextProvider = ({ children }: Props) => (
  <ApiProvider api={api}>{children}</ApiProvider>
)
