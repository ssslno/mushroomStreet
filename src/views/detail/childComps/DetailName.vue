<template>
  <div v-if="Object.keys(goods).length !==0" class="base-info">
      <div class="info-price">
          <span class="new-price">{{goods.newPrice}}</span>
           <span class="old-price">{{goods.oldPrice}}</span>
           <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
      </div>
      <div class="info-title">{{goods.title}}</div>
      <div class="info-other">
          <span>{{goods.columns[0]}}</span>
          <span>{{goods.columns[1]}}</span>
          <span>{{goods.services[goods.services.length-1].name}}</span>
      </div> 
      <div class="info-service">
          <span class="info-service-item" v-for="index in goods.services.length-1" :key="index">
              <img :src="goods.services[index-1].icon" alt="">
              <span>{{goods.services[index-1].name}}</span>
          </span>
      </div>
      <div class="info-buttom"></div>
  </div>
</template>

<script>
export default {
    name:'DetailName',
    props:{
        goods:{
            type:Object,
            default(){
                return {}
            }
        }
    }

}
</script>

<style scoped>
.info-title{
    margin-top: 10px;
    font-size: 14px;
    margin-left: 5px;
}
.info-price{
    position: relative;
    margin-top: 10px;
    margin-left: 5px;
}
.new-price{
    color:var(--color-high-text);
    font-size: 18px;
}
.old-price{
    text-decoration: line-through;
}
.discount{
    display: inline-block;
    height: 14px;
    line-height: 14px;
    background-color: var(--color-high-text);
    border-radius: 5px;
    text-align: center;
    color:#fff;
    margin-left: 10px;
}
.info-other{
    display: flex;
    margin-top: 30px;
    margin-left: 30px;
}
.info-other span {
    flex:1;
    
}
.info-buttom{
    border-bottom: 3px solid #ccc;
    margin-top: 20px;
}

.info-service{
    display: flex;
    margin-top: 20px;
}
.info-service-item{
    flex:1
}
.info-service-item img{
    width: 12px;
    height: 12px;

} 


</style>