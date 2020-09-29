<template>
<div>
  <v-header :title="'物料交接记录'"></v-header>
  <div class="common-wrapper">
    <div class="common-inside">
      <div class="ticket-wrapper">
        <search-list :list="list" :record="record"></search-list>
      </div>
      <div class="personnel-wrapper">
        <personnel class="materials-personnel"></personnel>
      </div>
    </div>
    <footer-oper @search="_recordingSearch" :placeholder="'扫描集料标签二维码或员工卡'"></footer-oper>
  </div>
</div>
</template>

<script>
import SearchList from './search'
import VHeader from 'base/v-header/v-header'
import Personnel from 'base/personnel/personnel'
import FooterOper from 'base/footer-operation/footer'
import { recordingSearch } from 'api/materials'
export default {
  data() {
    return {
      list: [],
      record: {}
    }
  },
  methods: {
    _recordingSearch(code) {
      // const co = '2019081214574886'
      recordingSearch({aggregateCode: code}).then((res) => {
        if (res.result.start === 200) {
          this.list = res.result.detali
          this.record = res.result.agg
        }
      })
    }
  },
  components: {
    SearchList,
    Personnel,
    FooterOper,
    VHeader
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/style/common.styl'
.materials-personnel
  bottom 50px !important
</style>