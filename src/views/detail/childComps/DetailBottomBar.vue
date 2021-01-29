<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
          <div>
          <span class="text">客服</span>
      </div>
      <div>
          <span class="text">店铺</span>
      </div>
      <div>
          <span class="text">收藏</span>
      </div>
    </div>
      <div class="bar-item bar-right">
          <div class="cart" @click="addToCart">加入购物车</div>
          <div class="buy">购买</div>
      </div> 
  </div>
</template>

<script>
export default {
    name:"DetailBottomBar",
    methods:{
        addToCart(){
           this.$emit('addCart')
        }
    }

}
</script>

<style scoped>
.bottom-bar{
    position: fixed;
    height: 49px;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    text-align: center;
    background-color: #fff;

}
.bar-item {
    flex:1;
    display: flex;
}
.bar-item>div{
    flex:1
}
.bar-left .text{
    font-size: 13px;
    line-height: 49px;

}

.bar-right{
    font-size: 15px;
    color:#fff;
    line-height: 58px;
}
.bar-right .cart {
    background: pink;
    color:#333
}
.bar-right .buy{
    background: #f69;
}

</style>
