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

  // auth
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
    localStorage.clear()
  }
  
  // Article
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

  async postFollowReport(params) {
    return axios({
      method: "post",
      url: this.jwtConfig.postFollowEndPoint,
      headers: {
        "account-id": params.userId,
        "Content-Type": "application/json"
      },
      data: JSON.stringify({
        userId: params.userId,
        blogId: params.blogId,
      })
    })
  }

  async postCommentReport(params) {
    return axios({
      method: "post",
      url: this.jwtConfig.postCommentEndPoint(params),
      headers: {
        "account-id": params.userId,
        "Content-Type": "application/json"
      },
      data: JSON.stringify({
        content: params.content,
      })
    })
  }

  async getComment(params) {
    return axios({
      method: "get",
      url: this.jwtConfig.getCommentEndPoint(params)
    })
  }

  async deleteComment(params) {
    return axios({
      method: "delete",
      url: this.jwtConfig.deleteCommentEndPoint(params),
      headers: {
        "account-id": params.userId,
      },
    })
  }

  // User
  async getUser(params) {
    return axios({
      method: "get",
      url: this.jwtConfig.getUserEndPoint(params)
    })
  }

  
  async updateUser(params) {
    return axios({
      method: "put",
      url: this.jwtConfig.updateUserEndPoint,
      headers: {
        'Content-Type': 'application/json',
        "account-id": params.userId,
      },
      data: JSON.stringify({
        ...params
      })
    })
  }

  async updateUserAvatar(params) {
    let formData = new FormData()
    formData.append("id", params.userId)
    formData.append("image", params.image)

    return axios({
      method: "put",
      url: this.jwtConfig.updateUserAvatarEndPoint,
      headers: {
        'Content-Type': 'multipart/form-data',
        "account-id": params.userId,
      },
      data: formData
    })
  }
}
