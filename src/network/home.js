import {request} from './request';
export function getHomeMultidata(){
    return request({
        url:'/home/multidata'
    })
}
//要传参数 类型和页码
export function getHomeGoods(type,page){
    return request({
        url:'/home/data',
        params:{
            type,
            page
        }
    })

}