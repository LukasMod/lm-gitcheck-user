import { makeAutoObservable } from 'mobx'
import { observer, useLocalObservable } from 'mobx-react-lite'
import * as React from 'react'
import {
  ActivityIndicator,
  FlatList,
  ViewStyle,
  Text,
  View,
  ImageStyle,
  Image,
  TextStyle,
} from 'react-native'
import { useStores } from '../../hooks'
import { color, tpRegularTextXL } from '../../theme'
import { IRepo } from '../../types'
import { metrics } from '../../utils'
import { FooterLoading } from '../footer/footer-loading'
import { icons, Icons } from '../icon/icons'
import { RepoItem } from './repo-item'

const CONTENT: ViewStyle = {
  marginTop: 30,
  flex: 1,
}
const LIST: ViewStyle = {
  paddingBottom: 30,
}
const LOADING: ViewStyle = {
  flex: 1,
}

const EMPTY_CONTAINER: ViewStyle = {
  marginTop: 30,
  justifyContent: 'center',
  alignItems: 'center',
}
const TEXT: TextStyle = {
  ...tpRegularTextXL,
  marginBottom: 40,
  marginHorizontal: 40,
  textAlign: 'center',
}
const IMAGE: ImageStyle = {
  resizeMode: 'contain',
  width: metrics.screenWidth * 0.7,
}
const SEPARATOR: ViewStyle = {
  height: 20,
}

const keyExtractor = (item: IRepo) => `${item.id}`

const renderItem = ({ item }: { item: IRepo }) => {
  return <RepoItem item={item} />
}

const separatorItem = () => <View style={SEPARATOR} />

class LocalStore {
  constructor() {
    makeAutoObservable(this)
  }

  isRefreshing = false
  isRefreshingMore = false

  setIsRefreshing = (isRefreshing: boolean) => {
    this.isRefreshing = isRefreshing
  }

  setIsRefreshingMore = (isRefreshing: boolean) => {
    this.isRefreshingMore = isRefreshing
  }
}

interface IRepoList {
  searchText: string
}

export const RepoList = observer(({ searchText }: IRepoList) => {
  const {
    stores: {
      repoStore: { repos, repoLoading, getRepos, getReposMore, reposEmpty },
    },
  } = useStores()

  const { isRefreshing, isRefreshingMore, setIsRefreshing, setIsRefreshingMore } =
    useLocalObservable(() => new LocalStore())

  const onEndReached = async () => {
    if (isRefreshingMore) return
    setIsRefreshingMore(true)
    await getReposMore(searchText)
    setIsRefreshingMore(false)
  }

  const onRefresh = async () => {
    setIsRefreshing(true)
    await getRepos(searchText)
    setIsRefreshing(false)
  }

  if (!repos) {
    return (
      <View>
        <Text>`We couldn’t find anything for ${searchText}`</Text>
      </View>
    )
  }

  if (repoLoading) {
    return <ActivityIndicator color={color.description} style={LOADING} size="large" />
  }

  return (
    <View style={CONTENT}>
      <FlatList
        data={repos}
        contentContainerStyle={LIST}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={separatorItem}
        ListEmptyComponent={
          searchText &&
          reposEmpty && (
            <View style={EMPTY_CONTAINER}>
              <Text style={TEXT}>{`We couldn’t find anything for ${searchText}`}</Text>
              <Image source={icons[Icons.IMAGE_QUESTION_MARK]} style={IMAGE} />
            </View>
          )
        }
        ListFooterComponent={<FooterLoading isLoading={isRefreshingMore} />}
      />
    </View>
  )
})
