<template>
  <div v-if="Object.keys(detailInfo).length!==0" class="goods-info">
      <div class="info-desc">
          <div class="desc">{{detailInfo.sesc}}</div>
      </div>
      <div class="info-key">
          {{detailInfo.detailImage[0].key}}
      </div>
      <div class="info-list">
          <img :key="index" v-for="(item,index) in detailInfo.detailImage[0].list" :src="item" 
          @load="imgLoad" alt="">
      </div>

  </div>
</template>

<script>
export default {
    name:'DetailGoodsInfo',
    props:{
        detailInfo:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    data(){
        return{
            counter:0,
            imagesLength:0
        }
    },
    methods:{
        imgLoad(){
            //判断 所有图片都加载完了 进行一次回调就可以了
            if(++this.counter === this.imagesLength){
                this.$emit('imageLoad')
            }
        }
    },
    watch:{
        detailInfo(){
            //获取图片个数
            this.imagesLength = this.detailInfo.detailImage[0].list.length
        }
    }

}
</script>

<style scoped>
.info-list img{
    width: 100%;
    
}

</style>