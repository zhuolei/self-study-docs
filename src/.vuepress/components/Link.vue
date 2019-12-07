<template>
  <div class="Link">
    <a :href="hrefUrl" :target="target">{{ text }}</a>
  </div>
</template>

<script>
export default {
  props: {
    hrefUrl: {
      type: String,
      required: true
    },
    target: {
      type: String
    },
    text: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
.Link {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
  margin: 15px 5px 0;
}
</style>