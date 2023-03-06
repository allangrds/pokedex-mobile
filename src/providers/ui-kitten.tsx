import * as eva from '@eva-design/eva'
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'

type Props = {
  children: React.ReactNode
}

export const UiKittenProvider = ({ children }: Props) => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <ApplicationProvider {...eva} theme={eva.light}>
      {children}
    </ApplicationProvider>
  </>
)
