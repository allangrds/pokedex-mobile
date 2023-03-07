import { Image, View } from 'react-native'
import { Card, Text } from '@ui-kitten/components'

import { styles } from './pokemon-list-item.styles'

type Props = {
  artwork: string
  name: string
  onPress: (name: string) => void
  types: string[]
}

export const PokemonListItem = ({
  artwork,
  name,
  onPress,
  types,
}: Props) => {
  const handleOnPress = () => onPress(name)

  return (
    <Card
    style={styles.card}
    onPress={handleOnPress}
    accessible={true}
    accessibilityRole={"button"}
  >
    <View style={styles.wrapper}>
      <View>
        <Text style={styles.pokemonName}>
          {name}
        </Text>
        <Text>
          {
            types.map((type, typeIndex) => (
              <Text key={typeIndex} style={styles.pokemonType}>
                {type}
                { typeIndex < types.length - 1 ? ', ' : '' }
              </Text>
            ))
          }
        </Text>
      </View>
      <Image
        accessible={true}
        accessibilityHint={`Pokemon Artwork - ${name}`}
        accessibilityRole={"image"}
        style={styles.pokemonImage}
        source={{
          uri: artwork,
        }}
      />
    </View>
  </Card>
  )
}
