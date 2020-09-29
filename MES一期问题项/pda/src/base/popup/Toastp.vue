<template>
   <div>
     <cube-popup type="my-popup" :mask="false" ref="popups">
      <div class="cube-popup-message">
        <div class="my-message">{{message}}</div>
      </div>
    </cube-popup>
    </div>
</template>
<script>
export default {
  data() {
    return {
      message: ''
    }
  },
  methods: {
    toastshow(data, msg) {
      if (data === '') {
        data = 5000
      }
      this.message = msg
      this.$refs.popups.show()
      setTimeout(() => {
        this.$refs.popups.hide()
      }, data)
    }
  }
}
</script>
<style lang="stylus" scoped>
.my-message 
  margin-left: 20px
  margin-right: 20px
  padding: 15px
  color: #fff
  background-color: rgba(0, 0, 0, 0.8)

</style>