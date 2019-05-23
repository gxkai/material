<template>
  <section class="pt-10 bg-red"></section>
</template>

<script>
import Vue from 'vue'
import Component from 'class-component'
@Component
class Home extends Vue {
  layout() {
    return 'material'
  }
}
export default Home
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
  @apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
</style>
