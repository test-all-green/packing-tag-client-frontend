import {get, post, put, _delete} from '@/utils/http'

export function getOrders(){
    return get('http://39.98.243.100:8088/parking-orders')
}
export function pushOrder(data){
    return post('http://39.98.243.100:8088/parking-orders',data);
}
export function getHistoryOrder(){
    return get('http://39.98.243.100:8088/parking-orders/history');
}