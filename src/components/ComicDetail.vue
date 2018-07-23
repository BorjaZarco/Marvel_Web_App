<template>
  <div id="app">
    <div class="detail-header">
        <button @click="back" class="fa fa-angle-left" style="font-size:36px"></button>
    </div>
    <div v-if="loading" class="loader-div"><div class="loader"></div></div>
    <div v-if="!loading" class="comic-wrapper">
        <div class="comic-img">
            <img :src="comicImg" alt="comicImg" class="background">
            <img :src="comicImg" alt="comicImg" class="mainImg">
        </div>
        <div class="comic-info">
            <h2>{{this.comic.title}}</h2>
            <p>{{this.comic.description}}</p>
            <h3 v-if="this.comic.creators.returned !== 0" >Creators</h3>
            <p v-for="creator in this.comic.creators.items" :key="creator.name">{{creator.name}}</p>
            <h3 v-if="this.comic.characters.returned !== 0">Characters</h3>
            <p v-for="character in this.comic.characters.items" :key="character.name">{{character.name}}</p>
            <h3 v-if="this.comic.stories.returned !== 0">Stories</h3>
            <p v-for="story in this.comic.stories.items" :key="story.name">{{story.name}}</p>
        </div>
    </div>
  </div>
</template>

<script>
import { get } from 'axios';

const config = require('./../../.env');
const apikey = '?apikey='+config.API_KEY;
const hash = '&hash='+config.HASH;
const ts = '&ts=1';

let url = 'https://gateway.marvel.com:443/v1/public/comics/';

export default {
    name: 'ComicDetail',
    data () {
        return {
            comic: {
                creators: [],
                characters: [],
                stories: []
            },
            comicImg: "",
            loading: true
        }
    },
    methods: {
        prueba () {
            console.log(this.comic);
        },
        back() {
            this.$router.go(-1);
        }
    },
    created() {
        this.loading = true;
        get(url+this.$route.params.id+apikey+hash+ts)
        .then (res => {
            this.comic = res.data.data.results[0];
            this.comicImg = this.comic.thumbnail.path+'.'+this.comic.thumbnail.extension;
            this.loading = false;
        })
        .catch (err => console.error(err))
    },
}
</script>

<style>
body {
  margin: 0;
  height: 100vh;
  background: linear-gradient(180deg,#1f1f1f,#3a3a3a);
}

a {
  text-decoration: none;  
}

#app {
  font-family: 'Oswald', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.comic-wrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 100vh;
}

.comic-img {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

.mainImg {
    transform: scale(0.9);
    filter: blur(0);
    
}

.comic-info {
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.detail-header {
    color: #fff;
    text-decoration: none;
    background-color: #bd1023;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: left;
}

.detail-header button {
    margin-left: 10px;
    background-color: #bd1023;
    border:none;
    color:#fff;
    cursor: pointer;
}

img.background {
    width: 50%;
    height: 100%;
    position: absolute;
    left: 0px;
    top: 0px;
    z-index: -1;
    -webkit-filter: blur(35px); /* Safari 6.0 - 9.0 */
    filter: blur(35px);
}



</style>
