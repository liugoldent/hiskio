import Vue from 'vue'

Vue.directive('price', function (el, binding) {
  el.innerHTML = binding.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
})
