var axios = require('axios');
var promiseArr = {};

function request(options) {
  return new Promise((resolve, reject) => {
   var cancel;

   var httpServer = axios.create({
     responseType: 'json',
     method: options.method,
     baseURL : options.url,
     headers: {
       'Content-Type': 'application/json',
     },
     transformRequest: [function (data) {
       return JSON.stringify(data);
     }],
     cancelToken: new axios.CancelToken(function (c) {
       cancel = c  // record the cancel function
     })
   })

   var common = httpServer.defaults.headers.common;
   httpServer.defaults.headers.common = Object.assign(common, options.headers);
   // every request will do this
   httpServer.interceptors.request.use(function (config) {
     var cancelMultiple = options.cancelMultiple ? options.cancelMultiple : false;
     //if need cancelMultiple
     if(cancelMultiple){
       if (promiseArr[config.baseURL]) {//

         promiseArr[config.baseURL] = cancel;
         promiseArr[config.baseURL]('request cancelled');
  
       } else {
         promiseArr[config.baseURL] = cancel;
       }
     }
     config.data = options.data ? options.data : {};
     return config;
    
   }, function (error) {
    
     return Promise.reject(error);
   })

   httpServer().then(res => {
     promiseArr = {};
     resolve(res.data);
     //return false
   }).catch(error => {
    
     reject(error)
   })

 })
}

module.exports = {
 request : request
};