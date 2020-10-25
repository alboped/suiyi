<template>
  <div class="container">
    <div class="source-view">
      <textarea
        class="source-input"
        autofocus="autofocus"
        v-model="sourceValue"
        @keydown.enter="translateSubmit"
      />
    </div>
    <div class="tool-bar">
      <Select
        :options="langOptions"
        :value="selectValue"
        @onChange="selectChange"
      />
      <Button @onClick="translateSubmit">翻译</Button>
    </div>
    <div class="result-view">
      <p v-for="(item, index) in resultList" :key="index">{{ item.dst }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

import Select from "./Select.vue";
import Button from "./Button.vue";
import { baiduTranslate } from "../translate";

const langOptions = [
  { id: "1", from: "自动检测语言" },
  { id: "2", from: "中文", to: "英文" },
  { id: "3", from: "英文", to: "中文" }
];

@Options({
  props: {},
  components: {
    Select,
    Button
  }
})
export default class Translate extends Vue {
  langOptions = langOptions;
  selectValue = langOptions[0].id;
  sourceValue = "";
  resultList = [];

  selectChange(item: any) {
    this.selectValue = item.id;
  }

  async translateSubmit() {
    const { data } = await baiduTranslate(this.sourceValue);

    if (data.error_code) {
      this.resultList = [];
    } else {
      this.resultList = data.trans_result;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.source-view {
  padding: 10px;
  font-size: 18px;
}

.source-input {
  display: block;
  resize: none;
  width: 100%;
  height: 160px;
  padding: 10px;
  border: 0;
  outline: none;
  font-size: 16px;
}

.tool-bar {
  display: flex;
  justify-content: center;
  padding: 10px 0;
  border-bottom: 1px solid rgb(202, 202, 202);
}

.result-view {
  padding: 20px;
  p {
    margin: 0 0 10px 0;
  }
}
</style>
