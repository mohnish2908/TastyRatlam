const BASE_URL = process.env.REACT_APP_BASE_URL   //deployed backend base url
// console.log("Hiii",BASE_URL);


// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendOTP",
  LOGIN_API: BASE_URL + "/auth/login",
  CREATE_ADMIN_API: BASE_URL + "/auth/createAdmin",
  ADMIN_LOGIN_API: BASE_URL + "/auth/adminLogin",
}

export const productEndpoints={
  GET_PRODUCTS: BASE_URL + "/product/getAllProduct",
  GET_COMBO_PRODUCTS: BASE_URL + "/product/getAllComboProduct",
  ADD_PRODUCT: BASE_URL + "/product/addProduct",
  ADD_COMBO_PRODUCT: BASE_URL + "/product/addComboProduct",
  DELETE_PRODUCT: BASE_URL + "/product/deleteProduct",
  DELETE_COMBO_PRODUCT: BASE_URL + "/product/deleteComboProduct",
  GET_PRODUCT_BY_ID: BASE_URL + "/product/getProductById",
  GET_COMBO_PRODUCT_BY_ID: BASE_URL + "/product/getComboProductById",
}

export const adminEndpoints={

}