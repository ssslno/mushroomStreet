<template>
  <div class="wrapper" ref="wrapper">
    <!-- 因为bscroll外面要包裹里面要滚动的东西 -->
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name:'Scroll',
  data(){
    return {
      scroll:null
    }
  },
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    }
  },
  mounted(){
    this.scroll = new BScroll(this.$refs.wrapper,{
      click:true,
      probeType:this.probeType,
      pullUpLoad:this.pullUpLoad
   

    })
    //监听滚动的位置
    this.scroll.on('scroll',(position)=>{
      this.$emit('scroll',position)
    }),
    this.scroll.refresh()
    //监听上拉事件
    this.scroll.on('pullingUp',()=>{
      this.$emit('pullingUp')
    })


  },
  methods:{
    scrollTo(x,y,time=300){
    this.scroll && this.scroll.scrollTo(x,y,time)
    },
    finishPullUp(){
      this.scroll.finishPullUp()
    },
    refresh(){
      this.scroll && this.scroll.refresh()
    }
  }

}
</script>

<style>

</style>
