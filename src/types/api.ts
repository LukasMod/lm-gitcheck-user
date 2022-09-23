import { IRepo, IRepoDetails } from '.'
import { GeneralApiProblem } from '../services/api-problem'

export interface IReposApi extends IRepo {}
export interface IRepoDetailsApi extends IRepoDetails {}

export type GetReposResult = { kind: 'ok'; repos: IRepo[] } | GeneralApiProblem
export type GetRepoDetailsResult = { kind: 'ok'; repoDetails: IRepoDetails } | GeneralApiProblem
