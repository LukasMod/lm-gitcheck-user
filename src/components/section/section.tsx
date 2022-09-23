import * as React from 'react'
import { ViewStyle, TextStyle, Text, View, ImageStyle } from 'react-native'
import { color, tpMediumTextL, tpRegularTextM } from '../../theme'
import { observer } from 'mobx-react-lite'
import { Icons } from '../icon/icons'
import { Icon } from '../icon/icon'
import { bigNumberText } from '../../utils/helpers'

const CONTAINER: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderBottomColor: color.separator,
  borderBottomWidth: 1,
  marginTop: 18,
  paddingBottom: 10,
}

const VALUE_CONTAINER: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
}

const TITLE_TEXT: TextStyle = {
  ...tpMediumTextL,
}
const DESCRIPTION_TEXT: TextStyle = {
  ...tpRegularTextM,
  marginRight: 10,
}
const ICON: ImageStyle = {
  tintColor: color.description,
}

export interface ISection {
  title: string
  value: number
  icon: Icons
}

export const Section = observer(({ title, value, icon }: ISection) => {
  return (
    <View style={CONTAINER}>
      <Text style={TITLE_TEXT}>{title}</Text>
      <View style={VALUE_CONTAINER}>
        <Text style={DESCRIPTION_TEXT}>{bigNumberText(value)}</Text>
        <Icon style={ICON} icon={icon} size={24} />
      </View>
    </View>
  )
})
