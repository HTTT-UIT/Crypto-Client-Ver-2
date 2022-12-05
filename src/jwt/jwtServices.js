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

  setUserData(value) {
    localStorage.setItem("userData", JSON.stringify(value))
  }

  getUserData() {
    return JSON.parse(localStorage.getItem("userData"))
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

  async login(params) {
    return axios({
      method: "post",
      url: this.jwtConfig.loginEndPoint,
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify({
        username: params.username,
        password: params.password
      })
    })
  }

  async indentity() {
    return axios({
      method: "get",
      url: this.jwtConfig.indentityEndPoint
    })
  }

  async register(params) {
    return axios({
      method: "post",
      url: this.jwtConfig.registerEndPoint,
      headers: {
        "Content-Type": "application/json"
      },
      data: JSON.stringify({
        username: params.username,
        password: params.password
      })
    })
  }

  signOut () {
    localStorage.removeItem(this.jwtConfig.storageTokenKeyName)
  }
  
  async getArticles (params) {
    return axios({
      method: "get",
      url: this.jwtConfig.getArticlesEndPoint(params),
    })
  }

  async getArticleWithID (params) {
    return axios({
      method: "get",
      url: this.jwtConfig.getArticleWithIDEndPoint(params)
    })
  }

  async getTags () {
    return axios({
      method: "get",
      url: this.jwtConfig.getTagsEndPoint()
    })
  }

  async postReport(params) {
    return axios({
      method: "post",
      url: this.jwtConfig.postReportEndPoint,
      headers: {
        "account-id": params.userId,
        "Content-Type": "application/json"
      },
      data: JSON.stringify({
        blogId: params.blogId,
        reason: params.reason,
        content: params.content
      })
    })
  }
}
