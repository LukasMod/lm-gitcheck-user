/**
 * The options used to configure the API.
 */
export interface ApiConfig {
  /**
   * The URL of the api.
   */
  url: string

  /**
   * Milliseconds before we timeout the request.
   */
  timeout: number
}

/**
 * The default configuration for the app.
 */
export const API_CONFIG: ApiConfig = {
  url: 'https://api.github.com/', // TODO: env
  timeout: 10000,
}
