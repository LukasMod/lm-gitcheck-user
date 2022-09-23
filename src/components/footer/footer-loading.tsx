import * as React from 'react'
import { ViewStyle, ActivityIndicator } from 'react-native'
import { color } from '../../theme'
import { observer } from 'mobx-react-lite'

const LOADING_MORE: ViewStyle = {
  marginVertical: 15,
}

export interface IFooterLoading {
  isLoading: boolean
}

export const FooterLoading = observer(({ isLoading }: IFooterLoading) => {
  if (isLoading) {
    return <ActivityIndicator color={color.description} style={LOADING_MORE} size="large" />
  } else {
    return null
  }
})
