import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Button, Text } from '@ui-kitten/components'

import { DetailsScreen, HomeScreen } from '../screens'

import { routes } from './routes'

const Stack = createNativeStackNavigator()

export const Router = () => (
  <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen
      name={routes.home}
      component={HomeScreen}
    />
    <Stack.Screen
      name={routes.details}
      component={DetailsScreen}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      options={({navigation, route }: any) => ({
        headerShown: true,
        headerTitle: () => (
          <Text style={{
            textTransform: 'capitalize',
            fontWeight: 'bold',
          }}>
            {route.params.name}
          </Text>
        ),
        headerLeft: () => (
          <Button
            appearance="ghost"
            onPress={() => navigation.goBack()}
          >
            Back
          </Button>
        ),
      })}
    />
  </Stack.Navigator>
)
