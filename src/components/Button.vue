<template>
  <div class="button-view" @click="$emit('on-click')">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    options: Array,
    value: String
  },
  emits: ["on-click"]
})
export default class Button extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.button-view {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
  min-width: 100px;
  height: 34px;
  margin: 8px;
  background-color: #1890ff;
  border-radius: 17px;
  color: #fff;
  text-align: center;
  font-size: 16px;
  &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 1;
  }
}
</style>
