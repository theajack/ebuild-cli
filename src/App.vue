<!--
 * @Author: theajack
 * @Date: 2023-04-04 23:20:27
 * @Description: Coding something
-->
<script setup lang="ts">
</script>

<template>
  <div>
    <router-link to="/">home</router-link>
    |
    <router-link to="/about">about</router-link>
  </div>
  <router-view/>
  <!-- <router-view v-slot="{ Component }">
      <component :is="Component" />
  </router-view> -->
</template>
<style lang="less">
</style>