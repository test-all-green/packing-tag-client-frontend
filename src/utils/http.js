import axios from 'axios'
import { MessageBox, Message } from 'element-ui'

const service = axios.create({
  baseURL: '', // url = base url + request url
  timeout: 5000 // request timeout
})

service.interceptors.request.use(
  config => {
    if(window.localStorage.getItem('access-token')) {
      console.log("token: " + window.localStorage.getItem('access-token'));
      config.headers['token'] = window.localStorage.getItem('access-token');
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  
  response => {
    const res = response

    return res;
  },
  error => {
    Message.error(error.response.data.message)
    return Promise.reject(error)
  }
)

export function post(url, data={}, params={}) {
  return service({
    method: 'post',
    url,
    data,
    params,
    headers: {
      'Content-Type': 'application/json'
    },
  })
}

export function get(url, params={}) {
  return service({
    method: 'get',
    url,
    params
  })
}

export function put(url, data={}, params={}){
  return service({
    method: 'put',
    url,
    params,
    data,
    headers: {
      'Content-Type': 'application/json'
    },
  })
}

export function _delete(url, params={}) {
  return service({
    method: 'delete',
    url,
    params
  })
}

export default service;