<template>
  <div>
      <router-link :to="{ name: 'home' }">Pokemon List</router-link>
      <router-link :to="{ name: 'about' }">About</router-link>
      <router-link :to="{ name: 'pokemon-id', params: { id: 4 } }">Pokemon by ID</router-link>
  </div>
</template>

<style scoped>
    div {
        padding: 0 30px;
    }

    div a {
        font-weight: bold;
        margin: 0 10px;
        color:darkolivegreen;
    }

    div .router-link-exact-active {
        color:rgb(46, 199, 41)
    }
</style>