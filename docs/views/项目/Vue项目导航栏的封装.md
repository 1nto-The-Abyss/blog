---
title: Vue项目导航栏的封装
date: 2022-08-11
sidebar: auto
tags:
 - 项目 
 - Vue
categories:
 - 问题
---

#### 1.Tabbar
```
<template>
  <div id="tabbar">
    <tabbar-item v-for="(item,index) in tabbarItems" :key="index" :selected="selected" :page="item.page" @pageChange="getVal">
      <img :src="item.img" slot="img">
      <img :src="item.img_active" slot="img_active">
      <div slot="text">{{item.text}}</div>
    </tabbar-item>
  </div>
</template>
<script>
import TabbarItem from './TabbarItem'
export default {
  name: "Tabbar",
  components: {
    TabbarItem
  },
  data () {
   return {
    selected:'home',
    tabbarItems:[
      {
        text: '发现',
        img: require('../../assets/home.png'),
        img_active: require('../../assets/home_active.png'),
        page: 'home'
      },
      {
        text: '我的',
        img: require('../../assets/mine.png'),
        img_active: require('../../assets/mine_active.png'),
        page: 'mine'
      },
      {
        text: '关注',
        img: require('../../assets/follow.png'),
        img_active: require('../../assets/follow_active.png'),
        page: 'follow'
      }
    ]
   }
  },
   methods:{
     getVal(res) {
       this.selected = res
     }
   }
}
</script>
  <style lang="less" scoped>
  #tabbar {
    height: 49px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    position: fixed;
    left: 0;
    bottom: 0;
  }
</style>
```

#### 2.TabbarItem

```
<template>
  <div class="tabbar-item" @click="itemClick">
    <div v-show="isActive">
      <slot name="img_active"></slot> 
    </div>
    <div v-show="!isActive">
      <slot name="img"></slot> 
    </div>
    <div :class="[isActive?'text_active':' ']" >
      <slot name="text"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "TabbarItem",
  data () {
   return {
   }
  },
  props:["page","selected"],
   computed: {
    isActive() {
      if(this.selected == this.page) {
        return true
    }
    return false
   }
  },
  methods: {
    itemClick() {
      this.$emit("pageChange",this.page)
      this.$router.push('/'+this.page)
    }
  }
}
</script>
  <style lang="less" scoped>
  .tabbar-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 10px;
    .text_active {
      color: #EB4D44;
    }
  }
</style>
```

#### 3.App
```
<template>
  <div id="app">
    <router-view></router-view>
    <music-player></music-player>
    <tabbar></tabbar>
  </div>
</template>

<script>
import  MusicPlayer from "./components/musicplayer/MusicPlayer";
import Tabbar from './components/tabbar/Tabbar'

export default {
  name: 'App',
  components: {
    Tabbar,
    MusicPlayer
  },
  created() {
    this.$router.push('/')
  }
}
</script>

<style lang="less">
</style>
```

#### 4.router
```
import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import("@/views/home/home")
const Mine = () => import("@/views/mine/mine")
const Follow = () => import("@/views/follow/follow")

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path:'/home',
    component: Home
  },
  {
    path:'/mine',
    component:Mine
  },
  {
    path:'/follow',
    component:Follow
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router
```

