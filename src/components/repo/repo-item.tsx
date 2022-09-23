import * as React from 'react'
import { TouchableOpacity, ViewStyle, TextStyle, Text, View } from 'react-native'
import { color, rounding, spacing, tpMediumTextL, tpRegularTextM } from '../../theme'
import { HomeScreenNavProp, IRepo } from '../../types'
import { metrics } from '../../utils'
import { observer } from 'mobx-react-lite'
import { useNavigation } from '@react-navigation/native'

const CONTAINER: ViewStyle = {
  flexDirection: 'row',
  borderColor: color.border,
  borderWidth: 1,
  borderRadius: rounding.regular,
}

const TEXT_CONTAINER: ViewStyle = {
  padding: spacing.item,
  flex: 1,
  justifyContent: 'center',
}

const TITLE_TEXT: TextStyle = {
  ...tpMediumTextL,
}
const DESCRIPTION_TEXT: TextStyle = {
  ...tpRegularTextM,
}

export interface IRepoItem {
  item: IRepo
}

export const RepoItem = observer(({ item }: IRepoItem) => {
  const navigation = useNavigation<HomeScreenNavProp>()

  const navigateToDetails = () => {
    navigation.navigate('Details', { repoId: item.id })
  }

  return (
    <TouchableOpacity
      style={CONTAINER}
      activeOpacity={metrics.activeOpacity}
      onPress={navigateToDetails}>
      <View style={TEXT_CONTAINER}>
        <Text style={TITLE_TEXT}>{item.name}</Text>
        <Text style={DESCRIPTION_TEXT} numberOfLines={1}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  )
})
