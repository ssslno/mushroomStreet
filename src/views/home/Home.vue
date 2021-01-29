<template>
<div id="home">
   <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
  <tab-control  :titles="['流行','新款','精选']" @tabClick="tabClick"
   ref="tabControl1" class="tab-control" v-show="isTabFixed" />
  <scroll class="content" ref="scroll" :proto-type="3"
   @scroll="contentScroll" :pull-up-load="true"  @pullingUp="loadMore" >

     <home-swiper :banners="banners" @swiperImageLoad='swiperImageLoad'/>
   <recommend-view :recommends="recommends"/>
   <feature-view/>
   <tab-control  :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2" />
   <goods-list :goods="goods[currentType].list" ></goods-list> 
  </scroll>
  <back-top @click.native="backClick" v-show="isShowBackTop"/>
</div>
</template>

<script>

import HomeSwiper from './childComps/HomeSwiper';
import RecommendView from './childComps/RecommendView';
import FeatureView from './childComps/FeatureView';

import NavBar from 'components/common/navbar/NavBar';
import TabControl from 'components/content/tabControl/TabControl';
import GoodsList from 'components/content/goods/GoodsList';
import Scroll from 'components/common/scroll/Scroll';
import BackTop from 'components/content/backTop/BackTop';

 
import {getHomeMultidata, getHomeGoods} from 'network/home';
import {debounce} from 'common/utils'


export default {
    name:'Home',
    components:{
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
      
     
    },
    data(){
      return{
        banners:[],
        recommends:[],
        goods:{
          "pop":{page:0,list:[]},
          "new":{page:0,list:[]},
          "sell":{page:0,list:[]}
        },
        currentType:'pop',
        isShowBackTop:false,
        tabOffsetTop:0,
        isTabFixed:false,
        saveY:0
      

      }
    },
    mounted(){
    //调用防抖函数
    const refresh = debounce(this.$refs.scroll.refresh,50)
      // 监听item中图片加载完成
    this.$bus.$on('itemImageLoad',()=>{
     refresh()
    })
    // 吸顶效果  获取tabcontrol的offsetTOP 所有组件都有一个属性$el：用于获取组件中的所有元素
    // this.TabControl = this.$refs.TabControl.$el.offsetTop

    },
    created(){
      //1.请求多个数据
     this.getHomeMultidata()
    //  请求商品数据
    this. getHomeGoods('pop')
    this. getHomeGoods('new')
    this. getHomeGoods('sell')
 
    },
    methods:{
    
      getHomeMultidata(){
         getHomeMultidata().then(res =>{
        this.banners = res.data.banner.list//res是最外部的data
        this.recommends = res.data.recommend.list

      })

      },
        getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          // 在数据请求完成后 要进行新的上拉加载更多
        this.$refs.scroll.finishPullUp()
          })
        
       },
      //  tab栏切换
       tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      backClick(){
       this.$refs.scroll.scrollTo(0,0,500)
      },
      contentScroll(position){
        // 控制backTop隐藏与显示
        this.isShowBackTop = (-position.y)>1000
        //决定tabContrl是否吸顶(position:fixed)
        this.isTabFixed = (-position.y)>this.tabOffsetTop


      },
      //上拉加载更多
      loadMore(){
        this.getHomeGoods(this.currentType)
        // 进行图片刷新 为了解决图片bug
        this.$refs.scroll.refresh()
      },
      // 获取tabOffsetTop的值 做吸顶效果
      swiperImageLoad(){

         this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      }
     
    },
    activated(){
      this.$refs.scroll.scrollTo(0,this.saveY,0)
      this.$refs.scroll.refresh()

    },
    deactivated(){
      this.saveY = this.$refs.scroll.scroll.y

    }
   
}
</script>

<style scoped>
#home {
  /* padding-top: 44px;  */
  height: 100vh;
  position: relative;
}
.home-nav{
  background-color: var(--color-tint);
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index:9; */
}

.content{
   overflow: hidden; 
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
 
}
.tab-control{
  position: relative;
  z-index: 9;
}

</style>