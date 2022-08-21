<template>
  <div class="w-screen h-screen fixed z-10 flex justify-center items-center">
    <div
      class="
        h-[722px]
        login:h-full
        max-h-screen
        w-full
        max-w-[450px]
        overflow-auto
      "
    >
      <!-- main content -->
      <div
        class="
          relative
          h-full
          w-full
          rounded-xl
          bg-white
          border-rounded
          flex flex-col
          justify-start
          items-center
          pt-[40px]
          pb-[28px]
          overflow-auto
          z-10
        "
      >
        <div class="absolute top-0 left-0 z-10">
          <img src="../images/login-left1.svg" />
          <img src="../images/login-left2.svg" class="relative top-[-125px]" />
        </div>
        <div class="absolute top-[280px] right-0 z-10">
          <img src="../images/login-right1.svg" class="relative right-[-9px]"/>
          <img
            src="../images/login-right2.svg"
            class="absolute bottom-[-9px]"
          />
        </div>
        <img src="../images/logo.svg" class="mb-[29px]" />
        <!-- 右上角close button -->
        <button
          class="absolute top-[30px] right-[30px] text-xl"
          @click="closeLoginWindow"
        >
          <!-- close svg -->
          <img src="../images/close.svg" />
        </button>
        <!-- 第二段登入or註冊切換鈕 -->
        <!-- <div class="w-full overflow-hidden flex justify-center mb-[23px]"> -->
        <div class="flex justify-center mb-[23px]">
          <div class="flex flex-col items-center">
            <button
              class="
                w-[160px]
                text-center text-[32px]
                font-black
                text-[#178FAC]
              "
            >
              登入
            </button>
            <div class="w-[80px] h-[4px] bg-[#178FAC]"></div>
          </div>
          <button
            class="w-[160px] text-center text-[32px] font-black text-gray-400"
          >
            註冊
          </button>
        </div>
        <!-- </div> -->
        <!-- 第三段第三方註冊段 -->
        <div class="w-full h-full">
          <div class="h-full w-full flex flex-col justify-start items-center">
            <!-- 第三方登入 -->
            <div
              class="
                flex
                items-center
                w-[320px]
                h-[48px]
                border-[1px] border-solid border-[#BFBFBF]
                rounded-[6px]
                mb-[12px]
                pl-[68px]
              "
              v-for="(iconDetail, index) in iconArray"
              :key="index"
            >
              <img :src="iconDetail.icon" class="mr-[12px]" />
              <p class="text-base text-gray-600 w-140px">
                <span>{{ iconDetail.text }}</span>
              </p>
            </div>
            <!-- 使用hiskio ID登入 -->
            <p
              class="
                mt-[12px]
                mb-[21px]
                text-center text-base text-gray-700
                w-full
              "
            >
              使用 HiSKIO ID 登入
            </p>
            <!-- hiskio 登入帳號密碼 -->
            <div class="mx-auto w-[320px] overflow-hidden">
              <ul>
                <li
                  class="
                    relative
                    h-[40px]
                    flex
                    justify-start
                    bg-[#FAFAFA]
                    rounded-[6px]
                    mb-[8px]
                  "
                >
                  <img
                    src="../images/accounts.svg"
                    class="mr-[8px] w-[20px] ml-[12px]"
                  />
                  <input
                    v-model="acc"
                    type="email"
                    placeholder="請輸入 HiSKIO ID"
                    class="input-text bg-[#FAFAFA] w-[300px] focus:outline-none"
                  />
                </li>
                <p class="text-xs text-red-400">
                  {{ accErrorMsg }}
                </p>
                <li
                  class="
                    relative
                    w-[320px]
                    h-[40px]
                    flex
                    justify-start
                    bg-[#FAFAFA]
                    rounded-[6px]
                  "
                >
                  <img
                    src="../images/lock.svg"
                    class="mr-[8px] w-[20px] ml-[12px]"
                  />
                  <input
                    v-model="pwd"
                    type="password"
                    placeholder="請輸入登入密碼"
                    class="input-text bg-[#FAFAFA] w-[300px] focus:outline-none"
                  />
                </li>
                <p class="text-xs text-red-400">
                  {{ pwdErrorMsg }}
                </p>
              </ul>
            </div>
            <!-- 同意隱私權 -->
            <div
              class="flex flex-row mt-[20px] items-center mb-[26px] w-[320px]"
            >
              <input
                type="checkbox"
                v-model="checked"
                class="mr-[5px] w-[20px] h-[20px]"
              />
              <p
                class="text-[#8C8C8C] text-sm"
                :class="{ 'text-red-500': !checked }"
              >
                登入註冊即代表您同意
              </p>
              <a
                class="text-[#8C8C8C] text-sm underline-offset-[4px] underline"
                :class="{ 'text-red-500': !checked }"
                >使用者及隱私權政策</a
              >
            </div>
            <!-- 下方登入/註冊按鈕 -->
            <ButtonVue
              label="登入"
              @onClick="login"
              :btnClass="[
                'w-[320px]',
                'h-[40px]',
                'bg-[#178FAC]',
                'text-white',
                'rounded',
                'text-[16px]',
                'mb-[20px]',
              ]"
            />
            <!-- 下方忘記密碼按鈕 -->
            <ButtonVue
              label="忘記密碼"
              :btnClass="[
                'btn-text-gray-600',
                'mx-auto',
                'flex',
                'justify-center',
                'text-center',
              ]"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="fixed bg-black w-full h-full opacity-50 z-0"></div>
  </div>
</template>

<script>
import ButtonVue from './Button.vue'
import RotateRectVue from './RotateRect.vue'
import RotateRect from './RotateRect.vue'
export default {
  components: {
    ButtonVue,
    RotateRectVue,
    RotateRect,
  },
  data() {
    return {
      checked: true, // 是否勾選隱私權
      iconArray: [], // icon的陣列
      acc: 'hiskiotest', // 使用者輸入的帳號
      pwd: 'aabb820114', // 使用者輸入的密碼
      pwdErrorMsg: '', //密碼錯誤訊息
      accErrorMsg: '', // 帳號錯誤訊息
    }
  },
  mounted() {
    this.iconArray = [
      {
        icon: require('../images/fb.svg'),
        text: '使用 Facebook 登入',
      },
      {
        icon: require('../images/google.svg'),
        text: '使用 Google 登入',
      },
      {
        icon: require('../images/github.svg'),
        text: '使用 Github 登入',
      },
      {
        icon: require('../images/linkedin.svg'),
        text: '使用 LinkedIn 登入',
      },
    ]
  },
  computed: {},
  methods: {
    /**
     * @description 關閉登入視窗
     */
    closeLoginWindow() {
      this.$emit('closeLoginWindow')
    },
    /**
     * @description 登入hiskio
     */
    login() {
      const self = this
      if (!this.checked) return
      const { baseUrl } = this.$store.state.globalPar
      this.$axios
        .post(`${baseUrl}/auth/login`, {
          account: this.acc,
          password: this.pwd,
          confirm: true,
        })
        .then((res) => {
          window.sessionStorage.setItem('access_token', res.data.access_token)
          window.sessionStorage.setItem('token_type', res.data.token_type)
          this.$emit('setToken')
          this.closeLoginWindow()
        })
        .catch((err) => {
          this.accErrorMsg = ''
          this.pwdErrorMsg = ''
          const { message } = err.response.data
          if (message.account) {
            this.accErrorMsg = message.account[0]
          }
          if (message.password) {
            this.pwdErrorMsg = message.password[0]
          }
        })
    },
  },
}
</script>




