<template>
  <div style="text-align: center">
    <Welcome />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Welcome from "../components/Welcome.vue";

export default Vue.extend({
  name: "Home",

  components: {
    Welcome,
  },
});
</script>
