<template>
    <span class="text_with_title">
        <span class="title">
            {{ title }}
        </span>
        <span class="text" v-if="!edit">
            {{ value }}
        </span>
        <span class="input" v-else>
            <input @input="inputChanged" v-model="inputValue"/>
        </span>
        <span class="addition">
            {{ addition }}
        </span>
        <span class="error">
            <slot name="error"/>
        </span>
    </span>
</template>

<script>
export default {
    props: {
        /**
         * Title of text
         */
        title: String,
        /**
         * Text itself
         */
        value: String,
        /**
         * If edit mode is active
         */
        edit: {
            type: Boolean,
            default: false
        },
        /**
         * Additional text (sth like sub headline)
         */
        addition: String
    },
    data(){
        return {
            inputValue: ""
        }
    },
    methods: {
        /**
         * Emit event if input has changed
         */
        inputChanged(){
            this.$emit("input", this.inputValue);
        }
    },
    created(){
        this.inputValue = this.value;
    },
    watch: {
        /**
         * Support value-prop
         */
        value: function(){
            this.inputValue = this.value;
        }
    }
}
</script>

<style scoped>
    .text_with_title{
        display: flex;
        flex-direction: column;
    }
    .text_with_title .title{
        font: var(--app-font-xxs-bold);
        margin-bottom: 5px;
    }
    .text_with_title .text{
        font: var(--app-font-s-regular);
        border-bottom: 1px solid transparent;
    }
    .text_with_title .input input{
        padding: 0;
        font: var(--app-font-xs-regular);
        width: 100%;
        border: none;
        border-bottom: 2px solid var(--app-color-dark-grey);
        background-color: transparent;
        outline: none;
    }
    .text_with_title .input input:focus{
        border-bottom: 2px solid var(--app-color-brand-2);
    }
    .text_with_title .addition{
        margin-top: 5px;
        font: var(--app-font-xxs-regular);
    }
</style>