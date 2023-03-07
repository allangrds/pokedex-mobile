import { Image, View } from 'react-native'
import { Card, Text } from '@ui-kitten/components'

import { styles } from './pokemon-list-item.styles'

type Props = {
  name: string
  artwork: string
  types: string[]
}

export const PokemonListItem = ({
  artwork,
  name,
  types,
}: Props) => (
  <Card style={styles.card}>
    <View style={styles.wrapper}>
      <View>
        <Text style={styles.pokemonName}>
          {name}
        </Text>
        <Text>
          {
            types.map((type, typeIndex) => (
              <Text key={typeIndex}>
                {type}
                { ', '}
              </Text>
            ))
          }
        </Text>
      </View>
      <Image
        accessibilityHint={`Pokemon Artwork - ${name}`}
        style={styles.pokemonImage}
        source={{
          uri: artwork,
        }}
      />
    </View>
  </Card>
)
