import {get} from '@/utils/http'

export function getPkLots(){
    return get('http://localhost:8088/public-parking-lots')
}
