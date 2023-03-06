import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { HomeScreen } from '../screens'

const Stack = createNativeStackNavigator()

export const Routes = () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Home" component={HomeScreen} />
  </Stack.Navigator>
)
