<template>
  <div class="rounded-[10px] shadow-mb-cart">
    <div
      v-for="(cart, index) in cartArray"
      :key="index"
      class="
        pl-[12px]
        pt-[12px]
        pb-[15px]
        pr-[12px]
        border-[#F0F0F0] border-b-[1px]
        bg-white
      "
    >
      <div class="flex items-start justify-start mb-[12px]">
        <img :src="cart.image" class="w-[62px] h-[34px] mr-[8px]" />
        <div class="flex-grow">
          <p class="text-[14px] w-full max-w-[220px] leading-[18px] flex-grow">
            SQL Server實戰效能調校第四部曲：縱橫交易處理
          </p>
        </div>
        <button @click="$emit('trashItem', cart)">
          <img class="w-[24px] h-[24px]" src="../images/trash.svg" />
        </button>
      </div>
      <div class="flex justify-between items-start">
        <p class="text-[13px] text-[#8C8C8C] leading-[13px]">
          {{ cart.subtotal }}
        </p>
        <p class="text-[15px] text-[#595959] leading-[15px]">
          {{ cart.total }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cartArray: {
      type: Array,
    },
  },
}
</script>




