<template>
     <div>
        <button
        v-if="showClearCompletedButton"
        @click="clearCompleted"
        >
          Clear Completed
        </button>
      </div>
</template>

<script>
    export default {
        name: 'todo-show-clear',
        computed:{
            showClearCompletedButton(){
               return this.$store.getters.showClearCompletedButton;
            }
        },
        methods:{
            clearCompleted(){
                this.$store.dispatch('clearCompleted')
                
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>