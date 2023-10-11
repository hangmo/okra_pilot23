<template>
  <div>
    <ul class="nav nav-pills">
      <li class="nav-item">
        <a class="nav-link active" aria-current="page" @click="movePage('/', $event)">bridge</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" @click="movePage('/upload', $event)">upload</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" @click="movePage('/download', $event)">download</a>
      </li>
      <li class="nav-item">
        <a class="nav-link"  @click="movePage('/account', $event)">account</a>
      </li>
      <li class="nav-item">
        <a class="nav-link"  @click="movePage('/login', $event)">login</a>
      </li>
      <li class="nav-item">
        <a class="nav-link"  @click="movePage('/seoul', $event)">seoul</a>
      </li>
      <li class="nav-item">
        <a class="nav-link"  @click="movePage('/appdown', $event)">App Download</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  watch: {
    $route(to, from ) {
      console.log('route change : ', to, from);
      if (to.fullPath != from.fullPath) {
        this.checkURI();
      }
    }
  },
  mounted() {
    this.checkURI();
  },
  methods:{
    checkURI() {
      const name = location.pathname;
      let element;
      let navLinks = document.querySelectorAll('.nav-link');
      switch(name) {
        case '/upload':
          element = navLinks[1];
          break;
        case '/download':
          element = navLinks[2];
          break;
        case '/account':
          element = navLinks[3];
          break;
        case '/login':
          element = navLinks[4];
          break;
        case '/seoul':
          element = navLinks[5];
          break;
        case '/appdown':
          element = navLinks[6];
          break;
        default:
          element = navLinks[0];
          break;
      }
      this.setActive(element);
    },
    movePage(path, element) {
      console.log('path :', path, element);
      this.setActive(element.target);
      this.$router.push(path);
    },
    setActive(element) {
      console.log('element : ', element);
      const navLink = document.querySelectorAll('.nav-link');
      navLink.forEach(el => {
        el.classList.remove('active');
      });
      element.classList.add('active');
    }
  }
}
</script>

<style>

</style>