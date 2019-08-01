import {get} from '@/utils/http'

export function getPkLots(orderId){
    return get('http://127.0.0.1:8088/public-parking-lots',{orderId:orderId})
}
export function getShareLots(orderId){
  return get('http://127.0.0.1:8088/share-parking-lots',{orderId:orderId})

}