import * as React from 'react'

import { Layout, Text } from '@ui-kitten/components'
import { Button, Icon } from '@ui-kitten/components'

import { usePokemons } from '../../hooks'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FacebookIcon = (props: any) => <Icon name="facebook" {...props} />

const LoginButton = () => (
  <Button accessoryLeft={FacebookIcon}>Login with Facebook</Button>
)

export const HomeScreen = () => {
  const { listPokemons } =
    usePokemons()

  React.useEffect(() => {
    listPokemons()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text category="h1">HOME WITH ROUTER 3</Text>
      <LoginButton />
    </Layout>
  )
}
