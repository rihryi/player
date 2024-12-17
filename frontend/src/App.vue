<template>
  <div class="wrap">
    <Header></Header>
      <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

a {
  display: block;
}

img {
  width: 100%;
}

li {
  list-style: none;
}

.wrap {
  padding: 2vw;
}
</style>