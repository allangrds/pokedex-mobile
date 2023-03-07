import { render, screen } from '@testing-library/react-native'

import { UiKittenProvider } from '../../providers'

import { Alert } from './alert'

describe('Alert', () => {
  it('should render an alert with the correct text', () => {
    render(
      <UiKittenProvider>
        <Alert text="This is an alert" type='danger' />
      </UiKittenProvider>
    )

    const alertText = screen.getByText('This is an alert')
    expect(alertText).toBeTruthy()
  })
})
