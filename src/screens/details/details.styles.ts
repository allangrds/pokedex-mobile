import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  alertWrapper: {
    paddingVertical: 14,
    paddingHorizontal: 8,
  },
  pokemonName: {
    fontSize: 37,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  pokemonType: {
    fontSize: 22,
    textTransform: 'capitalize',
  },
  pokemonImage: {
    width: 150,
    height: 150,
  },
  horizontalLine: {
    borderBottomColor: '#ecf0f1',
    borderBottomWidth: 1,
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginBottom: 10,
  },
  sectionListItem: {
    fontSize: 18,
    textTransform: 'capitalize',
    paddingVertical: 2,
  },
  sectionItem: {
    fontSize: 18,
    textTransform: 'capitalize',
  },
})
