<template>
  <router-link :style="{ backgroundImage: `url('${this.comicImg}')` }"  :to="this.comicUrl" class="comic-item">
      <div class="overlay">
        {{comic.title}}
      </div>
  </router-link>
</template>

<script>
export default {
    name: 'ComicItem',
    props: [ 'comic' ],
    data() {
        return {
            comicUrl: '/comics/detail/'+this.comic.id,
            totalComics: 0,
            comicImg: this.comic.thumbnail.path +'.'+ this.comic.thumbnail.extension,
        }
    }
}
</script>
<style>
.comic-item {
    height: 375px;
    width: 300px;
    background-color: #bd1023;
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    background-size: cover;
    transition: .2s ease;
}

.overlay {
  opacity: 0;
  transition: .2s ease;
  background-color: #bd102486;
  height: 100%;
  width: 100%;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

}

.comic-item:hover .overlay {
  opacity: 1;

}

.comic-item:hover {
    transform: scale(1.1);
}

</style>
