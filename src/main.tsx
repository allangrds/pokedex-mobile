import { NavigationContainer } from '@react-navigation/native'
import { ApiContextProvider, UiKittenProvider } from './providers'

import { Routes } from './routes'

export const Main = () => (
  <>
    <UiKittenProvider>
      <ApiContextProvider>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </ApiContextProvider>
    </UiKittenProvider>
  </>
)
