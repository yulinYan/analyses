<template>
  <div>
    请求接口实例
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {}
  },
  mounted() {
    this.getUnfinshedTask() //触发方法 发起请求
  },
  methods: {
    getUnfinshedTask() {
      this.$axios({
        url: this.API.findList,
        method: 'get', //提交方式：get和post，同 params 和 data配合使用
        params: {
          //请求需要的参数
        }
      }).then(res => {
        console.log(res)
      })
    }
  }
}
</script>