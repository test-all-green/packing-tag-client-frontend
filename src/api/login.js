import {get, post, put, _delete} from '@/utils/http'

export function login(data) {
  console.log("login...", data);
  let url = 'http://localhost:8088/staff/login'
  return post(url, data);
}