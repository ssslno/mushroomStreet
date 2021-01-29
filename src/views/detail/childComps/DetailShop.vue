<template>
  <div class="shop-info">
      <div class="shop-top">
          <img :src="shop.logo" alt="">
          <span>{{shop.name}}</span>
      </div>
      <div class="shop-middle">
          <div class="shop-middle-item">
            <div class="info-sells">
              <div class="sells-count">
                  {{shop.sells}}
              </div>
              <div class="sell-text">总销量</div>
            </div>
          <div class="info-goods">
              <div class="goods-count">
                  {{shop.goodsCount}}
              </div>
              <div class="goods-text">全部宝贝</div>
         </div>
          </div>
          <div class="shop-middle-right">
              <table>
                  <tr v-for="(item,index) in shop.score" :key="index">
                      <td>{{item.name}}</td>
                      <td class="score" :class="{'score-better':item.isBetter}">{{item.score}}</td>
                      <td class="better" :class="{'better-score':item.isBetter}">
                          <span>{{item.isBetter?'高':'低'}}</span>
                      </td>
                  </tr>
              </table> 
          </div>
      </div>      
  </div>
</template>

<script>
export default {
    name:'DetailShop',
    props:{
        shop:{
            type:Object,
            default(){
                return {}
            }
        }
    }

}
</script>

<style scoped>
.shop-info {
    margin-top: 30px;

}
.shop-top{
    margin-left: 10px;
}
.shop-top img{
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border:1px solid #999;
     vertical-align: middle;
} 
.shop-top span {
    display: inline-block;
    padding-left: 10px;
}
.shop-middle {
    margin-top: 30px;
    display: flex;
    
}
.shop-middle-item{
    text-align: center;
    flex:1;   
    border-right:1px solid #ccc;
}
.info-sells {
    float: left;
    padding-left: 20px;
}
.info-goods{
    float:right;
    padding-right: 20px;
}
.sells-count,.goods-count {
    font-weight: 700;
    margin-top: 10px;
}
.sell-text,.goods-text {
    margin-top:30px
}
.shop-middle-right{
    flex:1;  
    margin-left: 20px;
}
.shop-middle-right table {
    border-spacing: 10px;
    
}
.score {
    color: #eca14a;
}
.score-better{
    color:#9ad672;
}
.better {
    background-color: #eca14a;
    color:#fff;
}
.better-score{
    background-color:#9ad672;
    color:#fff
}




</style>