<template>
  <div class="h-screen w-full flex flex-col justify-start bg-white">
    <div id="idNotLogin" v-if="!logInStatus" class="pl-[14px] pt-[40px]">
      <p class="max-w-[375px] w-full pb-[16px]">探索課程</p>
      <p :class="wordClass" class="mb-[15px]">企業方案</p>
      <div class="w-full h-[1px] bg-[#D9D9D9] mb-[16px]"></div>
      <button @click="openLoginWindow"><p :class="wordClass">登入</p></button>
      <p :class="wordClass" class="text-[#178FAC]">註冊</p>
    </div>

    <div id="Login" v-if="logInStatus" class="h-full">
      <div class="bg-[#EFF5F8] pt-[40px] pb-[16px]">
        <div class="pl-[14px] pr-[21px]">
          <div class="flex justify-start items-center mb-[32px]">
            <img :src="logInUserImg" class="mr-[20px] w-[40px] h-[40px]" />
            <p class="text-[16px] text-[#434343]">{{ logInUserName }}</p>
          </div>
          <div class="w-full h-[1px] bg-[#D9D9D9] mb-[16px]"></div>
          <p
            v-for="(title, index) in loginTitle"
            :key="index"
            :class="wordClass"
          >
            {{ title }}
          </p>
        </div>
      </div>
      <div class="pl-[14px] pr-[21px] bg-white">
        <p :class="wordClass" class="bg-white mt-[16px]">探索課程</p>
        <div class="w-full h-[1px] bg-[#D9D9D9] my-[16px]"></div>
        <p :class="wordClass" class="bg-white">登出</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    logInStatus() {
      return this.$store.state.globalPar.loginToken.length > 0 ? true : false
    },
    logInUserName(){
      return this.$store.state.globalPar.userName
    },
    logInUserImg(){
      return this.$store.state.globalPar.userImg
    }
  },
  data() {
    return {
      wordClass: '',
      loginTitle: [
        '我的課程',
        '我的抵用卷',
        '任務版',
        '訂單記錄',
        '帳戶設定',
        '我開設的課',
      ],
    }
  },
  mounted() {
    this.wordClass = 'max-w-[375px] w-full py-[16px] text-[16px] leading-[22px]	'
  },
  methods: {
    openLoginWindow() {
      this.$emit('openLoginWindow')
    },
  },
}
</script>



