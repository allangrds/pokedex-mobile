import * as React from 'react'

import { RefreshControl, View } from 'react-native'
import { Input, Layout, List, ListItem, Text } from '@ui-kitten/components'

import { Alert, Loading, PokemonListItem } from '../../components'
import { usePokemons } from '../../hooks'
import { PokemonShortResponse } from '../../types'

import { styles } from './home.styles'

let timeoutId: ReturnType<typeof setTimeout>

export const HomeScreen = () => {
  const [shouldLoadMore, setShouldLoadMore] = React.useState<boolean>(true)
  const {
    errorPokemons,
    find,
    list,
    loadMore,
    loadingPokemons,
    pokemons,
    refreshingPokemons,
  } = usePokemons()
  const pokemonsExists = pokemons ? pokemons.length > 0 : false

  const handleOnLoadMore = () => loadMore()
  const handleOnRefresh = () => list('REFRESH')
  const handleOnChange = (text: string) => {
    clearTimeout(timeoutId)

    timeoutId = setTimeout(() => {
      if (text.length === 0) {
        setShouldLoadMore(true)
        list()
        return
      }

      setShouldLoadMore(false)
      find(text)
    }, 1500)
  }

  const renderItem = (
    { item }: { item: PokemonShortResponse}
  ) => (
    <ListItem style={styles.listItemWrapper}>
      <PokemonListItem
        name={item.name}
        artwork={item.artwork}
        types={item.types}
      />
    </ListItem>
  )

  return (
    <Layout style={styles.wrapper}>
      <View style={styles.inputWrapper}>
        <Input
          placeholder="Pokemon name..."
          autoCapitalize="none"
          size="large"
          onChangeText={handleOnChange}
        />
      </View>
      {
        loadingPokemons ? (
          <Loading />
        ) : undefined
      }
      {
        errorPokemons ? (
          <View style={styles.alertWrapper}>
            <Alert
              text="An error occurred while getting the pokemon list"
              type="danger"
            />
          </View>
        ) : undefined
      }
      {
        (!loadingPokemons && !errorPokemons && !pokemonsExists) ? (
          <View style={styles.emptyPokemonsWrapper}>
            <Text style={styles.emptyPokemonsText}>
              No pokemons found
            </Text>
          </View>
        ) : undefined
      }
      {
        (!loadingPokemons && !errorPokemons && pokemonsExists) ? (
          <List
            style={styles.listWrapper}
            data={pokemons}
            keyExtractor={(item) => String(item.id)}
            renderItem={renderItem}
            refreshControl={
              <RefreshControl
                refreshing={refreshingPokemons}
                progressViewOffset={100}
                onRefresh={handleOnRefresh}
              />
            }
            onEndReached={() => {
              if (shouldLoadMore) {
                handleOnLoadMore()
              }
            }}
            onEndReachedThreshold={0.8}
            ListFooterComponent={shouldLoadMore? <Loading /> : undefined}
          />
        ) : undefined
      }
    </Layout>
  )
}
