import {get, post, put, _delete} from '@/utils/http'

export function getOrders(status){
    return get('http://localhost:8088/parking-orders',{status:status})
}
export function pushOrder(data){
    return post('http://localhost:8088/parking-orders',data);
}
export function getHistoryOrder(){
    return get('http://localhost:8088/parking-orders/history');
}
export function putGrapOrder(data){
    return put('http://localhost:8088/parking-orders/grabOrder',data)
}
