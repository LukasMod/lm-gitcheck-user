import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useEffect } from 'react'
import {
  View,
  ViewStyle,
  Text,
  TextStyle,
  Image,
  ImageStyle,
  ActivityIndicator,
} from 'react-native'
import { color, spacing, tpMediumTextL, tpRegularTextM } from '../theme'
import { DetailsScreenRouteProp, DetailsScreenNavProp } from '../types/navigation'
import { observer, useLocalObservable } from 'mobx-react-lite'
import { useStores } from '../hooks'
import { Section } from '../components'
import { Icons } from '../components/icon/icons'
import { metrics } from '../utils'
import { makeAutoObservable } from 'mobx'
import { IRepoDetails } from '../types'

const CONTAINER: ViewStyle = {
  flex: 1,
  paddingVertical: spacing.item,
  paddingHorizontal: spacing.screenHorizontal,
}

const IMAGE: ImageStyle = {
  width: '100%',
  height: metrics.screenHeight * 0.4,
  resizeMode: 'contain',
}
const TEXT_CONTAINER: ViewStyle = {
  marginTop: spacing.item,
}

const TITLE_TEXT: TextStyle = {
  ...tpMediumTextL,
}

const DESCRIPTION_TEXT: TextStyle = {
  ...tpRegularTextM,
}

const NO_DATA_TEXT: TextStyle = {
  ...tpMediumTextL,
  textAlign: 'center',
  marginTop: 100,
}

class LocalStore {
  constructor() {
    makeAutoObservable(this)
  }

  isLoading = false
  repoDetails: IRepoDetails = null

  setLoading = (isLoading: boolean) => {
    this.isLoading = isLoading
  }

  setRepoDetails = (repoDetails: IRepoDetails) => {
    this.repoDetails = repoDetails
  }
}

export const DetailsScreen = observer(() => {
  const route = useRoute<DetailsScreenRouteProp>()
  const navigation = useNavigation<DetailsScreenNavProp>()

  const { isLoading, setLoading, repoDetails, setRepoDetails } = useLocalObservable(
    () => new LocalStore()
  )

  const repoId = route.params?.repoId || ''

  const {
    stores: {
      repoStore: { repos, getRepoDetails },
    },
  } = useStores()

  const repoDataFromList = repos.find(r => r.id === repoId)

  const fetchData = async () => {
    setLoading(true)
    const result = await getRepoDetails(repoDataFromList.owner.login, repoDataFromList.name)
    setRepoDetails(result)
    setLoading(false)
  }

  useEffect(() => {
    if (repoDataFromList) {
      navigation.setOptions({ headerTitle: repoDataFromList.name })
      fetchData()
    }
  }, [repoDataFromList])

  if (isLoading) {
    return <ActivityIndicator color={color.description} size="large" />
  }

  if (!repoDetails || !repoDataFromList) {
    return (
      <View style={CONTAINER}>
        <Text style={NO_DATA_TEXT}>
          Ups... there was some problems with data. Please move back and try again
        </Text>
      </View>
    )
  }

  return (
    <View style={CONTAINER}>
      <Image source={{ uri: repoDetails.owner.avatar_url }} style={IMAGE} />
      <View style={TEXT_CONTAINER}>
        <Text style={TITLE_TEXT}>About</Text>
        <Text style={DESCRIPTION_TEXT}>{repoDetails.description}</Text>
      </View>
      <Section title="Forks" value={repoDetails.forks_count} icon={Icons.FORK} />
      <Section title="Stars" value={repoDetails.stargazers_count} icon={Icons.STAR} />
      <Section title="Watchers" value={repoDetails.subscribers_count} icon={Icons.EYE} />
    </View>
  )
})
