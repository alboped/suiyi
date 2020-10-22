<template>
  <div class="select-view">
    <div class="select-button" @click.stop="tiggleVisible">
      {{ getOptionLabel(currentOption) }}
    </div>
    <div class="select-popup" v-show="popupVisible">
      <div
        class="select-item"
        v-for="item in options"
        :key="item.id"
        @click.stop="handleSelect(item)"
      >
        {{ getOptionLabel(item) }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    options: Array,
    value: String
  },
  emits: ["on-change"]
})
export default class Select extends Vue {
  options!: Array<any>;
  value!: string;
  popupVisible = false;

  get currentOption() {
    return this.options.find(item => item.id === this.value);
  }

  getOptionLabel = (option: any) => {
    if (!option.to) return option.from;

    return `${option.from} ~ ${option.to}`;
  };

  tiggleVisible = () => {
    this.popupVisible = !this.popupVisible;
  };

  handleSelect = (item: any) => {
    this.$emit("on-change", item);
    this.tiggleVisible();
  };

  mounted() {
    document.addEventListener("click", () => {
      this.popupVisible = false;
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.select-view {
  position: relative;
  margin: 8px;
}

.select-button {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
  min-width: 140px;
  height: 34px;
  border: 1px solid #ddd;
  border-radius: 17px;
  &:hover {
    border: 1px solid #bbb;
  }
}

.select-popup {
  position: absolute;
  overflow: hidden;
  bottom: 100%;
  right: 0;
  width: 140px;
  background: #fff;
  border-radius: 8px;
  box-shadow: #ccc 1px 1px 10px;
}

.select-item {
  cursor: pointer;
  user-select: none;
  height: 34px;
  padding: 0 22px;
  line-height: 34px;
  &:hover {
    background-color: #e6f7ff;
  }
}
</style>
