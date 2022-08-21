<template>
  <div class="flex flex-col bg-white w-full items-center h-auto">
    <!-- header -->
    <Header
      @menuOpenF="menuOpenF"
      @openLoginWindow="openLoginWindow"
      :userToken="userToken"
    />
    <!-- 中間主要購物車part -->
    <div class="lg:bg-[#FAFAFA] w-full flex justify-center">
      <div
        class="
          flex
          lg:px-[15px] lg:pt-[130px]
          md:flex-col md:pl-[14px] md:pr-[16px]
          sm:flex-col sm:pl-[14px] sm:pr-[16px]
          w-full
          max-w-[1202px]
          lg:h-[684px]
          sm:h-auto
          md:h-auto
          sm:bg-[#F9F9F9]
          md:bg-[#F9F9F9]
        "
      >
        <!-- 手機購物車內容 -->
        <div class="lg:hidden mt-[70px] mb-[50px]">
          <h1 class="text-[20px] mb-[19px]">購物車</h1>
          <MobCartVue :cartArray="cartArray" @trashItem="trashItem" />
        </div>
        <!-- 桌機購物車內容 -->
        <div class="mr-[16px] sm:hidden md:hidden w-full max-w-[776px]">
          <h1
            class="
              text-[24px]
              w-[83px]
              h-[24px]
              text-[#434343]
              mb-[20px]
              leading-[24px]
            "
          >
            購物車
          </h1>
          <DeskCart :cartArray="cartArray" @trashItem="trashItem" />
        </div>
        <!-- 小計內容 -->
        <div>
          <h1
            class="
              lg:text-[24px]
              md:text-[20px]
              sm:text-[20px]
              w-[83px]
              h-[24px]
              text-[#434343]
              leading-[24px]
              lg:mb-[20px]
              sm:mb-[25px]
              md:mb-[25px]
            "
          >
            小計
          </h1>
          <SumVue :cartArray="cartArray" />
        </div>
      </div>
    </div>
    <!-- 手機募資內容 -->
    <div class="bg-[#F5F5F5] w-full lg:hidden mt-[25px] px-[15px]">
      <div
        class="
          flex flex-col
          bg-[#F5F5F5]
          lg:hidden
          pt-[20px]
          overflow-auto
          h-auto
        "
      >
        <h1 class="text-[22px] text-[#434343] mb-[18px]">募資課程</h1>
        <div v-for="eachFound in foundData" :key="eachFound.id">
          <MobFundraisingVue
            class="mb-[12px]"
            :foundDetail="eachFound"
            @addCart="addCart"
          />
        </div>
      </div>
    </div>
    <!-- 桌機版募資課程 -->
    <div class="bg-[#F5F5F5] w-full sm:hidden md:hidden pt-[40px] h-[504px]">
      <div class="flex-col max-w-[1201px] mx-auto px-[15px]">
        <h1 class="text-[22px] text-[#434343] mb-[22px]">募資課程</h1>
        <div class="flex overflow-auto">
          <div v-for="eachFound in foundData" :key="eachFound.id">
            <DeskFundraisingVue
              class="mr-[17px]"
              :foundDetail="eachFound"
              @addCart="addCart"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- Desk login Page -->
    <LoginVue
      v-if="loginOpen"
      @closeLoginWindow="closeLoginWindow"
      @setToken="setToken"
    />
    <!-- Mobile Login Page -->
    <MobLoginVue
      class="fixed top-[50px] transition-transform duration-300"
      :class="translateRwd"
      @openLoginWindow="openLoginWindow"
    />
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import LoginVue from '~/components/Login.vue'
import DeskCart from '~/components/DeskCart.vue'
import SumVue from '~/components/Sum.vue'
import DeskFundraisingVue from '~/components/DeskFundraising.vue'
import MobCartVue from '~/components/MobCart.vue'
import MobFundraisingVue from '~/components/MobFundraising.vue'
import MobLoginVue from '~/components/MobLogin.vue'
import getFundData from '~/mixin/getFundData' // 取得募資課程的公用程式
export default {
  name: 'IndexPage',
  components: {
    Header,
    LoginVue,
    SumVue,
    DeskCart,
    DeskFundraisingVue,
    MobCartVue,
    MobFundraisingVue,
    MobLoginVue,
  },
  mixins: {
    getFundData,
  },
  data() {
    return {
      rwdMenuOpen: false, // 是否讓menu開啟（rwd模式
      loginOpen: false, // 是否開啟login視窗
      userToken: '', // 使用者token
      foundData: [], // 募資課程list
      baseUrl: '', // 基礎url
      cartArray: [], // 購物車內的陣列
    }
  },
  computed: {
    /**
     * @description 讓rwd滑進來
     */
    translateRwd() {
      return this.rwdMenuOpen ? 'translate-y-0' : '-translate-y-full'
    },
    loginStatus() {
      return this.userToken && this.userToken.length > 0
    },
  },
  async mounted() {
    this.baseUrl = this.$store.state.globalPar.baseUrl
    this.setToken()
    await this.initFundData()
  },
  methods: {
    /**
     * @description rwd -> 開啟or關閉 Menu窗 -> true 代表滑進 / false 代表滑出
     * @param {*} e
     */
    menuOpenF(e) {
      this.rwdMenuOpen = e
    },
    /**
     * @description 開啟登入視窗
     */
    openLoginWindow() {
      this.loginOpen = true
    },
    /**
     * @description 關閉登入視窗
     */
    closeLoginWindow() {
      this.loginOpen = false
    },
    /**
     * @description 設定token
     */
    async setToken() {
      this.userToken = window.sessionStorage.getItem('access_token')
      if (this.loginStatus) {
        this.$store.dispatch('globalPar/setToken', this.userToken)
        this.getInfo()
        await this.updateNotLoginCart()
        await this.addCart({})
      } else {
        this.renewNotLoginCart()
      }
    },
    /**
     * @description 為登入的購物車重整保存
     */
    renewNotLoginCart() {
      let notLoginCartValue = JSON.parse(
        window.sessionStorage.getItem('notLoginCartValue')
      )
      if (notLoginCartValue) {
        for (let i = 0, len = notLoginCartValue.length; i < len; i++) {
          this.cartArray.push(notLoginCartValue[i])
        }
      }
    },
    /**
     * @description 取得使用者資訊
     */
    getInfo() {
      const url = `${this.baseUrl}/me`
      this.$axios({
        method: 'get',
        url,
        headers: {
          authorization: `Bearer ${this.userToken}`,
          'Content-Type': 'application/json',
        },
      })
        .then((res) => {
          const { avatar, account } = res.data
          window.sessionStorage.setItem('imgSrc', avatar)
          window.sessionStorage.setItem('account', account)
          this.$store.dispatch('globalPar/setUser', res.data)
        })
        .catch((err) => alert(err))
    },
    /**
     * @description 初始化募資資料
     */
    async initFundData() {
      const { baseUrl } = this.$store.state.globalPar
      const url = `${baseUrl}/courses/fundraising`
      const { data: apiResult } = await getFundData.methods.getInitFundData(url)
      for (let i = 0, len = apiResult.length; i < len; i++) {
        this.foundData.push(apiResult[i])
      }
    },
    /**
     * @description post購物車資料主流程
     * @param {Object} fundDetail
     */
    async addCart(fundDetail) {
      // 如果有的話就刪除
      if (this.validateExtendOrNot(fundDetail) > -1) {
        this.trashItem(fundDetail)
        return
      }
      // 如果沒有的話正常新增
      const result = this.composeCartData([fundDetail])
      await this.crudCartData({ method: 'post', data: result })
    },
    /**
     * @description 將還沒登入時加進購物車的資料post出去
     */
    async updateNotLoginCart() {
      let notLoginCartValue = JSON.parse(
        window.sessionStorage.getItem('notLoginCartValue')
      )
      if (!notLoginCartValue) return
      if (notLoginCartValue.length > 0) {
        const composeResult = this.composeCartData(notLoginCartValue)
        const postResult = await this.crudCartData({
          method: 'post',
          data: composeResult,
        })
        this.deleteNotLoginSession(postResult)
      }
    },
    /**
     * @description 刪除掉為登入的session
     */
    deleteNotLoginSession(postResult) {
      if (postResult.status === 200) {
        window.sessionStorage.removeItem('notLoginCartValue')
      }
    },
    /**
     * @description 驗證購物車是否已有該項目
     * @param {*} fundDetail
     */
    validateExtendOrNot(fundDetail) {
      if (Object.keys(fundDetail).length === 0) return -1
      let hasStatus = -1
      hasStatus = this.cartArray.findIndex(
        (data) => data.id === fundDetail.id.toString()
      )
      return hasStatus
    },
    /**
     * @description 組成要post購物車的資料
     * @param {*Array} fundDetailArr
     */
    composeCartData(fundDetailArr) {
      let sendData = []
      if (
        fundDetailArr.length > 0 &&
        Object.keys(fundDetailArr[0]).length > 0
      ) {
        for (let i = 0, len = fundDetailArr.length; i < len; i++) {
          sendData.push({
            id: fundDetailArr[i].id,
            coupon: '',
          })
        }
      }
      return {
        items: sendData,
        coupons: [],
      }
    },
    /**
     * @description 打api傳資料
     */
    async crudCartData({ method, data }) {
      const result = await this.$axios({
        method,
        url: `${this.baseUrl}/carts`,
        headers: {
          authorization: this.userToken ? `Bearer ${this.userToken}` : '',
          'Content-Type': 'application/json',
        },
        data,
      })
        .then((res) => {
          let resDeal = {
            delete: this.deleteOk,
            post: this.renewCartArray,
          }
          resDeal[`${method}`]({ res, data })
          return res
        })
        .catch((err) => {
          alert(err)
        })
      return result
    },
    /**
     * @description 刪掉購物車內的東西
     * {*Object} item
     */
    async trashItem(item) {
      if (this.loginStatus) {
        const composeResult = this.composeCartData([item])
        await this.crudCartData({ method: 'delete', data: composeResult })
      } else {
        this.deleteOk({ data: item })
      }
    },
    /**
     * @description 購物車新增之後的結果更新
     */
    renewCartArray({ res }) {
      this.cartArray = []
      const { data: apiResult } = res.data
      for (let i = 0, len = apiResult.length; i < len; i++) {
        this.cartArray.push(apiResult[i])
      }
      this.setSessionCart()
    },
    /**
     * @description 刪除成功後的處理
     * @param {*} data
     */
    deleteOk({ data: deleteData }) {
      let deleteIndex = -1
      if (this.loginStatus) {
        deleteIndex = this.cartArray.findIndex(
          (data) => data.id === deleteData.items[0].id.toString()
        )
      } else {
        deleteIndex = this.cartArray.findIndex(
          (data) => data.id === deleteData.id.toString()
        )
      }
      this.cartArray.splice(deleteIndex, 1)
      this.setSessionCart()
    },
    /**
     * @description 設定session中的購物車列表
     */
    setSessionCart() {
      let loginSessionName = this.loginStatus
        ? 'cartValue'
        : 'notLoginCartValue'
      window.sessionStorage.setItem(
        loginSessionName,
        JSON.stringify(this.cartArray)
      )
    },
  },
}
</script>
