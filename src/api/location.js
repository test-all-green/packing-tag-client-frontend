import {get, post, put, _delete} from '@/utils/http'

export function getLocations(){
    return get('http://localhost:8088/share-parking-lot-locations')
}