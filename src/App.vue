<template>
  <div id="app" class="container">
    <div class="logo"><img alt="Vue logo" src="./assets/logo.png"></div>
    <todo-list/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import TodoList from './components/TodoList.vue'

export default {
  name: 'app',
  components: {
    HelloWorld,
    TodoList
  }
}
</script>

<style lang="scss">
*{
  box-sizing: border-box;
}
.container{
  max-width: 600px;
  margin: 0 auto;
}
.logo{
   text-align: center;
   img{
      display:inline-block;
      margin:auto;
      width: 50px;
   }
}

</style>
