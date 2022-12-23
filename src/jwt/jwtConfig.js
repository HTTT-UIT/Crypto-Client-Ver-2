/* eslint-disable import/no-anonymous-default-export */
export default {
  tokenType: "Bearer",
  storageTokenKeyName: "accessToken",
  endPoint: "http://26.2.80.248:9091",
  key: "Bearer 1ac00da5-099b-4dbd-a98d-b7fe9ef16a1e",

  coinAssetsEndPoint: (limit) => `https://api.coincap.io/v2/assets?limit=${limit}`,
  coinDetailEndPoint: (id) => `https://api.coincap.io/v2/assets/${id}`,

  // Auth
  registerEndPoint: "/api/Identity/signup",
  loginEndPoint: "/api/Identity/login",
  indentityEndPoint: "/api/Identity",
  // Article
  getArticlesEndPoint: (params) => `/api/Blogs/?${params.tagIds}page=${params.page}&pageSize=${params.pageSize}&followerId=${params.followerId}&authorId=${params.authorId}&header=${params.search}`,
  getArticleWithIDEndPoint: (params) => `/api/Blogs/${params.id}`,
  getTagsEndPoint: () => `/api/Tags`,
  postReportEndPoint: `/api/Reports`,
  postFollowEndPoint: `/api/Blogs/Follow`,
  postCommentEndPoint: (params) => `/api/Blog/${params.blogId}/Comment`,
  getCommentEndPoint: (params) => `/api/Blog/${params.blogId}/Comment`,
  deleteCommentEndPoint: (params) => `/api/Blog/${params.blogId}/Comment/${params.commentId}`,
  // User
  getUserEndPoint: (params) => `/api/Users/${params.userId}`,
  updateUserEndPoint: `/api/Users`,
  updateUserAvatarEndPoint: `/api/Users/avatar`,
  // Coin
  postFavouriteEndPoint: (params) => `/api/Coins/${params.coinID}/favourite`,
  getCoinEndPoint: (params) => `/api/Coins/${params.coinID}`,
  getCoinFavouriteEndPoint: (params) => `/api/coins/favourite/?userId=${params.userId}`
  // sendReport: (params) => ``
}