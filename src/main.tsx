import * as eva from '@eva-design/eva'
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  Text,
} from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { Button, Icon } from '@ui-kitten/components'

import { StatusBar } from 'expo-status-bar'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FacebookIcon = (props: any) => <Icon name="facebook" {...props} />

const LoginButton = () => (
  <Button accessoryLeft={FacebookIcon}>Login with Facebook</Button>
)

const HomeScreen = () => (
  <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text category="h1">HOME MAIN</Text>
    <LoginButton />
  </Layout>
)

export const Main = () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
      <HomeScreen />
      <StatusBar style="auto" />
    </ApplicationProvider>
  </>
)
