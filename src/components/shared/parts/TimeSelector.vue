<template>
    <div class="time_selector_container">
        <div :class="{error: time.error.invalidTime || time.error.empty }">
            <input type="number" min="0" max="12" placeholder="00" 
                v-model="time.hour" @input="updateTime"/>
            <span>:</span>
            <input type="number" min="0" max="59" placeholder="00" 
                v-model="time.minute" @input="updateTime"/>
            <span>h</span>
            <transition name="error-shake" slot="error">
                <div role="alert" v-if="time.error.invalidTime">Die Zeit entspricht keinem validen Format.</div>
            </transition>
            <transition name="error-shake" slot="error">
                <div role="alert" v-if="time.error.empty">Beide Felder müssen ausgefüllt werden.</div>
            </transition>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: Object
        },
        displayErrorMessage: {
            type: Boolean,
            default: true
        }
    },
    data(){
        /**
         * The current selected hour and minute
         * in addition, if time-input is invalid
         * -> empty or invalid value
         */
        return {
            time: {
                hour: "00",
                minute: "00",
                error: {
                    invalidTime: false,
                    empty: false
                }
            }
        };
    },
    methods: {
        /**
         * Update time selection on change
         * -> first check if values are valid
         * -> add error-flag if neccessary
         */
        updateTime(){
            this.time.error.empty = this.time.hour == "" || this.time.minute == "";
            if(this.time.error.empty) return;
            
            var timeformatHour = /^(10|11|12|13|14|15|16|17|18|19|20|21|22|23|0?[0-9])$/;
            var timeformatMinute = /^[0-5]?[0-9]$/;
            this.time.error.invalidTime = this.time.hour.trim().match(timeformatHour) == null || this.time.minute.trim().match(timeformatMinute) == null;
            if(this.time.error.invalidTime) return;

            this.$emit("input", {
                hour: parseInt(this.time.hour),
                minute: parseInt(this.time.minute),
                error: this.time.error
            });
        }
    }
}
</script>

<style scoped>
    .time_selector_container{
        vertical-align: middle;
    }
    input{
        display: inline-block;
        width: 116px;
        height: 100px;
        text-align: center;
        font: var(--app-font-xl-bold);
        color: var(--app-color-black);
    }
    /* From https://www.w3schools.com/howto/howto_css_hide_arrow_number.asp */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
    }

    /* Firefox */
    input[type=number] {
    -moz-appearance: textfield;
    }
    span{
        display: inline-flex;
        margin: 0 10px;
        height: 100px;
        align-items: center;

        font: var(--app-font-xl-bold);
        color: var(--app-color-dark-grey);
        margin-bottom: 20px;
    }
    .error div[role="alert"]{
        color: var(--app-color-error);
        font: var(--app-font-xxxs-regular);
    }
</style>