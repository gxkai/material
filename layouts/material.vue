<template>
  <div>
    <headbar />
    <nuxt />
  </div>
</template>
<script>
import Vue from 'vue'
import Component from 'class-component'
import Headbar from '@/components/Headbar'
@Component({
  components: {
    Headbar
  }
})
class Meterail extends Vue {}
export default Meterail
</script>
