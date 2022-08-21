<template>
  <div class="w-[280px] h-[348px]" v-if="Object.keys(foundDetail).length > 0">
    <div class="relative">
      <img :src="foundDetail.image" class="w-[280px] h-[153px]" />
      <div
        class="
          hover:bg-black
          w-[280px]
          h-[153px]
          absolute
          top-0
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
    <div class="px-[12px] pt-[12px] pb-[9px] bg-white">
      <p class="mb-[4.34px] h-[58px] text-[20px] text-ellipsis overflow-hidden">
        {{ foundDetail.title }}
      </p>
      <!-- 講師圖片與講師名稱 -->
      <div class="flex items-center mb-[4.21px]">
        <img
          :src="foundDetail.lecturers[0].avatar"
          class="w-[37.25px] h-[37.25px] mr-[9.61px]"
        />
        <p class="text-[#8C8C8C]">{{ foundDetail.lecturers[0].username }}</p>
      </div>
      <div class="flex justify-between mb-[6px] h-[19px]">
        <p class="text-sm">剩 3 天</p>
        <p class="text-sm">已募資{{ fundPercent }}%</p>
      </div>
      <div class="w-[256px] h-[10px] relative mb-[10px]">
        <!-- <img src="../images/percentBase.svg" />
        <img class="relative top-[-11px]" src="../images/percent55.svg" /> -->
        <div class="w-full h-full bg-[#F0F0F0] rounded-[6px]"></div>
        <div
          class="absolute h-full bg-[#E34A4A] top-0 rounded-[7px]"
          :style="fundLength"
        ></div>
      </div>
      <div class="flex justify-start items-center h-[24px]">
        <p class="mr-[4px] text-[22px] text-[#434343] leading-[22px]">
          ${{ foundDetail.prices[0].price }}
        </p>
        <p class="text-[14px] text-[#BFBFBF] leading-[14px] line-through">
          ${{ foundDetail.fixed_price }}
        </p>
      </div>
    </div>
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
      const { consumers, fundraising_tickets } = this.foundDetail
      return Math.floor((consumers / fundraising_tickets) * 100)
    },
  },
}
</script>

