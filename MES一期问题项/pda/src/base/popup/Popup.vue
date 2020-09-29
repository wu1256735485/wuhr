<template >
  <div>
    <cube-popup class="popup"  :mask="false" type="my-popup"  v-model="popupVisible">
      <div class="popup_cl" @click="mask_click()">
       <div class="popup_warp" @click="warp_click()">
       <h1 class="text">库位搜索</h1>
       <div class="popup_search">
        <div class="popup_input"> 
          <cube-input 
          class="cube_input"
          :style="input_Image"
          v-model="locationcode" 
          placeholder="请输入内容"
          :clearable="clearable"
          ref="input" 
          @keyup.enter.native="searchFile()" 
          @keydown.enter.native="searchBlur()"
         ></cube-input></div>
       </div>
        <cube-scroll class="popup_scroll_wrapper" >
          <div v-for="(item,index) in location_list" v-bind:key="item.id" @click="locationname(index)">
            <p class="materialwithdrawal_item">{{item.locationName}}</p>
          </div>
        </cube-scroll>
       </div>
      </div>
    </cube-popup>
  </div>
</template>
<script>
import { getquerywarehouse } from 'common/js/httpConnection'
export default {
  data () {
    return {
      popupVisible: false,
      flage: false,
      item_flage: false,
      clearable: true,
      locationcode: '',
      location_list: [],
      input_Image: {
        backgroundImage: 'url(' + require('@/components/warehouse/pOstorage/inputbg.png') + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%'
      }
    }
  },
  methods: {
    warp_click () {
      if (!this.item_flage) {
        this.flage = true
        this.popupVisible = true
      }
      this.item_flage = false
    },
    mask_click () {
      if (!this.flage) {
        this.popupVisible = false
      }
      this.flage = false
    },
    childClick () {
      this.popupVisible = true
      this.location_list = []
      this.locationcode = ''
    },
    searchFile () {
      this.$refs.input.blur()
    },
    searchBlur () {
      if (this.locationcode === '') {
        this.showToast(this, '请输入数据')
        return
      }
      this.showIndicator(this)
      var datas = {'searchkey': this.locationcode}
      getquerywarehouse(datas).then((response) => {
        this.closeIndicator()
        console.log(response)
        if (response.status === 0) {
          this.showToast(this, response.errorMsg)
          return
        }
        this.location_list = response.result
        if (this.location_list.length === 0) {
          this.showToast(this, '未查询到数据')
        }
      }).catch((error) => {
        this.closeIndicator()
        console.log(error)
        if (error=== 307 || error=== 900 || error=== 403) return
        this.showToast(this, '请求数据失败')
      })
    },
    locationname (index) {
      this.popupVisible = false
      this.item_flage = true
      this.flage = true
      this.$emit('setlocation', this.location_list[index].locationName)
    }
  }
}
</script>
<style lang="stylus" scoped>
.popup 
  .popup_cl
   width 340px
   height 630px
   .popup_warp
    position absolute
    top 150px
    margin-left 18%
    margin-right 18%
    width 64%
    height 290px
    background #ecf8ff
    border 1px solid rgba(0, 0, 0, 0.1)
    border-radius 5px
    .text 
     margin-top 10px
     text-align center
     font-size 16px
     color #26a2ff

.popup_search
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;

.popup_input
   display: flex
   justify-content: center
   width: 100%
   .cube_input
    height 25px
    width 75%
    background none
.materialwithdrawal_item
 text-align center
 margin-top 10px
 font-size 13px
.popup_scroll_wrapper
  height: 220px
</style>
