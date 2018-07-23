<template>
  <div id="app">
    <header>
      <router-link :to="'/'">MARVEL API EXPLORER</router-link> 
    </header>
    <div class="search-bar">
      <input type="text" v-model="searchComic" @keypress.enter="search">
      <button class="search-button" @click="search">Search</button>
    </div>
    <div class="feed-main">
        <router-link :to="'/comics/1'">
            <div class="start-button">START EXPLORING</div>
        </router-link>
    </div>  
    <footer>

    </footer>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      searchComic: ""
    }
  }, 
  methods: {
    search() {
      this.searchComic 
        ? this.$router.push({ path: "/comics/1", query: { search: this.searchComic}})
        : this.$router.push({ path: "/comics/1"})
    }
  }
}
</script>

<style scoped>
body {
  margin: 0;
  font-family: 'Oswald', sans-serif;
}

a {
  text-decoration: none; 
  color: #fff; 
}

#app {
  font-family: 'Oswald', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

header, footer {
  background-color: #bd1023;
  color: #fff;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-bar {
  width: 100%;
  height: 50px;
  display: grid;
  grid-template-columns: 1fr 175px;
}

.search-button {
  background-color: #3a3a3a;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
}

.feed-main {
    background: linear-gradient(180deg, #1f1f1f, #3a3a3a);
    display: flex;
    height: 650px;
    align-items: center;
    justify-content: center;

}

.start-button {
    color: #333;
    height: 45px;
    width: 175px;
    border-radius: 50px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>
