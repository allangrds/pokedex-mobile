import { Text } from 'react-native'
import { render, renderHook, screen } from '@testing-library/react-native'

import { ApiProvider, useApiContext } from './use-api-context'

const fakeApi = {
  get: jest.fn(),
}

describe('ApiProvider', () => {
  it('should render correcly', () => {
    render(
      <ApiProvider api={fakeApi}>
        <Text>hello world</Text>
      </ApiProvider>
    )

    expect(screen.getByText('hello world')).toBeDefined()
  })
})

describe('useApiContext', () => {
  it('should provide the API context', () => {
    const { result } = renderHook(() => useApiContext(), {
      wrapper: ({ children }) => (
        <ApiProvider api={fakeApi}>{children}</ApiProvider>
      ),
    })

    expect(result.current.api).toBeDefined()
  })

  it('should throw an error when used outside of ApiProvider', () => {
    let errorMessage = ''
    const TestComponent = () => {
      try {
        // eslint-disable-next-line react-hooks/rules-of-hooks, @typescript-eslint/no-unused-vars
        const { api } = useApiContext()
        return <Text>Test 3</Text>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        errorMessage = error.message

        return <Text>Test 4</Text>
      }
    }

    render(<TestComponent />)

    expect(errorMessage).toBe('useApiContext must be used within a Provider')
  })
})
