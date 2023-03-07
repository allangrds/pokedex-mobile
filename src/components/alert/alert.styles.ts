import { StyleSheet } from 'react-native'

import theme from '../../theme/theme.json'

const backgroundColors = {
  danger: theme['color-danger-500'],
}

type Props = {
  type: 'danger'
}

export const styles = (props: Props) => StyleSheet.create({
  alert: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    backgroundColor: backgroundColors[props.type],
    borderRadius: 4,
  },
  text: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
})
