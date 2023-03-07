import { fireEvent, render, screen } from '@testing-library/react-native'

import { UiKittenProvider } from '../../providers'

import { PokemonListItem } from './pokemon-list-item'

describe('PokemonListItem', () => {
  it('should render correctly', () => {
    const onPress = jest.fn()

    render(
      <UiKittenProvider>
        <PokemonListItem
          name='bulbasaur'
          artwork='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png'
          types={['grass', 'poison']}
          onPress={onPress}
        />
      </UiKittenProvider>
    )

    const name = screen.getByText('bulbasaur')
    const types = screen.getByText('grass, poison')
    const image = screen.getByHintText('Pokemon Artwork - bulbasaur')
    const button = screen.getByRole('button')

    expect(onPress).not.toHaveBeenCalled()
    fireEvent.press(button)

    expect(name).toBeTruthy()
    expect(types).toBeTruthy()
    expect(image).toBeTruthy()
    expect(image.props.source.uri).toEqual('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png')
    expect(onPress).toHaveBeenCalledTimes(1)
  })
})
