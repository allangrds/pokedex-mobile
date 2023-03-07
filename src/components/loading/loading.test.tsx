import { render, screen } from '@testing-library/react-native'

import { UiKittenProvider } from '../../providers'

import { Loading } from './loading'

describe('Loading', () => {
  it('should render with the correct text', () => {
    render(
      <UiKittenProvider>
        <Loading />
      </UiKittenProvider>
    )

    const loadingText = screen.getByText('Loading...')
    expect(loadingText).toBeTruthy()
  })
})
