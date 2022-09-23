import { makeObservable, observable, action, flow } from 'mobx'
import { Alert } from 'react-native'
import repoApi from '../services/repo-api'
import { GetRepoDetailsResult, GetReposResult, IRepo } from '../types'
import RootStore from './root-store'
import debounce from 'lodash.debounce'

export default class RepoStore {
  rootStore: RootStore
  repos: IRepo[] = []
  reposPage = 1
  reposTotal = 0
  repoLoading = false
  reposEmpty = false

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore

    makeObservable(this, {
      repos: observable,
      reposPage: observable,
      reposTotal: observable,
      repoLoading: observable,
      reposEmpty: observable,

      incrementReposPage: action,
      resetReposPage: action,
      setRepoLoading: action,
      setRepos: action,
      setReposTotal: action,
      setReposEmpty: action,
    })
  }

  incrementReposPage = () => {
    this.reposPage = this.reposPage + 1
  }

  resetReposPage = () => {
    this.reposPage = 1
  }

  setRepoLoading = (isLoading: boolean) => {
    this.repoLoading = isLoading
  }

  setRepos = (repos: IRepo[]) => {
    this.repos = repos
  }

  setReposTotal = (total: number) => {
    this.reposTotal = total
  }

  setReposEmpty = (isEmpty: boolean) => {
    this.reposEmpty = isEmpty
  }

  getRepos = flow(function* (this: RepoStore, searchText?: string, loading?: boolean) {
    try {
      loading && this.setRepoLoading(true)
      const response: GetReposResult = yield repoApi.getRepos(searchText, 1)
      if (response.kind !== 'ok') throw Error(response.kind)

      this.setReposEmpty(Boolean(!response.total))
      this.setReposTotal(response.total)
      this.setRepos([...response.repos])
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

  getReposMore = flow(function* (this: RepoStore, searchText?: string) {
    try {
      if (this.repos.length === this.reposTotal) {
        console.log('Reached getRepos total')
        return
      }
      const response: GetReposResult = yield repoApi.getRepos(searchText, this.reposPage + 1)
      if (response.kind !== 'ok') throw Error(response.kind)

      this.setRepos([...this.repos, ...response.repos])
      this.setReposTotal(response.total)
      this.incrementReposPage()
    } catch (e) {
      console.log('getReposMore', e)
      if (e.message === 'forbidden') {
        Alert.alert('Api limit reached, try again later')
      }
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
