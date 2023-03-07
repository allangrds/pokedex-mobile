import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  card: {
    width: '100%',
  },
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pokemonName: {
    fontSize: 30,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  pokemonImage: {
    width: 100,
    height: 100,
  },
})
