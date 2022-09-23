import { NavigationContainer, NavigationContainerProps } from '@react-navigation/native'
import React from 'react'
import { observer } from 'mobx-react-lite'
import { HomeStackNavigator } from './home-stack-navigator'

interface IRootNavigator extends Omit<NavigationContainerProps, 'children'> {
  onReady: () => void
}

export const RootNavigator = observer((props: IRootNavigator) => {
  return (
    <NavigationContainer {...props}>
      <HomeStackNavigator />
    </NavigationContainer>
  )
})
