import {get, post, put, _delete} from '@/utils/http'

export function getShareParkingLot(){
    return get('http://localhost:8088/share-parking-lots')
}

export function postShareParkingLot(data){
    return post('http://localhost:8088/share-parking-lots',data)
}

export function publishShareParkingLot(data){
    return put('http://localhost:8088/share-parking-lots/'+data.id,data)
}

export function cancelPublishShareParkingLot(id){
    return put('http://localhost:8088/share-parking-lots/cancel/'+id)
}


