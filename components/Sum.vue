<template>
  <div
    class="
      border-[2px]
      rounded-[10px]
      top-[100px]
      right-[100px]
      bg-white
      px-[16px]
      pb-[20px]
      sm:w-full
      md:w-full
      lg:max-w-[380px]
      sm:h-[452px]
      md:h-[452px]
      lg:h-[340px]
      sm:pt-[20px]
      md:pt-[20px]
      lg:pt-[13px]
    "
  >
    <p class="text-[#8C8C8C] text-[16px] mb-[12px] leading-[16px]">
      輸入折扣代碼
    </p>
    <!-- 輸入折扣代碼 -->
    <div class="flex justify-start items-center w-full mb-[20px]">
      <input
        class="
          h-[40px]
          mr-[12px]
          sm:mr-[0px]
          md:mr-[0px]
          focus:outline-none
          rounded-[4px]
          flex-grow
          rounded-default
          border-[#BFBFBF] border-[1px]
          p-2
          focus:border-gray-700 focus:text-gray-700
          text-gray-700
        "
      />
      <ButtonVue
        label="確定"
        :btnClass="[
          'md:hidden',
          'sm:hidden',
          'w-[76px]',
          'h-[40px]',
          'bg-[#FFE6E6]',
          'text-[#E34A4A]',
          'rounded',
          'text-[16px]',
        ]"
      />
    </div>
    <!-- 選擇抵用卷 -->
    <div
      class="
        w-auto
        flex flex-start
        items-center
        lg:h-[42px]
        md:h-[105px] md:items-start
        sm:h-[105px] sm:items-start
      "
    >
      <span class="mr-[3px] text-[18px] text-gray-600 underline"
        >選擇抵用卷</span
      >
      <img class="w-[20px] h-[20px]" src="../images/arrow-right.svg" />
    </div>
    <!-- 小金額顯示 -->
    <div
      class="
        lg:h-[47.56px]
        md:h-[85px]
        sm:h-[85px]
        flex
        justify-between
        border-t-[1px] border-[#D9D9D9]
        md:pt-[17px]
        sm:pt-[17px]
      "
    >
      <p class="text-[#8C8C8C] text-[16px] lg:pt-[21px]">金額</p>
      <p class="text-[#595959] text-[14px] lg:pt-[17.12px]">${{ sumPrice }}</p>
    </div>
    <!-- 大金額顯示 -->
    <p
      class="
        text-[#434343] text-[32px] text-right
        mb-[20.92px]
        leading-[32px]
        h-[26.52px]
      "
    >
      ${{ sumPrice }}
    </p>
    <ButtonVue
      label="前往結帳"
      :btnClass="[
        'w-full',
        'h-[40px]',
        'bg-[#E34A4A]',
        'text-white',
        'rounded-[4px]',
        'text-[16px]',
      ]"
      class="mb-[12px]"
    />
    <p class="text-xs leading-5 text-gray-600">
      點擊上方按鈕即表示您已閱讀並同意<a class="underline"
        >「 HiSKIO購買與退費政策」</a
      >
    </p>
  </div>
</template>
<script>
import ButtonVue from './Button.vue'
export default {
  components: {
    ButtonVue,
  },
  props: {
    cartArray: {
      type: Array,
    },
  },
  computed: {
    sumPrice() {
      let sum = 0
      for (let i = 0, len = this.cartArray.length; i < len; i++) {
        sum = sum + this.cartArray[i].total
      }
      return sum
    },
  },
}
</script>




