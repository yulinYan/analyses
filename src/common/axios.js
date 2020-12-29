/**
 * http请求拦截处理
 */
import axios from 'axios'
const instance = axios.create();
instance.defaults.headers = {
  'Content-Type': 'application/x-www-form-urlencoded'
};
instance.all = axios.all;
// http请求拦截器
// instance.interceptors.request.use(config => {

// });
// http响应拦截器
// instance.interceptors.response.use(
//   response => {

//   }
// );
export default instance;
