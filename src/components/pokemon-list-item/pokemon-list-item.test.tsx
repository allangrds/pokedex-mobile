import { render, screen } from '@testing-library/react-native'

import { UiKittenProvider } from '../../providers'

import { PokemonListItem } from './pokemon-list-item'

describe('PokemonListItem', () => {
  it('should render correctly', () => {
    render(
      <UiKittenProvider>
        <PokemonListItem
          name='bulbasaur'
          artwork='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png'
          types={['grass', 'poison']}
        />
      </UiKittenProvider>
    )

    const name = screen.getByText('bulbasaur')
    const types = screen.getByText('grass, poison, ')
    const image = screen.getByHintText('Pokemon Artwork - bulbasaur')

    expect(name).toBeTruthy()
    expect(types).toBeTruthy()
    expect(image).toBeTruthy()
    expect(image.props.source.uri).toEqual('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png')
  })
})
