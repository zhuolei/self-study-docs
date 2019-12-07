<template>
  <div class="code-style">
    <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.code-style {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
  color: #476582;
  padding: 0.05rem 0.75rem;
  margin: 0;
  font-size: 0.85em;
  background-color: rgba(27,31,35,0.05);
  border-radius: 3px;
}
</style>