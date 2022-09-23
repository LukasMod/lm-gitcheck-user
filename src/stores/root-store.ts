import RepoStore from './repo-store'

export interface Stores {
  repoStore: RepoStore
}

const stores = (store: RootStore): Stores => ({
  repoStore: new RepoStore(store),
})

class RootStore {
  stores: Stores = stores(this)
}

export default RootStore
