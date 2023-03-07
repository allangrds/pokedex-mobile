import { View } from 'react-native'
import { Text } from '@ui-kitten/components'

import { styles } from './alert.styles'

type Props = {
  text: string
  type: 'danger'
}

export const Alert = ({ text, type }: Props) => {
  const stylesToApply = styles({ type })

  return (
    <View style={stylesToApply.alert}>
      <Text style={stylesToApply.text}>
        { text }
      </Text>
    </View>
  )
}
