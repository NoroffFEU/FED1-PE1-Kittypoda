export const API_BASE_URL = 'https://v2.api.noroff.dev';
const API_REGISTER_URL = '/auth/register';
const API_LOGIN_URL = '/auth/login';



export const apiRegisterAccount = API_BASE_URL + API_REGISTER_URL
console.log(apiRegisterAccount);

export const apiLogin = API_BASE_URL + API_LOGIN_URL
console.log(apiLogin)

const userName = JSON.parse (localStorage.getItem('userName'))
console.log(userName)

export const API_USER_URL = `/blog/posts/${userName}`
console.log(API_USER_URL)

export const apiUserurl = API_BASE_URL + API_USER_URL
console.log(apiUserurl)