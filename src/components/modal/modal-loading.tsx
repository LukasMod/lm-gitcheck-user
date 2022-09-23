import React from 'react'
import { View, ActivityIndicator, ViewStyle, StyleSheet } from 'react-native'
import { color } from '../../theme'
import { observer } from 'mobx-react-lite'

const CONTAINER: ViewStyle = {
  ...StyleSheet.absoluteFillObject,
  backgroundColor: color.background,
  opacity: 0.75,
  alignItems: 'center',
  justifyContent: 'center',
}

interface LoadingModalProps {
  show: boolean
}

export const ModalLoading = observer(({ show }: LoadingModalProps) => {
  return (
    show && (
      <View style={CONTAINER}>
        <ActivityIndicator size="large" color={color.primary} />
      </View>
    )
  )
})
