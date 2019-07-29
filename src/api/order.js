import {get, post, put, _delete} from '@/utils/http'

export function pushOrder(data){
    return post('http://localhost:8088/parking-orders',data);
}