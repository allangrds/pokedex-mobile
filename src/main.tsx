import { NavigationContainer } from '@react-navigation/native'
import { UiKittenProvider } from './providers'

import { Routes } from './routes'

export const Main = () => (
  <>
    <UiKittenProvider>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </UiKittenProvider>
  </>
)
