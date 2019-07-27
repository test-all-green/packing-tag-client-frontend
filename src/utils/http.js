import axios from 'axios'
import { MessageBox, Message } from 'element-ui'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000 // request timeout
})

service.interceptors.request.use(
  config => {
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
    const res = response.data

    return res;
  },
  error => {
    
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