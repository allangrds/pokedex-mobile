import * as React from 'react'

import { FlatList, Image, View } from 'react-native'
import { Layout, Text } from '@ui-kitten/components'

import { Alert, Loading } from '../../components'
import { usePokemons } from '../../hooks'

import { styles } from './details.styles'

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  route: any
}

const HorizontalLine = () => (
  <View style={styles.horizontalLine} />
)

const PokemonStats = (
  { pokemon }: { pokemon: { stats: { [key: string]: number } } }
) => (
  <>
    {
      Object.keys(pokemon.stats).map((stat) => (
        <Text key={stat} style={styles.sectionListItem}>
          {stat}: {pokemon.stats[stat]}
        </Text>
      ))
    }
  </>
)

export const DetailsScreen = ({ route }: Props) => {
  const { errorPokemons, find, loadingPokemons, pokemon } = usePokemons()
  const { name } = route.params

  React.useEffect(() => {
    find(name)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderAbilities = (item: { item: string }) => (
    <Text style={styles.sectionListItem}>
      { item.item }
    </Text>
  )

  return (
    <>
      {
        loadingPokemons ? (
          <Loading />
        ) : undefined
      }
      {
        errorPokemons ? (
          <View style={styles.alertWrapper}>
            <Alert
              text="An error occurred while getting the pokemon"
              type="danger"
            />
          </View>
        ) : undefined
      }
      {
        pokemon ? (
          <Layout style={styles.wrapper}>
            <View style={styles.header}>
              <View>
                <Text style={styles.pokemonName}>
                  {name}
                </Text>
                <Text>
                  {
                    pokemon.types.map((type, typeIndex) => (
                      <Text key={typeIndex} style={styles.pokemonType}>
                        { type }
                        { typeIndex < pokemon.types.length - 1 ? ', ' : '' }
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
                  uri: pokemon.artwork,
                }}
              />
            </View>
            <HorizontalLine />
            <View>
              <Text style={styles.sectionTitle}>
                Abilities
              </Text>
              <FlatList
                data={pokemon.abilities}
                keyExtractor={(item) => item}
                renderItem={renderAbilities}
              />
            </View>
            <HorizontalLine />
            <View>
              <Text style={styles.sectionTitle}>
                Species
              </Text>
              <Text style={styles.sectionItem}>
                { pokemon.species }
              </Text>
            </View>
            <HorizontalLine />
            <View>
              <Text style={styles.sectionTitle}>
                Stats
              </Text>
              <View>
                <PokemonStats pokemon={pokemon} />
              </View>
            </View>
          </Layout>
        ) : undefined
      }
    </>
  )
}
