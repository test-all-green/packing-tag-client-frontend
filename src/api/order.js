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
export function chooseLotInOrder(data){
    return put('http://39.98.243.100:8088/parking-orders/grabOrder',data)
}
export function grapOrder(orderId){
    return put("http://39.98.243.100:8088/parking-orders/saveParkBoyId/"+orderId)
}
export function getPkHistoryOrder(){
    return get('http://39.98.243.100:8088/parking-orders/historys-employees');
}
export function getUserOrderDetail(param) {
    let id = param.id;
    let requestParam = {
        "type": param.type
    }
    return get('http://39.98.243.100:8088/parking-orders/' + id + "/types", {type: param.type});  //....
}
export function completeOrder(orderId){
    return put('http://39.98.243.100:8088/parking-orders/finishedOrder/'+orderId);
}

export function arrvialPkLot(orderId){
    return put("http://39.98.243.100:8088/parking-orders/arrvial-parking-lot/"+orderId);
}
