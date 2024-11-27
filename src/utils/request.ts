import axios from 'axios';
import config from '../../webpack-config/config';

const { BASE_URL } = config;
const httpService = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

const codeMessage: { [key: number]: string } = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

// 请求拦截器
httpService.interceptors.request.use(
  (config) => {
    // 添加请求头
    const commom = {
      Authorization: 'Bearer token',
    };
    config.headers = Object.assign(commom, config.headers);
    if (!config.headers || !config.headers?.Authorization) {
      config.cancelToken = new axios.CancelToken((cancel) => {
        cancel();
      });
    }
    return config;
  },
  (error) => {
    // 请求错误处理
    console.log('requestError: ', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
httpService.interceptors.response.use(
  (response) => {
    // 处理响应数据
    if (response.status !== 200) {
      console.error(response.data.message);
    } else {
      return response.data;
    }
  },
  (error) => {
    if (error.response) {
      const {
        response: {
          status,
          data: { message },
        },
      } = error;
      const errorText = codeMessage[status] || message;

      if (status === 401) {
        window.location.hash = '/login';
      } else {
        console.error(errorText);
      }
    }
  }
);

export default httpService;
