import { ApiResponse } from 'apisauce'
import { Api } from '.'
import { GetRepoDetailsResult, GetReposResult, IRepoDetailsApi, IReposApi } from '../types'
import { getGeneralApiProblem } from './api-problem'

class RepoApi {
  async getRepos(searchText: string): Promise<GetReposResult> {
    try {
      const response: ApiResponse<IReposApi[]> = await Api.apisauce.get(`/users/${searchText}/repos`)

      console.log('TEST response', response.data)

      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) {
          throw problem
        }
      }
      return { kind: 'ok', repos: response?.data }
    } catch (e) {
      throw Error(e.kind)
    }
  }

  async getRepoDetails(owner: string, repoName: string): Promise<GetRepoDetailsResult> {
    try {
      const response: ApiResponse<IRepoDetailsApi> = await Api.apisauce.get(
        `/repos/${owner}/${repoName}`
      )

      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) {
          throw problem
        }
      }

      return { kind: 'ok', repoDetails: response?.data }
    } catch (e) {
      throw Error(e.kind)
    }
  }
}

export default new RepoApi()
