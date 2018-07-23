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
      <div v-if="!loading" class="comic-grid">
        <div  v-for="comic in comics" :key="comic.id">
          <comic-item :comic="comic"/>
        </div>

      </div>
      <div v-if="loading"  class="loader-div"><div class="loader"></div></div>
    </div>
    <footer>
      <button v-if="comicPage !== 1" @click="goTo(1)" class="fa fa-angle-double-left" style="font-size:24px"></button>
      <button v-if="comicPage-1 > 0" @click="goTo(comicPage-1)" class="fa fa-angle-left" style="font-size:24px"></button>
      <button v-if="comicPage-2 > 0" @click="goTo(comicPage-2)" >{{this.comicPage-2}}</button>
      <button v-if="comicPage-1 > 0" @click="goTo(comicPage-1)" >{{this.comicPage-1}}</button>
      <button class="selected" @click="goTo(comicPage)" >{{this.comicPage}}</button>
      <button v-if="comicPage+3 <= totalComics" @click="goTo(comicPage+1)" >{{this.comicPage+1}}</button>
      <button v-if="comicPage+4 <= totalComics" @click="goTo(comicPage+2)" >{{this.comicPage+2}}</button>
      <button v-if="comicPage+1 <= totalComics" @click="goTo(comicPage+1)" class="fa fa-angle-right" style="font-size:24px"></button>
      <button v-if="comicPage !== totalComics" @click="goTo(totalComics)" class="fa fa-angle-double-right" style="font-size:24px"></button>
    </footer>
  </div>
</template>

<script>
import { get } from 'axios';
import ComicItem from './ComicItem';

const config = require('./../../.env');
const apikey = '&apikey='+config.API_KEY;
const limit = "?limit=10";
const hash = '&hash='+config.HASH;
const ts = '&ts=1';

let url = 'https://gateway.marvel.com:443/v1/public/comics'+limit+apikey+hash+ts;

export default {
    name: 'ComicList',
    components: {
        ComicItem
    },
    data () {
        return {
            comics: [],
            totalComics: 0,
            comicName: this.$route.query.search,
            searchComic: "",
            comicPage: parseInt(this.$route.params.id),
            loading: true

        }
    },
    methods: {
      search() {
        this.searchComic 
          ? this.$router.push({ path: "/comics/1", query: { search: this.searchComic}})
          : this.$router.push({ path: "/comics/1", query: {}})
        this.comicName = this.searchComic;
      }, 
      update (page) {
        this.loading = true;
        this.comicName
          ? get(url+'&titleStartsWith='+this.comicName+"&offset="+(page-1)*10)
              .then(res => { 
                this.comics = res.data.data.results;
                this.totalComics = Math.ceil(parseInt(res.data.data.total)/10);
                this.loading = false;
              })
              .catch(err => console.error(err))
          : get(url+"&offset="+(this.$route.params.id-1)*10)
              .then (res => { 
                this.comics = res.data.data.results;
                this.totalComics = Math.ceil(parseInt(res.data.data.total)/10);
                this.loading = false;
              })
              .catch (err => console.error(err))
      },
      goTo(page) {
        this.comicPage = page;
      }
    },
    created() {
      this.update(this.$route.params.id);
    },
    watch : {
      'comicName': function () {
        this.update(this.$route.params.id);
      },
      'comicPage': function () {
        this.$router.push({ path: "/comics/"+this.comicPage, query: { search: this.$route.query.search}})
        this.update(this.comicPage);
      }
    }
}
</script>

<style>
body {
  margin: 0;
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

.loader-div {
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column: 2/3;
  height: 760px;
}

.loader {
  border: 16px solid #f3f3f3; /* Light grey */
  border-top: 16px solid #bd1023;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
  
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
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
    display: grid;
    grid-template-columns: minmax(1em, 1fr) minmax(0, 75em) minmax(1em, 1fr);
    padding: 25px;
}

.comic-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 10px;
  grid-column: 2/3;
}

.comic-grid div {
  display: flex;
  align-items: center;
  justify-content: center;
}

footer button {
  background-color: #bd1023;
  border:none;
  color:#fff;
  cursor: pointer;
  font-size: 18px;
  height: 50px;
  transition: .2s ease;
  width: 50px;
}

footer button:hover, footer button:active {
  background-color: #50070f;
}

.selected {
  background-color: #50070f;
}



</style>
