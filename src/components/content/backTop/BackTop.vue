<template>
  <div class="back-top">
      <img src="~assets/img/common/top.png" alt="" @click="backClick">
  </div>
</template>

<script>
export default {
    name:"BackTop",
    methods:{
        backClick(){
        // 回到顶部

        }
    }
  

}
</script>

<style scoped>
.back-top{
    position: fixed;
    right: 10px;
    bottom: 55px;
}
.back-top img {
    width: 43px;
    height: 43px;
}
</style>