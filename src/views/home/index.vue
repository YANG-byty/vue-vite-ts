<template>
  <Header menu="/" />
  <div class="home">
    <div class="banner">
      <Carousel
        v-model="carouselIndex"
        :autoplay="setting.autoplay"
        :autoplay-speed="setting.autoplaySpeed"
        :radius-dot="setting.radiusDot"
        :trigger="setting.trigger"
        :arrow="setting.arrow"
        @mouseover="setting.autoplay = false"
        @mouseleave="setting.autoplay = true"
      >
        <CarouselItem v-for="(item, index) in carouselItemList" :key="index">
          <div class="option-carousel">
            <img :src="getImageUrl(item.url)" alt="" />
            <div class="option-right">
              <div class="title">
                <span class="text">{{ item.title }}</span>
                <span class="num" v-if="index == 1 || index == 2">3</span>
              </div>
              <div class="gotoBtn" @click="router.push(item.path)">
                立即前往
              </div>
            </div>
          </div>
        </CarouselItem>
      </Carousel>
      <img
        class="left-btn"
        src="@/assets/images/right.png"
        alt=""
        @click="dotsLeft"
      />
      <img
        class="right-btn"
        src="@/assets/images/right.png"
        alt=""
        @click="dotsRight"
      />
    </div>
    <div class="footer">
      <div v-for="(item, index) in flowChartList" :key="index">
        <span>{{ item }}</span>
        <img
          v-if="index < flowChartList.length - 1"
          src="@/assets/images/Vector1.png"
          alt=""
        />
      </div>
      <img src="@/assets/images/Vector2.png" alt="" />
      <div>
        <div>审核不通过，退回重新编辑，报送</div>
        <div style="margin-top: 16px">审核通过，报送任务结束</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import * as commonRefers from '@/api/home'
import { reactive, toRefs, onMounted } from 'vue'
import Header from '@/components/Header.vue'
import router from '@/router'
import { useStore } from 'vuex'
export default {
  components: {
    Header,
  },
  setup() {
    const store = useStore()
    const state = reactive({
      carouselIndex: 0,
      setting: {
        autoplay: true,
        autoplaySpeed: 2500,
        dots: 'inside',
        radiusDot: true,
        trigger: 'click',
        arrow: 'never',
      },
      carouselItemList: [
        {
          path: '/taskManagement/submissionTask',
          url: 'item1.png',
          title: '发布任务',
        },
        {
          path: '/submissionManagement/stayFill',
          url: 'item2.png',
          title: '待我报送',
        },
        {
          path: '/submissionAudit/stayAudit',
          url: 'item3.png',
          title: '待我审核',
        },
        {
          path: '/dataStatistics/accomplishStatistics',
          url: 'item4.png',
          title: '数据统计',
        },
        {
          path: '/systemSettings/unitGroup',
          url: 'item5.png',
          title: '系统设置',
        },
      ],
      flowChartList: [
        '责任单位创建 “报送计划”',
        '系统生成 “报送任务”',
        '发送给 “报送单位”',
        '报送单位填写“报送内容”',
        '责任单位审核',
      ],
    })
    const getHomeMenu = () => {
      commonRefers.getAllMenuList().then((res: any) => {
        console.log(res)
      })
    }
    const methods = {
      // 获取本地图片地址
      getImageUrl: (name: string) => {
        return new URL(`../../assets/images/${name}`, import.meta.url).href
      },
      dotsLeft: () => {
        if (state.carouselIndex == 0) {
          state.carouselIndex = state.carouselItemList.length - 1
        } else {
          state.carouselIndex -= 1
        }
      },
      dotsRight: () => {
        if (state.carouselIndex == state.carouselItemList.length - 1) {
          state.carouselIndex = 0
        } else {
          state.carouselIndex += 1
        }
      },
    }
    onMounted(() => {
      // getHomeMenu()
      console.log(import.meta.env)
    })
    return {
      ...toRefs(state),
      ...methods,
      router,
    }
  },
}
</script>

<style lang="less" scoped></style>
