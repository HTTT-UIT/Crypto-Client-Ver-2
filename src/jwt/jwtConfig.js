/* eslint-disable import/no-anonymous-default-export */
export default {
  tokenType: "Bearer",
  storageTokenKeyName: "accessToken",
  endPoint: "http://26.2.80.248:9091",
  key: "Bearer 1ac00da5-099b-4dbd-a98d-b7fe9ef16a1e",

  coinAssetsEndPoint: (limit) => `https://api.coincap.io/v2/assets?limit=${limit}`,

  registerEndPoint: "/api/Identity/signup",
  loginEndPoint: "/api/Identity/login",
  indentityEndPoint: "/api/Identity",
  
  getArticlesEndPoint: (params) => `/api/Blogs/?${params.tagIds}page=${params.page}&pageSize=${params.pageSize}`,
  getArticleWithIDEndPoint: (params) => `/api/Blogs/${params.id}`,

  getTagsEndPoint: () => `/api/Tags`,
  
  postReportEndPoint: `/api/Reports`

  // sendReport: (params) => ``
}