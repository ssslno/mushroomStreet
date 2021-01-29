import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartList:[]
  },
  // mutitions唯一目的就是修改states状态 做比较单一的事
  mutations,
  actions,
  getters,
  modules: {
  }
})
