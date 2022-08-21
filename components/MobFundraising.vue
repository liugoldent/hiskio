<template>
  <div
    class="
      flex flex-col
      pt-[12px]
      pl-[10px]
      pb-[4px]
      relative
      bg-white
      shadow-mb-fundraising
      rounded-[6px]
    "
  >
    <img
      :src="foundDetail.lecturers[0].avatar"
      class="absolute top-[10px] right-[12px] rounded-full w-[23px] h-[23px]"
    />
    <!-- 圖片加募資% -->
    <div class="flex mb-[11px]">
      <div class="mr-[8px] w-[140px] h-[76px]">
        <img :src="foundDetail.image" />
        <div
          class="
            hover:bg-black
            w-[140px]
            h-[76px]
            absolute
            top-[11px]
            bg-gradient-to-b
            from-white
            opacity-40
            z-0
          "
        >
          <button class="hover:bg-[#ffd26b] border-red-500">
            <img
              class="absolute bottom-[6.99px] right-[45.27px] z-10 opacity-100"
              src="../images/bookMark.svg"
            />
          </button>
          <button
            @click="$emit('addCart', foundDetail)"
            class="hover:text-[#ffd26b] text-white"
          >
            <img
              class="absolute bottom-[6.99px] right-[7.58px] z-10 opacity-100"
              src="../images/shoppingCart.svg"
            />
          </button>
        </div>
      </div>
      <div class="flex-grow">
        <p class="mb-[16px] text-sm">已募資 {{ fundPercent }}%</p>
        <div class="w-[76px] h-[6px] relative mb-[16px]">
          <div class="w-full h-full bg-[#F0F0F0] rounded-[6px]"></div>
          <div
            class="absolute h-full bg-[#E34A4A] top-0 rounded-[7px]"
            :style="fundLength"
          ></div>
        </div>
        <span
          class="text-sm mr-[5px] before:content-['$']"
          v-price:currency="foundDetail.prices[0].price"
        ></span>
        <span
          class="text-sm text-[#BFBFBF] line-through before:content-['$']"
          v-price:currency="foundDetail.fixed_price"
        ></span>
      </div>
    </div>
    <p class="text-[16px]" v-price:currency="foundDetail.title"></p>
  </div>
</template>


<script>
export default {
  props: {
    foundDetail: {
      type: Object,
    },
  },
  computed: {
    fundLength() {
      const { consumers, fundraising_tickets } = this.foundDetail
      const percentNumber = Math.floor((consumers / fundraising_tickets) * 100)
      return percentNumber > 100 ? 'width: 100%' : `width: ${percentNumber}%`
    },
    fundPercent() {
      console.log(this.foundDetail)
      const { consumers, fundraising_tickets } = this.foundDetail
      return Math.floor((consumers / fundraising_tickets) * 100)
    },
  },
}
</script>

