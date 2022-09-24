import React, { useEffect } from 'react'
import { Text, TextStyle, ViewStyle } from 'react-native'
import { InputSearchbar, RepoList } from '../components'
import { color, spacing, tpRegularTextM } from '../theme'
import { observer, useLocalObservable } from 'mobx-react-lite'
import { useStores } from '../hooks'
import { makeAutoObservable } from 'mobx'
import { SafeAreaView } from 'react-native-safe-area-context'
import { HomeScreenNavProp } from '../types'
import { useNavigation } from '@react-navigation/native'

const CONTAINER: ViewStyle = {
  flex: 1,
  paddingTop: spacing.screenTop,
  paddingHorizontal: spacing.screenHorizontal,
}

const ERROR_TEXT: TextStyle = {
  ...tpRegularTextM,
  color: color.error,
  marginVertical: spacing.itemSmall,
}

const searchRegexp = /^[A-Za-z0-9]*$/

class LocalStore {
  constructor() {
    makeAutoObservable(this)
  }

  searchText = ''

  isErrorInput = false

  setErrorInput = (isError: boolean) => {
    this.isErrorInput = isError
  }

  setSearchText = (text: string) => {
    this.searchText = text
  }
}

export const HomeScreen = observer(() => {
  const navigation = useNavigation<HomeScreenNavProp>()

  const { searchText, setSearchText, setErrorInput, isErrorInput } = useLocalObservable(
    () => new LocalStore()
  )

  const {
    stores: {
      repoStore: { getReposDebounce, setRepos, setReposEmpty },
    },
  } = useStores()

  useEffect(() => {
    handleSearching(searchText)
  }, [searchText])

  const handleSearching = (text: string) => {
    if (searchRegexp.test(text)) {
      setErrorInput(false)
      getReposDebounce(text)
    } else {
      setErrorInput(true)
      setReposEmpty(false)
      setRepos([])
    }
  }

  const onPressItem = (repoId: number) => {
    navigation.navigate('Details', { repoId })
  }

  return (
    <SafeAreaView style={CONTAINER}>
      <InputSearchbar
        setText={setSearchText}
        text={searchText}
        placeholder={'User login ...'}
        isError={isErrorInput}
      />
      {isErrorInput && <Text style={ERROR_TEXT}>Use only letters and numbers</Text>}
      <RepoList searchText={searchText} onPressItem={onPressItem} />
    </SafeAreaView>
  )
})
