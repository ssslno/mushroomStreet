<template>
  <div class="bottom-bar">
     <div class="check-content">
          <check-button :is-checked="isSelectAll" class="check-button" @click.native="checkClick"/>
          <span>全选</span>
     </div>
     <div class="price">
         合计：{{totalPrice}}
     </div>
     <div class="calculate">
         结算:({{checkLength}})
     </div>
 
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton'
export default {
    name:'CartBottomBar',
    components:{
        CheckButton
    },
    computed:{
        totalPrice(){
            return '￥'+ this.$store.state.cartList.filter(item=>{
                return item.checked
            }).reduce((preValue,item)=>{
                return preValue+item.price*item.count
            },0).toFixed(2)

        },
        checkLength(){
            return this.$store.state.cartList.filter(item=>item.checked).length
        },
        isSelectAll(){
            // 如果存在没有被选中的 那么就有长度 就取反 变成 false 
            // return !(this.$store.state.cartList.filter(item=>!item.checked).length)
            if(this.$store.state.cartList===0) return false;
           return !this.$store.state.cartList.find(item =>!item.checked)
        }
    },
    methods:{
        checkClick(){
           if(this.isSelectAll){
               this.$store.state.cartList.forEach(item =>item.checked=false)
           }else{
               this.$store.state.cartList.forEach(item =>item.checked=true)
           }    
        }
    }
}
</script>

<style scoped>
.bottom-bar{
    height: 40px;
    line-height: 40px;
    background-color: #eee;
    position: fixed;
    bottom: 40px;
    left: 0;
    right: 0;
    display: flex;
    
}
.check-content{
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 80px;
  
    
}
.check-button{
    width: 22px;
    height: 22px;
    margin-right: 5px; 
    line-height: 22px;  
}
.price{
    margin-left: 20px;
    flex:1;   
}
.calculate{
    width: 60px;
    height: 40px;
    background-color: var(--color-tint);
    color:#fff;
    text-align: center;

}
</style>