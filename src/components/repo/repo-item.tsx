import * as React from 'react'
import { TouchableOpacity, ViewStyle, TextStyle, Text, View, ImageStyle, Image } from 'react-native'
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
  // marginVertical: spacing.item / 2,
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

const IMAGE: ImageStyle = {
  width: 78,
  height: 78,
  resizeMode: 'contain',
  borderTopRightRadius: rounding.regular,
  borderBottomRightRadius: rounding.regular,
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
      <Image source={{ uri: item.owner.avatar_url }} style={IMAGE} />
    </TouchableOpacity>
  )
})
