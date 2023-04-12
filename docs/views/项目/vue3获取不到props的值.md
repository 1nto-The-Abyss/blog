---
title: vue3获取不到props的值
date: 2022-04-11
sidebar: auto
tags:
 - 项目 
 - Vue
categories:
 - 问题
---
#### 原因
子组件渲染得比父组件快，在onMounted中获取不到值
#### 解决方法
-  1.子组件标签上加上v-if，传值过来后再渲染子组件
-  2.watch监听props