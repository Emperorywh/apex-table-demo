import axios, { CreateAxiosDefaults } from 'axios'

const instance = axios.create({
    baseURL: '/apis',
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
        'Client-info': 'pc-h5',
        'Token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJDb21wYW55TmFtZSI6Iua1i-ivleWFrOWPuCIsIkNvbXBhbnlDb2RlIjoiVGVzdCIsIkNvbXBhbnlJZCI6MiwiREJJZCI6MSwiVXNlcklkIjoyLCJXbXNVc2VySWQiOjcsIlVzZXJOYW1lIjoiYWRtaW4iLCJTZXJ2ZXJHcm91cElkIjoxLCJMb2dpblRpbWUiOjYzODY5NzAyMTc3OTAwMjE1NywiRUlkIjoyNSwiUm9JZHMiOlsxXSwiT3duZXJJZCI6MCwiSXNPd25lciI6ZmFsc2UsIkxzdEtpZCI6W10sIkxzdEVpZCI6WzAsMjUsMjUsOTIsOTMsOTQsOTUsOTYsOTcsOTgsOTksMTAwXSwiRGVmYXVsdEtpZCI6bnVsbCwiSXNBcHAiOmZhbHNlLCJDbGllbnRJbmZvIjpudWxsLCJDb21wYW55Q2ZnIjpudWxsLCJDaGF0SWQiOiJjdWMwYTJhOTdkZTJhYTRjNGY5MGEzZTU4OGRjZGIwNWRiIiwiTWNoaWQiOiJrdGYxZTJhMGQ0OTRlMzQzZGViYTNiNDY2NDVhNDVkMWY2IiwiSXNFbmFibGVPd25lciI6dHJ1ZSwiT3duZXJDb3VudCI6MH0.NUp6JglvcDsIAvQ2tDOBz7u5MSnEGZwn33GOaJ-WQ4Y'
    }
} as CreateAxiosDefaults);


// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default instance;