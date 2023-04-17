---
title: 一次很麻瓜的问题解决，el-col相关
date: 2023-04-10
sidebar: auto
tags:
 - 项目 
 - Vue
categories:
 - 开发
---

> 出现的问题，el-radio控制页面切换时，切换完无法再次点击按钮

- 问题截图

![image.png](https://cdn.nlark.com/yuque/0/2023/png/29284566/1681712111986-6aee8094-3d5a-4912-9031-d2b176f8c885.png#averageHue=%23fefefe&clientId=uaba0e8fd-591b-4&from=paste&height=204&id=ud0cb80a4&name=image.png&originHeight=204&originWidth=716&originalType=binary&ratio=1&rotation=0&showTitle=false&size=5867&status=done&style=none&taskId=ue34880cf-3292-4187-9e55-bce2e5b9233&title=&width=716)

- 问题代码
```javascript
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
<script src="//unpkg.com/vue@2/dist/vue.js"></script>
<script src="//unpkg.com/element-ui@2.15.13/lib/index.js"></script>
<div id="app">
<template>
  <div>
  <el-form>
    <el-col :span="24">
      <el-form-item>
        <el-radio-group v-model="form.radio">
          <el-radio-button label="上海"></el-radio-button>
          <el-radio-button label="北京"></el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-col>
    <div v-if="form.radio == '上海'">
      <el-form-item label="输入框1">
        <el-input v-model="form.value1"></el-input>
      </el-form-item>
    </div>
    <div v-else>
      <el-form-item label="输入框2">
        <el-input v-model="form.value2"></el-input>
      </el-form-item>
    </div>
   </el-form>
 </div>
</template>
</div>
<script>
var Main = {
    data () {
      return {
        form: {
          radio: '上海',
          value1: '',
          value2: ''
        }
      };
    }
  }
var Ctor = Vue.extend(Main)
new Ctor().$mount('#app')
</script>
<style>
  @import url("//unpkg.com/element-ui@2.15.13/lib/theme-chalk/index.css");
</style>
</body>
</html>
```
#### 错误尝试过程

- 切换的内容为空或者在要切换的内容里加了段内容，发现可以切换，但是我把这个div设置成透明（opacity:0）,又切换不了，我开始思考是不是el-form-item不能这样被el-radio控制切换![image.png](https://cdn.nlark.com/yuque/0/2023/png/29284566/1681712370563-48c2a82f-164b-427e-9068-2f693baffd5f.png#averageHue=%23fefefe&clientId=uaba0e8fd-591b-4&from=paste&height=228&id=u6987719f&name=image.png&originHeight=228&originWidth=920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=4551&status=done&style=none&taskId=ud924f436-0e87-47b9-8c96-4ff58e32d99&title=&width=920)
```javascript
    <div v-if="form.radio == '上海'">
      <div>111</div>
      <el-form-item label="输入框1">
        <el-input v-model="form.value1"></el-input>
      </el-form-item>
    </div>
    <div v-else>
    </div>
   </el-form>
```

- 接下来我发现去掉el-col或者el-col的float属性去掉时，可以切换

![image.png](https://cdn.nlark.com/yuque/0/2023/png/29284566/1681712556593-0caa9ad6-c13e-4048-a3b3-11add600170f.png#averageHue=%23fefefe&clientId=uaba0e8fd-591b-4&from=paste&height=212&id=u11cd28e9&name=image.png&originHeight=212&originWidth=693&originalType=binary&ratio=1&rotation=0&showTitle=false&size=3982&status=done&style=none&taskId=u96be0aa0-965b-4f76-814f-001438548c7&title=&width=693)
![image.png](https://cdn.nlark.com/yuque/0/2023/png/29284566/1681712752571-85607fa8-e700-405a-a37e-711d94673773.png#averageHue=%23f8f8f7&clientId=uaba0e8fd-591b-4&from=paste&height=270&id=u7a2fc6d7&name=image.png&originHeight=270&originWidth=466&originalType=binary&ratio=1&rotation=0&showTitle=false&size=15923&status=done&style=none&taskId=u254c0d53-7b2f-4abc-b479-750c0f122f1&title=&width=466)
#### bug的原因
el-col外面没有el-row!!!!!
没错，就是这么麻瓜的原因
![`EFV2C8`I_OT~}WHB1PVQ20.jpg](https://cdn.nlark.com/yuque/0/2023/jpeg/29284566/1681712995694-e8d057c4-1b39-4503-b498-ea40590e82b6.jpeg#averageHue=%2321261b&clientId=uaba0e8fd-591b-4&from=drop&id=u0fc6172c&name=%60EFV2C8%60I_OT~%7DWHB1PVQ20.jpg&originHeight=240&originWidth=240&originalType=binary&ratio=1&rotation=0&showTitle=false&size=6643&status=done&style=none&taskId=u471fc79c-a364-417c-be0c-b7c7d48759b&title=)
