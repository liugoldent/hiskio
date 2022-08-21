<template>
  <div>
    <button type="button" :class="classes" @click="onClick" :style="style">
      {{ label }}
    </button>
  </div>
</template>


<script>
export default {
  name: 'hiskio_button',

  props: {
    label: {
      type: String,
      required: true,
    },
    primary: {
      type: Boolean,
      default: false,
    },
    backgroundColor: {
      type: String,
    },
    btnClass: {
      type: Array,
    },
  },

  computed: {
    classes() {
      return this.btnClass
    },
    style() {
      return {
        backgroundColor: this.backgroundColor,
      }
    },
  },

  methods: {
    onClick() {
      this.$emit('onClick')
    },
  },
}
</script>


