import {get, post, put, _delete} from '@/utils/http'

export function getLocations(){
    return get('http://39.98.243.100:8088/share-parking-lot-locations')
}