import {get, post, put, _delete} from '@/utils/http'

export function getShareParkingLot(){
    return get('http://39.98.243.100:8088/share-parking-lots')
}

export function postShareParkingLot(data){
    return post('http://39.98.243.100:8088/share-parking-lots',data)
}

export function publishShareParkingLot(data){
    return put('http://39.98.243.100:8088/share-parking-lots/'+data.id,data)
}

export function cancelPublishShareParkingLot(id){
    return put('http://39.98.243.100:8088/share-parking-lots/cancel/'+id)
}


