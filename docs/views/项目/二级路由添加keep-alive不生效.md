---
title: 二级路由添加keep-alive不生效
date: 2022-08-11
sidebar: auto
tags:
 - 项目 
 - Vue
categories:
 - 问题
---
> 问题描述：在layout.vue添加keep-alive,没有触发
在app.vue添加keep-alive生效了但不是想要的效果（切换到别的模块的界面后仍然有缓存）

app.vue
```
<template>
  <div id="app">
    <router-view :key="$route.path"/>
  </div>
</template>
```

layout.vue
```
<template>
  <div>
    <keep-alive >
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
```
路由配置index.js
```
const routes = [
    {
    path: '/home',
    component: home,
    children: [
      {
        path: '/',
        redirect: 'menu1'
      },
      {
        path: 'menu1',
        name: 'menu1',
        component: () => import('@/views/Start/home/menu1'),
        meta: { keepAlive: true } 
      },
      {
        path: 'menu2',
        name: "menu2",
        component: () => import('@/views/Start/home/menu2'),
        meta: { keepAlive: true }
      }
    ]
  }
]
```


> 解决方法：去掉app.vue里router-view标签上的key后解决了问题

> 原因猜测：key绑定了动态数值，每次解析时都会以为进入了一个新页面，引起页面刷新和数据重载

