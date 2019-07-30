import {get} from '@/utils/http'

export function getRegions(){
    return get('http://localhost:8088/regions')
}