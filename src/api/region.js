import {get, post, put, _delete} from '@/utils/http'

export function getRegions(){
    return get('http://39.98.243.100:8088/regions')
}

export function getRegionById(id){
    return get('http://39.98.243.100:8088/regions/'+id)
}
