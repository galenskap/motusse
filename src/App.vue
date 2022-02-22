<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <nav>
      <RouterLink :to="{name: 'word', params: {secret: 'Y29tcG90ZQ=='}}">Test</RouterLink>
      <RouterLink :to="{name: 'new'}">New word</RouterLink>
    </nav>
  </header>
  <main>
    <h1>Motusse</h1>
    <RouterView />
  </main>
</template>

<style>
@import "@/assets/base.css";
header, main {
  max-width: 28rem;
  margin: auto;
}
header nav {
  display: flex;
  justify-content: flex-start;
}
nav a {
  padding: .75rem;
  font-size: 1.2rem;
}
nav a:first-child {
  padding-left: 0;
}
h1 {
  font-size: 3rem;
}
.shown {
  display: block;
}
.hidden {
  display: none;
}
</style>
