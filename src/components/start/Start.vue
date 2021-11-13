<template>
    <div>
        <start-header/>
        <start-content/>
        <router-view/>
    </div>
</template>

<script>
import Header from "./Header.vue";
import Content from "./Content.vue";

export default {
    components: {
        /**
         * Header of Start page
         */
        startHeader: Header,
        /**
         * Content of Start
         */
        startContent: Content
    }
}
</script>
