<template>
    <span class="input_container">
        <span class="title noselect" :class="{focused: inputFocused || inputValue != ''}" @click.prevent.self>{{title}}</span>
        <input :type="type" v-model="inputValue" 
            v-on="inputListeners"
            :autocomplete="autocomplete" :autocorrect="autocorrect" :spellcheck="spellcheck"
            :class="{error: error, typedin: inputValue != ''}"/>
        <span class="error">
            <slot name="error"/>
        </span>
    </span>
</template>

<script>
export default {
    props: {
        /**
         * Title and Placeholder of Input field
         */
        title: {
            type: String,
            default: ""
        },
        /**
         * Type of the input field
         */
        type: {
            type: String,
            default: "text"
        },
        /**
         * Value of Input
         */
        value: String,
        /**
         * If input is invalid
         */
        error: {
            type: Boolean,
            default: false
        },
        /**
         * Autocompletion Settings
         */
        autocomplete: {
            type: String,
            default: "on"
        },
        /**
         * Autocorrect
         */
        autocorrect: {
            type: String,
            default: "on"
        },
        /**
         * Spellcheck
         */
        spellcheck: {
            type: [Boolean, String],
            default: true
        }
    },
    data() {
        return {
            inputFocused: false,
            inputValue: ""
        };
    },
    methods: {
        /**
         * Focus input field
         */
        focusInput(){
            this.inputFocused = true;
            this.$emit("focus");
        },
        /**
         * Blur input field
         */
        blurInput(){
            this.inputFocused = false;
            this.$emit("blur");
        },
        /**
         * Keyup input field
         */
        keyupInput(){
            this.$emit("keyup");
        }
    },
    computed: {
        /* Copied from https://vuejs.org/v2/guide/components-custom-events.html */
        inputListeners: function () {
            var vm = this
            // `Object.assign` merges objects together to form a new object
            return Object.assign({},
            // We add all the listeners from the parent
            this.$listeners,
            // Then we can add custom listeners or override the
            // behavior of some listeners.
            {
                // This ensures that the component works with v-model
                input: function (event) {
                    vm.$emit('input', event.target.value)
                },
                //My events
                focus: function(){
                    vm.focusInput();
                },
                blur: function(){
                    vm.blurInput();
                }
            });
        }
    },
    watch: {
        /**
         * If Value was changed from outside
         */
        value: function(){
            this.inputValue = this.value;
        }
    }
}
</script>

<style scoped>
    .error{
        border-bottom: 2px solid var(--app-color-error);
    }

    .input_container{
        display: inline-block;
        width: 100%;
    }

    .title{
        z-index: 0;
        top: 25px;
        position: relative;
        display: inline-block;
        left: 2px;
        height: 19px;
        overflow: hidden;
        font: var(--app-font-xxs-regular);
        color: var(--app-color-dark-grey);
        padding: 0;
        transition: all .2s ease;
    }

    .title.focused{
        top: 4px;
        font: var(--app-font-xxxs-regular);
    }
    
    input{
        bottom: 0;
        -webkit-appearance: none;
        outline: none;
        border: none;

        position: relative;
        width: 100%;
        z-index: 1;
        background-color: transparent;
        color: var(--app-color-black);
        font: var(--app-font-xxs-regular);
        border-bottom: 2px solid var(--app-color-dark-grey);
        margin: 0;
        margin-bottom: 5px;
    }

    input:focus, input.typedin{
        border-bottom: 2px solid var(--app-color-brand-2);
    }
</style>