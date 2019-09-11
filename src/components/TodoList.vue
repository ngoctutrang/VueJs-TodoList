<template>

  <div class="todo page-wrapper">
    <div v-if="name" class="name-container">
        Welcome, {{name}}
    </div>
    <input
      type="text"
      class="todo-input"
      placeholder="What needs to be done"
      v-model="newTodo"
      @keyup.enter="addTodo"
    />
    <todo-item v-for="(todo, index) in todosFiltered" :key="todo.id"
    :todo ="todo"
    :index ="index"
    :checkAll="!anyRemaining"
  
    
    >
    
    </todo-item>
    <div class="extra-container">
     
      <todo-check-all></todo-check-all>
      <todo-items-remaining></todo-items-remaining>
    </div>
    <hr/>
    <div class="extra-container">
     
      <todo-filtered></todo-filtered>
      <todo-show-clear></todo-show-clear>
    </div>
  </div>
</template>

<script>
import TodoItem from './TodoItem'
import TodoItemsRemaining from './TodoItemsRemaining'
import TodoCheckAll from './TodoCheckAll'
import TodoFiltered from './TodoFiltered'
import TodoShowClear from './TodoShowClear'
export default {
  name: "todo-list",
  components:{
    TodoItem,
    TodoItemsRemaining,
    TodoCheckAll,
    TodoFiltered,
    TodoShowClear
  },
  data() {
    return {
      newTodo: "",
      idForTodo: 3,
      beforeEditCache:'',
      name: 'TEST'
     
    };
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim() === "") return;

      this.$store.dispatch('addTodo',{
        id: this.idForTodo,
        title: this.newTodo,
        editing: false,
        completed: false
      })
      // this.$store.state.todos.push({
      //   id: this.idForTodo,
      //   title: this.newTodo,
      //   editing: false,
      //   completed: false
      // });
      this.newTodo = "";
      this.idForTodo++;
    },
    removeTodo(index) {
      this.$store.state.todos.splice(index, 1);
    },
  
    doneEdit(todo) {
      
       if (todo.title.trim() === ""){
         todo.title = this.beforeEditCache
       }
      todo.editing = false;
    },
    finishedEdit(data){
      this.$store.state.todos.splice(data.index,1,data.todo)
    },
    checkAllTodos(){
      this.$store.state.todos.forEach((todo)=>todo.completed = event.target.checked)
    }
  },
  created(){
    this.$store.dispatch('retrieveTodos')
    this.$store.dispatch('retrieveUser')
    .then(res=>{
      this.name = res.data.name
     
    })
    .catch(err=>{
      this.name = ''
    })
    // eventBus.$on('finishedEdit',(data)=>this.finishedEdit(data))
    // eventBus.$on('checkAllChanged',(checked)=>this.checkAllTodos(checked))
    // eventBus.$on('implementFilterChange',(filter)=>this.$store.state.filter = filter)
    // eventBus.$on('implementClearComplete',()=>this.clearCompleted())
  },
  beforeDestroy(){
   
    // eventBus.$off('finishedEdit',(data)=>this.finishedEdit(data))
    // eventBus.$off('checkAllChanged',(checked)=>this.checkAllTodos(checked))
    // eventBus.$off('implementFilterChange',(filter)=>this.$store.state.filter = filter)
    // eventBus.$off('implementClearComplete',()=>this.clearCompleted())
  },
  computed: {
    remaining(){
      return this.$store.getters.remaining;
    },
    anyRemaining(){
      return this.$store.getters.anyRemaining;
    },
    todosFiltered(){
     
      return this.$store.getters.todosFiltered
    },
    showClearCompletedButton(){
      return this.$store.getters.showClearCompletedButton;
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.todo-input {
  width: 100%;
  padding: 10px 18px;
  font-size: 18px;
  margin-bottom: 16px;
  &:focus {
    outline: 0;
  }
}
.todo-item {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .remove-item {
    cursor: pointer;
  }
  .todo-item-left {
    display: flex;
    align-items: center;
    .todo-item-label {
      padding: 10px;
      border: 1px solid white;
      margin-left: 12px;
    }
    .todo-item-edit {
      font-size: 24px;
      color: #2c3e50;
      width: 100%;
      padding: 10px;
      border: 1px solid #ccc;
      &:focus {
        outline: none;
      }
    }
  }
}
.completed{
  text-decoration: line-through;
  color:gray;
}
.extra-container{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.active{
  background: blue;
  color: white
}
</style>
