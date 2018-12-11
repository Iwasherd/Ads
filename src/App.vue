<template>
    <div class="app" id="app">
        <transition name="fade" mode="out-in">
            <router-view/>
        </transition>
    </div>
</template>

<script>
  export default {
  }
</script>
<style lang="scss">
    body {
        background: #212121;
        color: #FFFFFF;
        margin: 0;
        padding: 0;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>
