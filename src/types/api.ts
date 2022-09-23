import { IRepo, IRepoDetails } from '.'
import { GeneralApiProblem } from '../services/api-problem'

export interface IReposApi {
  total_count: number
  incomplete_results: boolean
  items: IRepo[]
}
export interface IRepoDetailsApi extends IRepoDetails {}

export type GetReposResult = { kind: 'ok'; repos: IRepo[]; total: number } | GeneralApiProblem
export type GetRepoDetailsResult = { kind: 'ok'; repoDetails: IRepoDetails } | GeneralApiProblem
