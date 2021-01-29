import { request } from "./request";
export function getDetail(iid){
    return request({
        url:'/detail',
        params:{
            iid
        }
    })

}
export class Goods {
    constructor(itemInfo,columns,services){
        this.title = itemInfo.title
        // 描述
        this.desc=itemInfo.desc
        this.newPrice=itemInfo.price
        this.oldPrice=itemInfo.oldPrice
        this.discount=itemInfo.discountDesc 
        this.columns=columns 
        this.services =services
        this.realPrice = itemInfo.lowNowPrice 
    }
}
export class Shop{
    constructor(shopInfo){
        this.logo = shopInfo.shopLogo;
        this.name = shopInfo.name;
        this.fans = shopInfo.cFans;
        this.sells = shopInfo.cSells;
        this.score = shopInfo.score;
        this.goodsCount = shopInfo.cGoods
    }
}
export class GoodsParams{
    constructor(info,rule){
        // 某些商品可能没有值
        this.image = info.images?info.image[0]:'';
        this.infos = info.set;
        this.sizes = rule.tables;
    }
}
//商品推荐数据展示
export function getRecommend(){
    return request({
        url:'/recommend'
    })

}