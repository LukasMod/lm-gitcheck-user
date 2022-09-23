import { makeObservable, observable, action, flow } from 'mobx'
import { Alert } from 'react-native'
import repoApi from '../services/repo-api'
import { GetRepoDetailsResult, GetReposResult, IRepo } from '../types'
import RootStore from './root-store'
import debounce from 'lodash.debounce'

export default class RepoStore {
  rootStore: RootStore
  repos: IRepo[] = []
  repoLoading = false
  reposEmpty = false

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore

    makeObservable(this, {
      repos: observable,
      repoLoading: observable,
      reposEmpty: observable,

      setRepoLoading: action,
      setRepos: action,
      setReposEmpty: action,
    })
  }

  setRepoLoading = (isLoading: boolean) => {
    this.repoLoading = isLoading
  }

  setRepos = (repos: IRepo[]) => {
    this.repos = repos
  }

  setReposEmpty = (isEmpty: boolean) => {
    this.reposEmpty = isEmpty
  }

  getRepos = flow(function* (this: RepoStore, searchText?: string, loading?: boolean) {
    try {
      loading && this.setRepoLoading(true)
      const response: GetReposResult = yield repoApi.getRepos(searchText)
      if (response.kind !== 'ok') throw Error(response.kind)

      this.setReposEmpty(Boolean(!response.repos?.length))
      this.setRepos(response.repos)
    } catch (e) {
      console.log('getRepos', e)
      if (e.message === 'forbidden') {
        Alert.alert('Search limit reached, try again later')
      } else {
        this.setRepos([])
      }
    } finally {
      this.setRepoLoading(false)
    }
  }).bind(this)

  getReposDebounce = debounce((searchText: string) => {
    if (searchText.length) {
      this.getRepos(searchText, true)
    } else {
      this.setRepos([])
    }
  }, 500)

  getRepoDetails = flow(function* (this: RepoStore, owner: string, repoName: string) {
    try {
      const response: GetRepoDetailsResult = yield repoApi.getRepoDetails(owner, repoName)
      if (response.kind !== 'ok') {
        throw Error(response.kind)
      }
      return response.repoDetails
    } catch (e) {
      console.log('getRepoDetails', e)
      if (e.message === 'forbidden') {
        Alert.alert('Api limit reached, try again later')
      }
      return null
    }
  }).bind(this)
}
