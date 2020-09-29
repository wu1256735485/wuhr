<template>
  <div class="mtr">
    <VHeader :title="msg"></VHeader>
    <div>
      <cube-tab-bar v-model="selectedLabel"
                    class="cube_tab_bar"
                    show-slider
                    :use-transition="disabled"
                    :data="tabLabels">
      </cube-tab-bar>
       <div>
        <cube-slide
          ref="slide"
          :loop="loop"
          :initial-index="initialIndex"
          :auto-play="autoPlay"
          :show-dots="showDots"
          :options="slideOptions"
          @scroll="scroll"
          @change="changePage"
         >
          <cube-slide-item>
               <cube-scroll class="scroll-wrapper" v-if="show" :options="scrollOptions">
                 <div style="margin-top: 5px" v-for="(item1,index1) in mtr_list" v-bind:key="item1.id">
                  <div class="mtrput_title" @click="set_item_selected(index1)">
                    <div class="mtrput_item">
                    <span class="mtrput_sp">MTR号:{{item1.mtrMoveLibrary}}</span>
                    <span class="mtrput_sp">需求日期:{{item1.demandTime}}</span>
                    </div>
                    <div class="div_images" >
                      <img v-if="item1.selected" class="image_items" src="@/components/warehouse/pOstorage/yes.png" >
                    </div>
                  </div>
                  <div class="ttput_wrappers">
                  <div v-for="(item,index) in item1.mtrmoveLibraryDetailList" v-bind:key="item.id">
                    <div v-if="item1.item_show" class="ul_item">
                      <ul @click="set_listitem_selected(index1,index)">
                        <li class="mtrput_item">
                          <span class="mtrput_sp">From:{{item.fromLocation}}</span>
                          <span class="mtrput_sp">To:{{item.toLocation}}</span>
                        </li>
                        <li class="mtrput_item">
                          <span class="mtrput_sp">项目号:{{item.projectCode}}</span>
                          <span class="mtrput_sp">
                          <span class="sp_text_bold">零件号:</span>
                          <span class="sp_bold">{{item.materialCode}}</span>
                          </span>
                        </li>
                        <li class="mtrput_item">
                          <span class="mtrput_sp1">零件描述:{{item.materialName}}</span>
                        </li>
                        <li class="mtrput_item">
                          <span class="mtrput_sp">批次号:{{item.snBatch}}</span>
                          <span class="mtrput_sp">
                          <span class="sp_text_bold">数量({{item.unitCode}}):</span>
                          <span class="sp_bold">{{item.transferQuantity}}</span>
                          </span>
                        </li>
                        <li class="mtrput_item">
                          <span class="mtrput_sp">序列号:{{item.snCode}}</span>
                        </li>
                      </ul>
                      <div class="div_image" >
                      <img v-if="item.selected" class="image_items" src="@/components/warehouse/pOstorage/yes.png" >
                      </div>
                    </div>
                  </div>
                  <div class="mtrput_item2" @click="item_shows(index1)">
                        <img  v-if="item1.item_show" class="image_items" src="@/components/warehouse/mtr/shou.png" >
                        <img  v-else class="image_items" src="@/components/warehouse/mtr/kai.png" >
                    </div>
                </div>
                </div>
               </cube-scroll>
          </cube-slide-item>
          <cube-slide-item>
               <cube-scroll class="scroll-wrapper" v-if="show" :options="scrollOptions">
                 <div style="margin-top: 5px" v-for="(item1,index1) in mtrup_list" v-bind:key="item1.id">
                  <div class="mtrput_title" @click="set_item_selected(index1)">
                    <div class="mtrput_item">
                      <span class="mtrput_sp">MTR号:{{item1.mtrMoveLibrary}}</span>
                      <span class="mtrput_sp">需求日期:{{item1.demandTime}}</span>
                    </div>
                    <div class="div_images" >
                      <img v-if="item1.selected" class="image_items" src="@/components/warehouse/pOstorage/yes.png" >
                    </div>
                  </div>
                  <div class="ttput_wrappers">
                  <div v-for="(item,index) in item1.mtrmoveLibraryDetailList" v-bind:key="item.id">
                    <div v-if="item1.item_show" class="ul_item">
                    <!-- <ul @click.stop="set_item_selected(index1,index)"> -->
                      <ul>
                      <li class="mtrput_item">
                        <span class="mtrput_sp">From:{{item.fromLocation}}</span>
                        <span class="mtrput_sp">To:
                        <span><input class="sp_input" :disabled="true" style="width:90px; height: 18px;" type="text" v-model="item.toLocation"/></span>
                        <span><img class="img_edit" src="static/edit@2x.png" @click="item_click(index1,index)"></span>
                        </span>
                      </li>
                      <li class="mtrput_item">
                        <span class="mtrput_sp">项目号:{{item.projectCode}}</span>
                        <span class="mtrput_sp">
                        <span class="sp_text_bold">零件号:</span>
                        <span class="sp_bold">{{item.materialCode}}</span>
                        </span>
                      </li>
                      <li class="mtrput_item">
                        <span class="mtrput_sp1">零件描述:{{item.materialName}}</span>
                      </li>
                      <li class="mtrput_item">
                         <span class="mtrput_sp">批次号:{{item.snBatch}}</span>
                        <span class="mtrput_sp">
                        <span class="sp_text_bold">数量({{item.unitCode}}):</span>
                        <span class="sp_bold">{{item.transferQuantity}}</span>
                        </span>
                      </li>
                      <li class="mtrput_item">
                        <span class="mtrput_sp">序列号:{{item.snCode}}</span>
                      </li>
                    </ul>
                    <!-- <div class="div_image" >
                    <img v-if="item.selected" class="image_items" src="@/components/warehouse/pOstorage/yes.png" >
                    </div> -->
                  </div>
                </div>
                  <div class="mtrput_item2" @click="item_shows(index1)">
                      <img  v-if="item1.item_show" class="image_items" src="@/components/warehouse/mtr/shou.png" >
                      <img  v-else class="image_items" src="@/components/warehouse/mtr/kai.png" >
                    </div>
                </div> 
                </div>
               </cube-scroll>
          </cube-slide-item>
         </cube-slide>
        </div>
     </div>
     <VFooter @func="getadd_number" ref="ttshelf" :placeholdertext="imput_text"></VFooter>
     <div class="tt_btn_div" v-if="show_but">
        <div class="ttput_div">
            <span class="ttput_col">
              <cube-button class="but_style" :primary="true"  @click="Undercarriage">下架</cube-button>
            </span>
            <!-- <span class="ttput_col">
              <cube-button class="but_style" :primary="true" :disabled="btn_disable" @click="getprint">打印物料标签</cube-button>
            </span> -->
        </div>
      </div>
      <div class="tt_btn_div" v-else >
          <div class="ttput_div">
            <cube-button class="but_style" :primary="true" @click="Submission">提交</cube-button>
          </div>
      </div>
     <div class="div_x"></div>
     <VPopup @setlocation="getloction" ref="showpopup"></VPopup>
  </div>
</template>
<script>
import VFooter from 'base/footer/Footer'
import VPopup from 'base/popup/Popup'
import VHeader from 'base/warehouseheader/Header'
import { getMTRmovelibrary, getmtrmovelowershelflist, getmtrmoveonshelflist, getmtrmovelibrarylist, getprintmtrwl, getmtrnolowershelflibrarylist } from 'common/js/httpConnection'
import { findIndex } from 'common/helpers/util'
export default {
  data () {
    return {
      msg: 'MTR合同移库',
      disabled: false,
      show: false,
      show_but: true,
      add_number: '',
      imput_text: '输入MTR号或扫描移库单二维码',
      selectedLabel: 'MTR下架',
      listdata: [], // 下架缓存数组
      listdataup: [], // 上架缓存数组
      mtr_list: [], // 下架展示数组
      mtrup_list: [], // 上架展示数组
      mtr_list_index: '', // 展示数据主item标识
      btn_disable: false,
      MtrSelectList: [],
      stringmtrmove: '',
      queryType: 1,
      mtrmoveLibraryDetailList_index: '', // 展示数据子item标识
      tabLabels: [{
        label: 'MTR下架'
      }, {
        label: 'MTR上架'
      }],
      loop: false,
      autoPlay: false,
      showDots: false,
      currents: 0,
      slideOptions: {
        listenScroll: true,
        probeType: 2,
        directionLockThreshold: 0
      },
      scrollOptions: {
        directionLockThreshold: 0,
        click: false,
      }
    }
  },
  components: {
    VFooter,
    VPopup,
    VHeader
  },
  methods: {
    changePage (current) {
      this.selectedLabel = this.tabLabels[current].label
      if (current === 1) {
        this.currents = current
        this.show_but = false
        this.queryType = 2
        if (this.mtrup_list.length === 0) {
          this.show = false
        }
        this.getmtrup()
      } else {
        this.currents = current
        this.show_but = true
        this.queryType = 1
        if (this.mtr_list.length === 0) {
          this.show = false
        }
        this._getmtrdown()
      }
    },
    scroll (pos) {
        // const x = Math.abs(pos.x)
        // const tabItemWidth = this.$refs.tabNav.$el.clientWidth
        // const slideScrollerWidth = this.$refs.slide.slide.scrollerWidth
        // const deltaX = x / slideScrollerWidth * tabItemWidth
        // this.$refs.tabNav.setSliderTransform(deltaX)
      },
    // 控制显示
    item_shows (index) {
      if (this.currents === 0) {
        if (this.mtr_list[index].item_show) {
          this.mtr_list[index].item_show = false
        } else {
          this.mtr_list[index].item_show = true
        }
      } else {
        if (this.mtrup_list[index].item_show) {
          this.mtrup_list[index].item_show = false
        } else {
          this.mtrup_list[index].item_show = true
        }
      }
    },
    // 控制选中
    set_item_selected (index1) {
      if (this.currents === 0) {
        let flage = this.mtr_list[index1].selected
        if (flage) {
          this.mtr_list[index1].selected = false
        } else {
          this.mtr_list[index1].selected = true
        }
      } else {
        let flage = this.mtrup_list[index1].selected
        if (flage) {
          this.mtrup_list[index1].selected = false
        } else {
          this.mtrup_list[index1].selected = true
        }
      }
    },
    // 控制打印选中
    set_listitem_selected (index1, index) {
      let flage = this.mtr_list[index1].mtrmoveLibraryDetailList[index].selected
      if (flage) {
        this.mtr_list[index1].mtrmoveLibraryDetailList[index].selected = false
      } else {
        this.mtr_list[index1].mtrmoveLibraryDetailList[index].selected = true
      }
    },
    // 打开popup
    item_click (index1, index) {
      this.mtr_list_index = index1
      this.mtrmoveLibraryDetailList_index = index
      this.$refs.showpopup.childClick()
    },
    getloction (data) {
      let nwelist = this.mtrup_list[this.mtr_list_index]
      nwelist.mtrmoveLibraryDetailList.forEach((item, index) => {
        if (this.mtrmoveLibraryDetailList_index === index) {
          this.$set(item, 'toLocation', data)
        }
      })
    },
    // 得到扫码数据
    getadd_number (data) {
      this.add_number = data
      // if (this.stringmtrmove.indexOf(data) === -1) {
      //   this.stringmtrmove = this.stringmtrmove + data + ','
      // }
      this.getrequst()
    },
    getrequst () {
      this.showIndicator(this)
      var datas = {'moveLibraryCode': this.add_number, 'queryType': this.queryType}
      // 请求列表数据
      getMTRmovelibrary(datas).then((response) => {
        this.closeIndicator()
        console.log(response)
        if (response.status === 0) {
          this.showToast(this, response.errorMsg)
          return
        }
        this.mtr_list = []
        this.listdata = []
        this.mtrup_list = []
        this.listdataup = []
        console.log(response.result.length)
        if (this.currents === 0) {
          this.setdate(response.result)
        } else {
          this.setdateup(response.result)
        }
      }).catch((error) => {
        this.closeIndicator()
        console.log(error)
        if (error=== 307 || error=== 900 || error=== 403) return
        this.showToast(this, '请求数据失败')
      })
    },
    // 组合选中数据
    getcollect (list) {
      var newArray = []
      // newArray = list
      // for (var i = 0; i < list.length; i++) {
      //   let mtrmoveLibraryDetailList = list[i].mtrmoveLibraryDetailList
      //   for (var j = 0; j < mtrmoveLibraryDetailList.length; j++) {
      //     newArray.push(mtrmoveLibraryDetailList[j])
      //   }
      // }
      var selectRows = list.filter(function (item) {
        return item.selected;
      })
      if (selectRows.length > 0) {
        newArray = selectRows
      }
      return newArray
    },
    // 下架
    Undercarriage () {
      if (this.mtr_list.length === 0) {
        this.showToast(this, '无数据')
        return
      }
      this.getdownRequest()
    },
    // 打印
    getprint () {
      let newArray = []
      for (var i = 0; i < this.mtr_list.length; i++) {
        let mtrmoveLibraryDetailList = this.mtr_list[i].mtrmoveLibraryDetailList
        for (var j = 0; j < mtrmoveLibraryDetailList.length; j++) {
          newArray.push(mtrmoveLibraryDetailList[j])
        }
      }
      this.MtrSelectList = newArray.filter(function (item) {
        return item.selected;
      })
      if (this.MtrSelectList.length === 0) {
        this.showToast(this, '请选择数据')
        return
      }
      this.btn_disable = true
      $App.callconntBluetooth()
      clearTimeout(this.timeout_Submission);
      this.timeout_Submission = setTimeout(() => {
        this.btn_disable = false
      }, 5000)
    },
    // 打印数据
    getprintrequst () {
      this.showIndicator(this)
      getprintmtrwl(this.MtrSelectList).then((response) => {
        this.closeIndicator()
        console.log(response)
        if (response.status === 0) {
          this.showToast(this, response.errorMsg)
          this.getclose()
          return
        }
        if (response.status === 1) {
          this.getstartPrint(response.result)
        }
      }).catch((error) => {
        this.closeIndicator()
        this.getclose()
        console.log(error)
        if (error=== 307 || error=== 900 || error=== 403) return
        this.showToast(this, '请求数据失败')
      })
    },
    // 下架数据
    getdownRequest () {
      let newlists = this.getcollect(this.mtr_list)
      if (newlists.length === 0){
        this.showToast(this, '请选择数据')
        return
      }
       if (newlists.length >1){
        this.showToast(this, '只能选择一条数据')
        return
      }
      this.showIndicator(this)
      getmtrmovelowershelflist(newlists).then((response) => {
        this.closeIndicator()
        console.log(response)
        this.showToast(this, response.errorMsg)
        if (response.status === 1) {
          // this.add_number = this.stringmtrmove
          // this.getrequst(1)
          this.mtr_list = []
          this.listdata = []
          this.show = false
          this._getmtrdown()
        }
      }).catch((error) => {
        this.closeIndicator()
        console.log(error)
        if (error=== 307 || error=== 900 || error=== 403) return
        this.showToast(this, '请求数据失败')
      })
    },
    // 上架
    Submission () {
      if (this.mtrup_list.length === 0) {
        this.showToast(this, '无数据')
        return
      }
      let NewUpdata = this.getcollect(this.mtrup_list)
      if (NewUpdata.length === 0){
        this.showToast(this, '请选择数据')
        return
      }
       if (NewUpdata.length >1){
        this.showToast(this, '只能选择一条数据')
        return
      }
      this.showIndicator(this)
      getmtrmoveonshelflist(NewUpdata).then((response) => {
        this.closeIndicator()
        console.log(response)
        this.showToast(this, response.errorMsg)
        if (response.status === 0) {
          return
        }
        this.mtrup_list = []
        this.listdataup = []
        this.getmtrup()
      }).catch((error) => {
        this.closeIndicator()
        console.log(error)
        if (error=== 307 || error=== 900 || error=== 403) return
        this.showToast(this, '请求数据失败')
      })
    },
    // 去重 并组合下架列表数据
    setdate (list) {
      // for (var s = 0; s < list.length; s++) {
      //   let mtrmoveLibraryDetailList = list[s].mtrmoveLibraryDetailList
      //   for (var k = 0; k < mtrmoveLibraryDetailList.length; k++) {
      //     let item = mtrmoveLibraryDetailList[k]
      //     item.selected = false
      //   }
      // }
      if (this.listdata.length === 0) {
        this.listdata = list
        this.mtr_list = this.listdata
        if (this.mtr_list.length === 0) {
          this.show = false
        } else {
          this.show = true
        }
        return
      }
      for (var i = 0; i < list.length; i++) {
        let flage = true
        for (var j = 0; j < this.listdata.length; j++) {
          if (this.listdata[j].mtrMoveLibrary + '' === list[i].mtrMoveLibrary + '') {
            flage = false
          }
        }
        if (flage) {
          this.listdata.push(list[i])
        }
      }
      this.mtr_list = this.listdata
      if (this.mtr_list.length === 0) {
        this.show = false
      } else {
        this.show = true
      }
    },
    // 去重 并组合上架列表数据
    setdateup (list) {
      // for (var s = 0; s < list.length; s++) {
      //   let mtrmoveLibraryDetailList = list[s].mtrmoveLibraryDetailList
      //   for (var k = 0; k < mtrmoveLibraryDetailList.length; k++) {
      //     let item = mtrmoveLibraryDetailList[k]
      //     item.selected = false
      //   }
      // }
      if (this.listdataup.length === 0) {
        this.listdataup = list
        this.mtrup_list = this.listdataup
        if (this.mtrup_list.length === 0) {
          this.show = false
        } else {
          this.show = true
        }
        return
      }
      for (var i = 0; i < list.length; i++) {
        let flage = true
        for (var j = 0; j < this.listdataup.length; j++) {
          if (this.listdataup[j].mtrMoveLibrary + '' === list[i].mtrMoveLibrary + '') {
            flage = false
          }
        }
        if (flage) {
          this.listdataup.push(list[i])
        }
      }
      this.mtrup_list = this.listdataup
      if (this.mtrup_list.length === 0) {
        this.show = false
      } else {
        this.show = true
      }
    },
    // 上架拉取数据
    getmtrup () {
      getmtrmovelibrarylist().then((response) => {
        if (response.status === 0) {
          this.showToast(this, response.errorMsg)
          return
        }
        this.mtrup_list = []
        this.listdataup = []
        this.setdateup(response.result)
      }).catch((error) => {
        console.log(error)
        if (error=== 307 || error=== 900 || error=== 403) return
        this.showToast(this, '请求数据失败')
      })
    },
    // 下架拉取数据
    _getmtrdown () {
      getmtrnolowershelflibrarylist().then((response) => {
        if (response.status === 0) {
          this.showToast(this, response.errorMsg)
          return
        }
        this.mtr_list = []
        this.listdata = []
        this.setdate(response.result)
      }).catch((error) => {
        console.log(error)
        if (error=== 307 || error=== 900 || error=== 403) return
        this.showToast(this, '请求数据失败')
      })
    },
    // 调打印机
    getstartPrint (data) {
      clearTimeout(this.timeout_pint);
      this.timeout_pint = setTimeout(() => {
        $App.callPrint(data)
      }, 500)
    },
    // 关闭打印连接
    getclose () {
      clearTimeout(this.timeoutclose);
      this.timeoutclose = setTimeout(() => {
        $App.callcolsePrint()
      }, 500)
    },
    beCalledBLSuccess (data) {
      this.getprintrequst()
    }
  },
  computed: {
    initialIndex () {
      let index = 0
      index = findIndex(this.tabLabels, item => item.label === this.selectedLabel)
      return index
    }
  },
  mounted () {
    window.beCalledBLSuccess = this.beCalledBLSuccess
    this._getmtrdown()
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/style/warehouse.styl'
.cube_tab_bar
 height 45px
 margin-left 10px
 margin-right 10px
 margin-top 5px
 border: 1px solid rgba(0, 0, 0, 0.1)
 border-radius: 5px
 background #9acafb
.div_x
 position absolute
 top 55px
 left 50%
 width 1px
 height 25px
 background #eeeeee
.scroll-wrapper
 margin-left 10px
 margin-right 10px
 height 440px
.tt_btn_div
 position absolute
 top 595px
 width 100%
 .ttput_div
  display flex
  justify-content space-between
  margin-left 10px
  margin-right 10px
  .ttput_col
      width 100%
.but_style
  height 10px
  line-height 1px

.mtrput_title
  position relative
  padding-top 1px
  width 100%
  height 25px
  background #ecf8ff
  .div_images
    position absolute
    top 2px
    right 2px

.ttput_wrappers
 border 1px solid rgba(0, 0, 0, 0.1)
 border-radius 0 0 10px 10px
.ul_item
 height auto
 padding-bottom 3px
 border-bottom:1px solid rgba(0, 0, 0, 0.1)
 position relative
.div_image
 position absolute
 top 5px
 right 5px
.mtrput_item
  display flex
  justify-content start
  margin-right 10px
  margin-left 10px
  font-size 13px
  .mtrput_sp
    display flex
    justify-content start
    align-items center
    margin-top 5px
    width 50%
  .mtrput_sp1
   margin-top 5px
   width 100%
   padding-top 2px
   overflow hidden
   text-overflow ellipsis
   white-space nowrap
  .mtrput_sp2
   margin-top 5px
   font-size 15px
   width 100%
.mtrput_item2
 display flex
 align-items center
 width 100%
 height 26px
 margin-left 10px
 margin-right 10px        
.image_items
 width 20px
 height 20px
.img_edit
 width 15px
 height 15px
 margin-left 5px
</style>
