import {get, post, put, _delete} from '@/utils/http'

export function goPay(order){
    return post('http://39.98.243.100:8088/goPay',order)
}