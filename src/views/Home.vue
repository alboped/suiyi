<template>
  <div class="home">
    <Translate />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Translate from "@/components/Translate.vue"; // @ is an alias to /src

@Options({
  components: {
    Translate
  }
})
export default class Home extends Vue {}
</script>
