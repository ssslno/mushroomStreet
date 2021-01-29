export default{
     addCart(context,payload){
      // let oldProduct = null
      // 判断payload是否在cartlist 再来看要不要添加进去
      // for(let item of state.cartList){      
      //   if(item.iid === payload.iid){
      //     oldProduct = item
      //   }
      // }
     return new Promise((resolve,reject)=>{
      let oldProduct = context.state.cartList.find(item=>item.iid ===payload.iid)
      if(oldProduct){
        // oldProduct.count +=1
        context.commit('addCounter',oldProduct)
        resolve('当前商品数量+1')
      }
      else{
        payload.count=1
        // context.cartList.push(payload)
        context.commit('addToCart',payload)
        resolve('添加了新的商品')
      }   

     })
    }
}