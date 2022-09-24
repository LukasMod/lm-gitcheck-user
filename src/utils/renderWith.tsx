import React, { ReactNode } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { render } from '@testing-library/react-native'

export const renderWith = (children: ReactNode) => {
  return render(<NavigationContainer>{children}</NavigationContainer>)
}
