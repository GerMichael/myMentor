<template>
    <div class="hsplitted_container" 
            :style="{'grid-template-columns': `${percentageFirst}% auto`}">
        <div class="first" :style="{backgroundColor: firstColor}">
            <slot name="first"/>
        </div>
        <div class="second">
            <slot name="second"/>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        /**
         * percentage of width of first part of splitted fields
         */
        percentageFirst: {
            type: [String, Number],
            default: 50
        },
        /**
         * The color of the first part of splitted fields
         */
        firstColor: {
            type: String,
            default: "var(--app-color-brand-1)"
        }
    }
}
</script>

<style scoped>
    .hsplitted_container{
        width: 100%;
        height: 100%;
        display: grid;
    }
    .first{
        width: 100%;
        height: 100%;
        grid-column: 1/2;
        padding: 20px;
    }
    .second{
        width: 100%;
        height: 100%;
        grid-column: 2/3;
        padding: 20px;
    }
</style>