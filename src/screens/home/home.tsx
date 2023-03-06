import {
  Layout,
  Text,
} from '@ui-kitten/components'
import { Button, Icon } from '@ui-kitten/components'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FacebookIcon = (props: any) => <Icon name="facebook" {...props} />

const LoginButton = () => (
  <Button accessoryLeft={FacebookIcon}>Login with Facebook</Button>
)

export const HomeScreen = () => (
  <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text category="h1">HOME WITH ROUTER</Text>
    <LoginButton />
  </Layout>
)
