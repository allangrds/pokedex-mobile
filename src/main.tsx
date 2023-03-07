import { NavigationContainer } from '@react-navigation/native'
import { ApiContextProvider, UiKittenProvider } from './providers'

import { Router } from './routes'

export const Main = () => (
  <>
    <UiKittenProvider>
      <ApiContextProvider>
        <NavigationContainer>
          <Router />
        </NavigationContainer>
      </ApiContextProvider>
    </UiKittenProvider>
  </>
)
