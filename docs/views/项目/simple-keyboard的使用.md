---
title: simple-keyboard的使用
date: 2023-03-20
sidebar: auto
tags:
 - 项目 
 - Vue
categories:
 - 开发
---


> 参考文章：https://www.cnblogs.com/linjiangxian/p/16223681.html#_label1_1
### 安装
安装simpleKeyboard的依赖
> npm install simple-keyboard --save

安装simpleKeyboard输入法依赖
> npm install simple-keyboard-layouts --save
### 键盘组件SimpleKeyboard
```
<template>
  <div :class="keyboardClass" id="keyboard"></div>
</template>

<script>
import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";
import layout from 'simple-keyboard-layouts/build/layouts/chinese'; // 中文输入法

export default {
  name: "SimpleKeyboard",
  props: {
    keyboardClass: {
      default: "simple-keyboard",
      type: String
    },
    input: {
      type: String
    }
  },
  data: () => ({
    keyboard: null,
    displayDefault: {
      '{bksp}': 'backspace',
      '{lock}': 'caps',
      '{enter}': 'enter',
      '{tab}': 'tab',
      '{shift}': 'shift',
      '{change}': '英文',
      '{space}': ' ',
      '{clear}': '清空',
      '{close}': '关闭',
    },
  }),
  mounted() {
    // 不同地方调用组件时传入不同的keyboardClass
    this.keyboard = new Keyboard(this.keyboardClass, {
      onChange: this.onChange,
      onKeyPress: this.onKeyPress,
      layoutCandidates: layout.layoutCandidates,
      layout: {
        // 默认布局
        default: [
          '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
          '{tab} q w e r t y u i o p [ ] \\',
          "{lock} a s d f g h j k l ; ' {enter}",
          '{shift} z x c v b n m , . / {clear}',
          '{change} {space} {close}',
        ],
        // shift布局
        shift: [
          '~ ! @ # $ % ^ & * ( ) _ + {bksp}',
          '{tab} Q W E R T Y U I O P { } |',
          '{lock} A S D F G H J K L : " {enter}',
          '{shift} Z X C V B N M &lt; &gt; ? {clear}',
          '{change} {space} {close}',
        ],
      },
      // 按钮展示文字
      display: this.displayDefault,
    });
  },
  methods: {
    onChange(input) {
      this.$emit("onChange", input);
    },
    onKeyPress(button,$event) {
      // 点击关闭
      if (button === '{close}') {
        this.$emit("switchKeyboard",false)
        return false;
      } else if (button === '{change}') {
        // 切换中英文输入法
        if (this.keyboard.options.layoutCandidates !== null) {
          this.$set(this.displayDefault, '{change}', '中文');
          // 切换至英文
          this.keyboard.setOptions({
            layoutCandidates: null,
            display: this.displayDefault,
          });
        } else {
          // 切换至中文
          this.$set(this.displayDefault, '{change}', '英文');
          this.keyboard.setOptions({
            layoutCandidates: layout.layoutCandidates,
            display: this.displayDefault,
          });
        }
      } else if (button === '{clear}') {
        this.keyboard.clearInput();
      } else {
        this.$emit('onKeyPress', button);
      }
      if (button === "{shift}" || button === "{lock}") this.handleShift();
    },
    handleShift() {
      let currentLayout = this.keyboard.options.layoutName;
      let shiftToggle = currentLayout === "default" ? "shift" : "default";

      this.keyboard.setOptions({
        layoutName: shiftToggle
      });
    }
  },
  watch: {
    input(input) {
      this.keyboard.setInput(input);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  // 一定要定位，不然页面上看不到
#keyboard {
  position: fixed;
  bottom: 0;
  width: 95%;
  z-index: 9999;
  font-size: 16px;
    // 中文文字选择框
  ::v-deep .hg-candidate-box {
    position: static;
    transform: translateY(0);
    max-width: 100%;
    .hg-candidate-box-list-item {
      width: 50px;
      height: 50px;
    }
  }
  ::v-deep .hg-button {
    height: 45px;
  }
}
</style>
```

### 使用组件的页面
```
<el-form :model="queryParams">
  <el-form-item label="姓名/手机号">
    <el-input 
      v-model="queryParams.nickName" 
      placeholder="请输入姓名/手机号" 
      clearable>
        <template slot="append">
          <svg aria-hidden="true" @click="useMemberKeyboard=true">
            <use xlink:href="#icon-jianpan">
            </use>
          </svg>
        </template>
    </el-input>
  </el-form-item>
</el-form>

<div v-if="useMemberKeyboard">
  <SimpleKeyboard
    @onChange="onChange"
    @onKeyPress="onKeyPress(queryParams.nickName)"
    @switchKeyboard="switchKeyboard"
    :input="queryParams.nickName"
    keyboardClass="memberKeyboard"
  />
</div>


// 软键盘
onChange(input) {
  this.queryParams.nickName = input;
},
onKeyPress(button) {
  // console.log("button", button);
},
// 开关软键盘
switchKeyboard(value) {
  this.useMemberKeyboard = value
}
```

### 使用时的问题
> 有个界面两个输入框都要调用软键盘,我用了两次组件，方法也写了两份，通过不同的输入框焦点来调用不同的键盘（应该不是这样解决，但是这样写有用）
切换键盘时一定要用v-show,v-if在第二次切换键盘时，键盘的样式会错乱
```
  <el-form :model="loginForm">
    <el-form-item prop="username">
      <el-input 
        v-model="loginForm.username" 
        type="text"
        placeholder="账号" 
        @focus="usernameFocus" 
        ref="username">
        <template slot="append">
          <svg aria-hidden="true" @click="clickKeyboard()">
            <use xlink:href="#icon-jianpan">
            </use>
          </svg>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input 
        v-model="loginForm.password" 
        type="password" 
        placeholder="密码"
        @focus="passwordFocus">
      </el-input>
    </el-form-item>
  </el-form>



<!-- 用户名键盘 -->
<div v-show="usernameKeyboard" class="keyboard">
  <SimpleKeyboard
    @onChange="onChangeUsername"
    @onKeyPress="onUsernameKeyPress(loginForm.username)"
    @switchKeyboard="switchUsernameKeyboard"
    :input="loginForm.username"
    keyboardClass="username"
  />
</div>
<!-- 密码键盘 -->
<div v-show="passwordKeyboard" class="keyboard">
  <SimpleKeyboard
    @onChange="onChangePassword"
    @onKeyPress="onPasswordKeyPress(loginForm.password)"
    @switchKeyboard="switchPasswordKeyboard"
    :input="loginForm.password"
    keyboardClass="password"
  />
</div>



// 用户名软键盘
onChangeUsername(input) {
  this.loginForm.username = input;
},
onUsernameKeyPress(button) {
  // console.log("button", button);
},
// 密码软键盘
onChangePassword(input) {
  this.loginForm.password = input;
},
onPasswordKeyPress(button) {
  // console.log("button", button);
},
// 开关软键盘
switchUsernameKeyboard(value) {
  this.usernameKeyboard = value
},
switchPasswordKeyboard(value) {
  this.passwordKeyboard = value
},
// 点击使用软键盘
clickKeyboard() {
  this.useKeyboard = true
  this.$refs.username.focus()
},
// 焦点时切换键盘
usernameFocus() {
  if(this.useKeyboard) {
    this.usernameKeyboard = true
    this.passwordKeyboard = false
  }
},
// 焦点时切换键盘
passwordFocus() {
  if(this.useKeyboard) {
    this.usernameKeyboard = false
    this.passwordKeyboard = true
  }
}
```