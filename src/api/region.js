import {get} from '@/utils/http'

export function getRegions(){
    return get('http://39.98.243.100:8088/regions')
}