<template>
  <div>
    <Header></Header>
      <div class="wrap">
        <router-view></router-view>
      </div>
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
@font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
}

* {
  margin: 0;
  padding: 0;
  font-family: 'Pretendard-Regular';
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
  padding: 0 10vw;
}


</style>