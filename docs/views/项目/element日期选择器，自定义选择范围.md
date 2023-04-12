---
title: element日期选择器，自定义选择范围
date: 2022-09-20
sidebar: auto
tags:
 - 项目 
 - Vue
categories:
 - 开发
---
#### 代码
```
<el-date-picker
  v-model="date"
  type="daterange"
  range-separator="至"
  start-placeholder="开始日期"
  end-placeholder="结束日期"
  @change="changeDate()"
  :picker-options="pickerOptions">
</el-date-picker>



data() {
  return {
    date: '', // 选择器选中时间
    pickDate: '', // 当前选中时间
    pickerOptions: { // 对时间选择器进行限制
      onPick: obj => {
        this.pickDate = new Date(obj.minDate).getTime()
      },
      disabledDate: date => { // disabledDate要返回一个boolean值
        if(this.pickDate) {
          const range = 30 * 24 * 3600 * 1000 // 一个月的时间选择范围
          let maxDate = this.pickDate + range > Date.now() ? Date.now() : this.pickDate //最大选择时间为今天
          let minDate = this.pickDate - range
          return date.getTime() > maxDate || date.getTime() < minDate
        } else {
          return date.getTime() > Date.now() // 最大选择时间为今天
        }
      }
    }
  }
}
```

#### 效果图
![img](https://cdn.nlark.com/yuque/0/2023/png/29284566/1680772430284-a204bffb-638f-40c3-bf45-51717e4b7b35.png)