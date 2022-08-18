---
title: vue项目px转rem
date: 2022-08-11
sidebar: auto
tags:
 - 项目 
 - Vue
categories:
 - 问题
---
#### 1. 安装postcss-plugin-px2rem
   
 > npm i postcss-plugin-px2rem --save-dev

    postcss-pliugin-px2rem插件配置选项上有exclude属性，可以配置是否对某个文件夹下所有css文件不进行px到rem的转换

#### 2.vue.config.js配置

```
module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-plugin-px2rem')({
          // rootValue: 100, //换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
          // unitPrecision: 5, //允许REM单位增长到的十进制数字。
          // propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
          // propBlackList: [], //黑名单
          exclude: /(node_module)/,  //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)/ 。如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
          // selectorBlackList: [], //要忽略并保留为px的选择器
          // ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
          // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
          mediaQuery: false,  //（布尔值）允许在媒体查询中转换px。
          minPixelValue: 3 //设置要替换的最小像素值(3px会被转rem)。 默认 0
          })
        ]
      }
    }
  }
}
```
