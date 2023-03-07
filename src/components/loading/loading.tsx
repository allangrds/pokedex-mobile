import { View } from 'react-native'
import { Spinner, Text } from '@ui-kitten/components'

import { styles } from './loading.styles'

export const Loading = () => (
  <View style={styles.wrapper}>
    <Spinner size="giant"/>
    <Text style={styles.text}>Loading...</Text>
  </View>
)
