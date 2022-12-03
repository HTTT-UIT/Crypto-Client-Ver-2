import axios from 'axios'
import jwtDefaultConfig from "./jwtConfig"

export default class JwtService {
  jwtConfig = { ...jwtDefaultConfig }

  constructor(jwtOverrideConfig) {
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig }
    axios.interceptors.request.use(
      config => {

        const accessToken = this.getToken()
        if (accessToken) {
          config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`
        }
        config.baseURL = this.jwtConfig.endPoint
        return config
      },
      error => Promise.reject(error)
    )

    axios.interceptors.response.use(
      response => response,
      error => {

        const { config, response } = error
        const originalRequest = config

        if (response && response.status === 401) {
          window.location.href = "#/login"
        }

        return Promise.reject(error)
      }
    )
  }

  getToken() {
    return localStorage.getItem(this.jwtConfig.storageTokenKeyName)
  }

  setToken(value) {
    localStorage.setItem(this.jwtConfig.storageTokenKeyName, value)
  }

  async getDataAssets(limit) {
    return axios({
      method: 'get',
      url: this.jwtConfig.coinAssetsEndPoint(limit),
      headers: {
        Authorization: this.jwtConfig.key
      }
    })
  }
}