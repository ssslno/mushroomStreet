<template>
<div id="detail">
   <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
   <scroll class="content" ref="scroll" :probe-type="3">
       <!--  @scroll="contentScroll"  -->
     
        <detail-swiper :top-images="topImages"/>
        <detail-name :goods="goods" />
        <detail-shop :shop="shop" />
        <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
        <detail-params-info ref="params" :param-info="paramInfo"/>
        <detail-comment ref="comment" :comment-info="commentInfo"/>
     <goods-list ref="recommend" :goods="recommends" class="goods-list-recommend"/>  
   </scroll>
   <detail-bottom-bar @addCart="addCart"/>
   <toast :message="message" :show="show"/> 
   
</div> 
  
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar';
import DetailSwiper from './childComps/DetailSwiper';
import DetailName from './childComps/DetailName';
import DetailShop from './childComps/DetailShop';
import DetailGoodsInfo from './childComps/DetailGoodsInfo';
import DetailParamsInfo from './childComps/DetailParamsInfo';
import DetailComment from './childComps/DetailComment';
import DetailBottomBar from './childComps/DetailBottomBar'


import Scroll from 'components/common/scroll/Scroll';
import GoodsList from 'components/content/goods/GoodsList';
import Toast from 'components/common/toast/Toast'


import {getDetail,Goods,Shop,GoodsParams,getRecommend} from 'network/detail'
import {debounce} from 'common/utils'
export default {
    name:'Detail',
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailName,
        DetailShop,
        Scroll,
        DetailGoodsInfo,
        GoodsParams,
        DetailParamsInfo,
        DetailComment,
        GoodsList,
        DetailBottomBar,
        Toast
       
       
    },
    data(){
        return {
            iid:null,
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
            paramInfo:{},
            commentInfo:{},
            recommends:[],
            themeTopY:[],
            getThemeTopY:null,
            currentIndex:0,
            message:'',
            show:false
          
        }
    },
       
    created(){
        //保存传入的iid 
        this.iid = this.$route.params.iid
        //根据iid请求详情数据
        getDetail(this.iid).then(res=>{
        //  获取顶部轮播数据
       // console.log(res);
        const data = res.result
        this.topImages = data.itemInfo.topImages
        //获取商品数据
        this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
        // 获取店铺信息
        this.shop = new Shop(data.shopInfo)
        // 获取商品详细信息
        this.detailInfo = data.detailInfo
        // 获取参数信息
        this.paramInfo = new GoodsParams(data.itemParams.info,data.itemParams.rule)
        // 评论信息 因为有的商品没有评论 所以先判断
        if(data.rate.cRate!==0){
            this.commentInfo = data.rate.list[0]
        }
        
       
        })
       
        
         // 请求推荐数据 
        getRecommend().then(res=>{
            console.log(res);
           this.recommends = res.data.list
        })
        // 给getThemeTopY赋值 进行防抖操作

        this.getThemeTopY = debounce(()=>{
             this.themeTopY = []
            this.themeTopY.push(0);
            this.themeTopY.push(this.$refs.params.$el.offsetTop)
            this.themeTopY.push(this.$refs.comment.$el.offsetTop)
            this.themeTopY.push(this.$refs.recommend.$el.offsetTop)
        })

    },
    methods:{
        // 监听图片加载完成时
        imageLoad(){
            this.$refs.scroll.refresh()
             this.getThemeTopY()
        },
        //tab栏点击时
        titleClick(index){
            this.$refs.scroll.scrollTo(0,-this.themeTopY[index]+44,200)
        },
        // //监听滚动的位置
        // contentScroll(position){
        //     const positionY = -position.y           
        //     let length = this.themeTopY.length
        //     for(let i = 0;i<length;i++){
        //         if(this.currentIndex!==i&&((i<length-1 && positionY>=this.themeTopY[i] &&positionY<this.themeTopY[i+1])||(i===length-1 &&positionY>=this.themeTopY[i]))){
        //         this.currentIndex = i              
        //          this.$refs.nav.currentIndex = this.currentIndex
        //     }
        //   }   
        // }
        addCart(){
        //    获取购物车展示的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title 
        // 描述信息
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        // 表述商品时 一定要传iid 因为这是商品唯一标识
        product.iid = this.iid
        // 将商品添加到购物车  && then后面 添加购物车成功
        // this.$store.commit('addCart',product)
        this.$store.dispatch('addCart',product).then(res =>{
            // console.log(res);
            this.show = true
            this.message= res 
            setTimeout(()=>{
                this.show = false
                this.message = ''

            },1500)
        })
       

        

        }

    }
}
</script>

<style scoped>
#detail{
    position: relative;
    z-index:10;
    background-color: #fff;
    height:100vh
}
.content{
    height:calc(100%-44px)
}
.detail-nav{
    position: fixed;
    z-index:9;
    background-color: #fff;
    width: 100%;
}
.goods-list-recommend{
    background-color: #fff;
}

</style>