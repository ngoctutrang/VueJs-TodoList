<template>
    <div>

    </div>
</template>

<script>
    export default {
        created(){
            this.$store.dispatch('emptyTodos')
            this.$store.dispatch('destroyToken')
            .then(respone=>{
                this.$router.push({ name: 'home' })
                
            })
        }
    }
</script>

<style lang="scss" scoped>

</style>