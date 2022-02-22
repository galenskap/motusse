<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <nav>
      <RouterLink :to="{name: 'word', params: {secret: 'Y29tcG90ZQ=='}}">Test</RouterLink>
      <RouterLink :to="{name: 'new'}">Faire deviner un mot</RouterLink>
    </nav>
  </header>
  <main>
    <h1>Motusse</h1>
    <RouterView />
  </main>
</template>

<style>
@import "@/assets/base.css";
@import url('https://fonts.googleapis.com/css2?family=Dongle&display=swap');

body {
  font-family: "Dongle", 'Helvetica Neue', sans-serif;
  font-size: 2rem;
}

header, main {
  max-width: 28rem;
  margin: auto;
}
header nav {
  display: flex;
  justify-content: center;
}
nav a {
  padding: .75rem;
  font-size: 1.6rem;
}
nav a:first-child {
  padding-left: 0;
}
h1 {
  font-size: 5rem;
  text-align: center;
}
.shown {
  display: block;
}
.hidden {
  display: none;
}

#app {
  display: flex;
  flex-direction: column-reverse;
}
header {
  margin-top: 4rem;
}

@media screen and (max-width: 600px) {
  body {
    font-size: 1rem;
  }
  header, main {
    max-width: auto;
    margin: .5em;
  }
  #app {
    flex-direction: column;
  }
  header {
    margin-top: 0;
  }
}
</style>
