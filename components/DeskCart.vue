<template>
  <div class="rounded-[10px] bg-white w-full max-w-[776px] shadow-desk-cart">
    <header
      class="
        h-[44px]
        flex
        items-center
        border-b-1 border-gray-400
        text-gray-600
        pl-[12px]
      "
    >
      <span class="w-1/2">項目</span>
      <div class="flex flex-grow items-center justify-between text-center">
        <span class="w-1/3 flex-shrink-0">售價</span>
        <span class="w-1/3 flex-grow">&nbsp;</span>
        <span class="w-1/3 flex-shrink-0">結帳金額</span>
      </div>
      <span class="w-[48px]">&nbsp;</span>
    </header>
    <ul>
      <li
        class="h-[108px]"
        v-for="(cartDetail, index) in cartArray"
        :key="index"
      >
        <div
          class="
            flex flex-row
            items-center
            h-[108px]
            border-t-[2px] border-[#D9D9D9] border-solid
          "
        >
          <!-- 圖片+文字敘述 -->
          <div class="flex w-1/2 items-start mr-[6px]">
            <div class="relative mr-[12px] pl-[12px] flex-shrink-0">
              <!-- 圖片svg -->
              <img :src="cartDetail.image" class="w-[120px] h-[68px]" />
            </div>
            <a
              ><p
                class="
                  self-start
                  font-medium
                  text-gray-700 text-ellipsis
                  overflow-hidden
                  max-w-[220px]
                  h-[71.78px]
                "
              >
                {{ cartDetail.name }}
              </p></a
            >
          </div>
          <!-- 金額部分 -->
          <div class="flex flex-grow items-center justify-between text-center">
            <!-- 售價 -->
            <span
              class="w-1/3 flex-shrink-0 text-lg text-gray-600 text-[18px]"
              >{{ cartDetail.subtotal }}</span
            >
            <!-- 結帳金額 -->
            <span
              class="w-1/3 flex-shrink-0 break-all text-gray-700 text-[22px]"
              >{{ cartDetail.total }}</span
            >
          </div>
          <!-- 垃圾桶 -->
          <button
            class="
              w-[48px]
              text-lg text-gray-500
              hover:text-gray-400
              focus:text-gray-600
            "
            @click="$emit('trashItem', cartDetail)"
          >
            <img class="w-[24px] h-[24px]" src="../images/trash.svg" />
          </button>
        </div>
      </li>
    </ul>
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





