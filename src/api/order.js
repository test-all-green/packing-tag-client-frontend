import {get, post, put, _delete} from '@/utils/http'

export function getOrders(status){
    return get('http://39.98.243.100:8088/parking-orders',{status:status})
}
export function pushOrder(data){
    return post('http://39.98.243.100:8088/parking-orders',data);
}
export function getHistoryOrder(){
    return get('http://39.98.243.100:8088/parking-orders/history');
}
export function putGrapOrder(data){
    return put('http://39.98.243.100:8088/parking-orders/grabOrder',data)
}
