<template>
  <div :class="classes" ></div>
</template>

<script>

export default {
  props:{
    rotateClass:{
      type: Array
    }
  },
  computed:{
    classes(){
      return this.rotateClass
    }
  }
}
</script>
