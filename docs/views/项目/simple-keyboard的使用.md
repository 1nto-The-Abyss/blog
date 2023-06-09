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

参考文章[https://www.cnblogs.com/linjiangxian/p/16223681.html#_label1_1](https://www.cnblogs.com/linjiangxian/p/16223681.html#_label1_1)
### 使用效果
![img](https://cdn.nlark.com/yuque/0/2023/png/29284566/1681695976823-8a7ca927-3efb-4b7e-9431-6671bfca51d1.png)
![img](https://cdn.nlark.com/yuque/0/2023/png/29284566/1681695997421-9e7eac47-4381-46ec-b164-9de4f41f1691.png)

### 键盘组件SimpleKeyboard/index
```javascript
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
      '{numbers}': '123',
      '{abc}': 'abc',
      "{backspace}": "⌫",
    },
  }),
  mounted() {
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
          '{shift} {numbers} z x c v b n m , . / {clear}',
          '{change} {space} {close}',
        ],
        // shift布局
        shift: [
          '~ ! @ # $ % ^ & * ( ) _ + {bksp}',
          '{tab} Q W E R T Y U I O P { } |',
          '{lock} A S D F G H J K L : " {enter}',
          '{shift} {numbers} Z X C V B N M &lt; &gt; ? {clear}',
          '{change} {space} {close}',
        ],
        // 数字键盘布局
        numbers: [
          "1 2 3", 
          "4 5 6", 
          "7 8 9",
          "{abc} 0 {backspace}"]
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
        // let keyboard = $event.path[3];
        // keyboard.style.visibility = 'hidden';
        this.$emit("")
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
      if (button === "{numbers}" || button === "{abc}") this.handleNumbers();
    },
    handleShift() {
      let currentLayout = this.keyboard.options.layoutName;
      let shiftToggle = currentLayout === "default" ? "shift" : "default";

      this.keyboard.setOptions({
        layoutName: shiftToggle
      });
    },
    // 切换数字键盘
    handleNumbers() {
      let currentLayout = this.keyboard.options.layoutName;
      let numbersToggle = currentLayout !== "numbers" ? "numbers" : "default";

      this.keyboard.setOptions({
        layoutName: numbersToggle
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
#keyboard {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 9999;
  font-size: 24px;
  font-weight: 600;
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
  ::v-deep .hg-button[data-skbtnuid^="numbers-"] {
    height: 68px;
    width: 33%;
  }
  ::v-deep .hg-button {
    height: 45px;
  }
}
</style>


```

### 使用组件的页面
```javascript
<el-form :model="loginForm">
  <el-form-item prop="username">
    <el-input v-model="loginForm.username" type="text" placeholder="账号">
      <template slot="append">
        <svg aria-hidden="true" @click="clickKeyboard('loginForm.username',loginForm.username)">
          <use xlink:href="#icon-jianpan">
          </use>
        </svg>
      </template>
    </el-input>
  </el-form-item>
  <el-form-item prop="password">
    <el-input v-model="loginForm.password" type="password" placeholder="密码">
      <template slot="append">
        <svg aria-hidden="true" @click="clickKeyboard('loginForm.password',loginForm.password)">
          <use xlink:href="#icon-jianpan">
          </use>
        </svg>
      </template>
    </el-input>
  </el-form-item>
</el-form>

<el-drawer 
  :visible.sync="useKeyboard" 
  direction="btt"
  :show-close="false"
  :modal="false">
  <SimpleKeyboard
    @onChange="onChange"
    @onKeyPress="onKeyPress(inputValue)"
    @switchKeyboard="switchKeyboard"
    :input="inputValue"
    keyboardClass="loginForm"
  />
</el-drawer>

data() {
	return {
    // 软键盘开关
    useKeyboard: false,
    inputValue: '',
    inputType: ''
  }
}

methods: {
  // 用户名软键盘
  onChange(input) {
    this.inputValue = input;
    if(this.inputType == "loginForm.username") {
      this.loginForm.username = this.inputValue;
    } else if (this.inputType == "loginForm.password") {
      this.loginForm.password = this.inputValue
    }
  },
  onKeyPress(button) {
    // console.log("button", button);
  },
  // 开关软键盘
  switchKeyboard(value) {
    this.useKeyboard = value
  },
  clickKeyboard(type,value) {
    this.useKeyboard = true
    this.inputType = type
    this.inputValue = value
  }
}
    
```

### 使用时的问题
如果用div包裹键盘组件，切换键盘时一定要用v-show,v-if在第二次切换键盘时，键盘的样式会错乱

