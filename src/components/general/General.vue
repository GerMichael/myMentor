<template>
    <main>
        <app-header/>
        <router-view/>
        <app-footer/>
    </main>
</template>

<script>
import Header from "./../start/Header.vue";
import Footer from "./../shared/Footer.vue";

export default {
    components: {
        appHeader:Header,
        appFooter:Footer
    }
}
</script>

<style scoped>
    article{
        padding: 20px;
    }
</style>