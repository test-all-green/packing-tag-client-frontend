import {get, post, put, _delete} from '@/utils/http'

export function getRegions(){
    return get('http://127.0.0.1:8088/regions')
}

export function getRegionById(id){
    return get('http://127.0.0.1:8088/regions/'+id)
}
