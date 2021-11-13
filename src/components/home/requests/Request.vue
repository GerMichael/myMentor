<template>
    <span class="mentoring_request_container">
        <section>
            <p>{{ getOtherUserName }} möchte von mir lernen</p>
            <p>{{ request.userSkill.name }}</p>
            <router-link tag="a" :to="{path: '/user', query: {id: request.otherUser.id}}">Mehr über {{ getOtherUserName }} erfahren...</router-link>
        </section>
        <section>
            <p>Das kann ich von {{ getOtherUserName }} lernen</p>
            <p>{{ request.otherSkill.name }}</p>
        </section>
    </span>
</template>

<script>
export default {
    props: {
        /**
         * A Certain Request
         */
        request: {
            type: Object,
            required: true
        }
    },
    computed: {
        /**
         * @return both first and last name of other user
         */
        getOtherUserName: function(){
            return this.request.otherUser.firstName + " " + this.request.otherUser.lastName;
        }
    }
}
</script>

<style scoped>
    .mentoring_request_container{
        display: grid;
        grid-template-columns: 50% 50%;
        min-width: 500px;
    }
</style>