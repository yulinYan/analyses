/**
 *  http://192.168.2.163:90/barcodeQuery/findList   完整请求路径实例
 */

const interface_s = {
  baseURL: 'http://192.168.2.163:90/', //非生产环境
  prodBaseURL: 'http://192.168.2.163:90/',//生产环境

  findList: 'devicesCheck/findCheckTask',//在请求页面见详细使用  见test页面
}
//配置生产环境和非生产环境之间的切换
if (process.env.NODE_ENV == 'development') { //非生产环境
  interface_s.baseURL = interface_s.baseURL;
  interface_s.cloudUrl = interface_s.cloudUrl;

} else if (process.env.NODE_ENV == 'production') { //生产环境
  interface_s.baseURL = interface_s.prodBaseURL;
  interface_s.cloudUrl = interface_s.prodCloudUrl;
}
export default interface_s;
