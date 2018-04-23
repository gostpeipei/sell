<template>
  <div id="app">
    <v-header :seller="seller" />
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from 'components/header/header.vue';
import axios from 'axios';
export default {
  data() {
    return {
      seller: {}
    }
  },
  created() {
    axios({
      method: 'get',
      url: 'http://localhost:3030/api/seller'
    }).then( success => {
      this.seller = success.data.data
    }, error => {
      console.log(error)
    })
  },
  components: {
    "v-header": Header
  }
}
</script>

<style lang="scss">
@import './common/scss/mixin.scss';
@media (-webkit-min-device-pixel-ratio: 1.5),(min-device-pixel-ratio: 1.5) {
  .border-1px{
    &::after{
      -webkit-transform: scaleY(0.7);
      transform: scaleY(0.7);
    }
  }
}
@media (-webkit-min-device-pixel-ratio: 2),(min-device-pixel-ratio: 2) {
  .border-1px{
    &::after{
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }
  }
}
.tab{
  display:flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  @include border-1px(rgba(7, 17, 27, 0.1));
  .tab-item{
    flex: 1;
    text-align: center;
    & > a {
      display: block;
      font-size: 14px;
      color: rgb(77, 85, 93);
      &.active{
        color: rgb(240, 20, 20)
      }
    }
  }
}
</style>

