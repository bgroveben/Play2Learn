<template>
  <div id="app">
    <Header />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header';
import Footer from './components/Footer';
export default {
  name: 'app',
  components: {
    Header,
    Footer
}
}
</script>

<style>
header, footer {
  background-color: #3f7cad;
}
</style>
