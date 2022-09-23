import { ApisauceInstance, create } from 'apisauce'
import { ApiConfig, API_CONFIG } from './api-config'

/**
 * Manages all requests to the API.
 */
class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance

  config: ApiConfig
  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = API_CONFIG) {
    this.config = config
    this.setup()
  }

  setup() {
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: 'application/json',
      },
    })
  }
}

export default new Api()
