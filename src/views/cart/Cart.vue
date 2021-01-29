<template>
 <div class="cart">
   <!-- 导航栏 -->
   <nav-bar class="nav-bar">
     <div slot="center">购物车({{cartLength}})</div>
   </nav-bar>
   <!-- 商品列表 -->
  <scroll class="content" ref="scroll">
     <cart-list/>
  </scroll>
   <!-- 底部汇总 -->
   <cart-bottom-bar/>
 </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import {mapGetters} from 'vuex'
import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'
import Scroll from 'components/common/scroll/Scroll'
export default {
    name:"Cart",
    components:{
      NavBar,
      CartList,
      Scroll,
      CartBottomBar
    },
    computed:{
     ...mapGetters(['cartLength','cartList'])
    },
   activated(){
     this.$refs.scroll.refresh()

   }

}
</script>

<style scoped>
.cart{
  height: 100vh;
}
.nav-bar{
  background-color: var(--color-tint);
}
.nav-bar div {
  color:#fff
}
.content {
   overflow: hidden; 
  position: absolute;
  top: 44px;
  bottom: 89px;
  left: 0;
  right: 0;
 
}
</style>