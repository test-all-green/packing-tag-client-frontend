import { get, post, put, _delete } from '@/utils/http'

export function login (data, userType) {
  console.log('login...', data)
  let url
  if (userType == 1) {
    url = 'http://localhost:8088/users/login'
  } else if(userType == 2) {
    url = 'http://localhost:8088/employees/login'
  }

  return post(url, data)
}

export function signinAccount(data) {
  let url = 'http://localhost:8088/users/register';
  return post(url, data);
}
