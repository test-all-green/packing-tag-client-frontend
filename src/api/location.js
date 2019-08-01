import {get, post, put, _delete} from '@/utils/http'

export function getLocations(){
    return get('http://127.0.0.1:8088/share-parking-lot-locations')
}