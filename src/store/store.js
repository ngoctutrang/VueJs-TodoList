import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { reject } from 'q'

axios.defaults.baseURL='http://api.todolist.test/api'
Vue.use(Vuex)

export const store = new Vuex.Store({
    state:{
        token:localStorage.getItem('token')||null,
        filter:'all',
        todos: [
            
          ]
    },
    getters:{
        loggedIn(state){
          return state.token !== null
        },
        remaining(state){
            return state.todos.filter(todo=>!todo.completed).length;
          },
        anyRemaining(state, getters){
            return getters.remaining !==0;
          },
        todosFiltered(state){
            if(state.filter === 'all'){
              return state.todos
            }else if (state.filter ==='active'){
              return state.todos.filter(todo => !todo.completed)
            }else if (state.filter ==='completed'){
                return state.todos.filter(todo => todo.completed)
            }
            return state.todos
          },
        showClearCompletedButton(state){
            return state.todos.filter(todo=>todo.completed).length > 0;
          }
    },
    mutations:{
      retrieveTodos(state, todos){
        state.todos=todos
      },
      addTodo(state,todo){
        state.todos.push(todo)
      },
      deleteTodo(state,id){
        const index = state.todos.findIndex(item=>item.id == id)
        state.todos.splice(index,1)
      },
      updateTodo(state,todo){
        const index = state.todos.findIndex(item=>item.id == todo.id)

        state.todos.splice(index,1,todo)
      },
      clearCompleted(state){
        state.todos = state.todos.filter(todo=>!todo.completed)
      },
      updateFilter(state,filter){
          state.filter = filter
      },
      checkAll(state,checked){
        state.todos.forEach(todo=>todo.completed = checked);
      },
      retrieveToken(state, token){
        state.token = token;
       
      },
      destroyToken(state){
        state.token = null;
      },
      emptyTodos(state){
        state.todos =[];
      }

    },
    actions:{
      retrieveUser(context){
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
        return new Promise((resolve, reject)=>{
          axios.get('/user')
          .then(res=>{
            
            resolve(res)
          })
          .catch(err=>{
            reject(err)
          })
        })
        
      },
      emptyTodos(context){
        context.commit('emptyTodos')
      },
      register(context, data){
        return new Promise((resolve, reject)=>{
          axios.post('/register',data)
          .then(res=>{
           
            resolve(res)
          })
          .catch(err=>{
            reject(err)
          })
        })
      },
      destroyToken(context){
        if(context.getters.loggedIn){
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
          return new Promise((resolve, reject)=>{
            axios.post('/logout')
            .then(res=>{
             
              localStorage.removeItem('token')
              context.commit('destroyToken')
              resolve(res)
            })
            .catch(err=>{
              localStorage.removeItem('token')
              context.commit('destroyToken')
              reject(err)
            })
          })
        }
       
      },
      retrieveToken(context, data){
        return new Promise((resolve, reject)=>{
          axios.post('/login',data)
          .then(res=>{
            const token =res.data.access_token;
            localStorage.setItem('token', token)
            context.commit('retrieveToken', token)
            resolve(res)
          })
          .catch(err=>{
            reject(err)
          })
        })
        
      },
      retrieveTodos(context){
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
        axios.get('/todos')
          .then(res=>{
            console.log('res:',res)
              context.commit('retrieveTodos', res.data)
          })
          .catch(err=>{
            console.log(err)
          })
      },
      addTodo(context,todo){
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
        axios.post('/todos',{
          title: todo.title,
          completed: false
        })
          .then(res=>{
            context.commit('addTodo', res.data)
          })
          .catch(err=>{
            console.log('Post error:',err)
          })
      },
      deleteTodo(context,id){
        axios.delete('/todos/'+id)
          .then(res=>{
            context.commit('deleteTodo', id)
          })
          .catch(err=>{
            console.log('Post error:',err)
          })
        
      },
      updateTodo(context,todo){
        axios.patch('/todos/'+todo.id,{
          title: todo.title,
          completed: todo.completed
        })
          .then(res=>{
            context.commit('updateTodo', res.data)
          })
          .catch(err=>{
            console.log('Post error:',err)
          })
      
      },
      clearCompleted(context){
        const completed = store.state.todos
          .filter(todo=>todo.completed)
          .map(todo=>todo.id)
        axios.delete('/todosDeleteCompleted',{
         
          data: {
            todos: completed
          }
        })
          .then(res=>{
            context.commit('clearCompleted')
          })
          .catch(err=>{
            console.log('Clear error:',err)
        })
       
      },
      updateFilter(context,filter){
        context.commit('updateFilter', filter)
      },
      checkAll(context,checked){
        axios.patch('/todosCheckAll',{
         
          completed: checked
        })
          .then(res=>{
            context.commit('checkAll', checked)
          })
          .catch(err=>{
            console.log('Post error:',err)
        })
      
      },

    }
})