<template>
    <div class="slider_container">
        <div>
            <app-button type="chevron-left" :isPrimary="false" @click="addToXOffset($event, -1)" /> <!--:class="{notAvailable: !checkAvailability(true)}" :enabled="checkAvailability(true)"-->
        </div>
        <div class="slider_content" :class="{no_transition: !transition}" ref="slider_content" >
            <slot><p class="empty">{{empty}}</p></slot>
        </div>
        <div>
            <app-button type="chevron-right" :isPrimary="false" @click="addToXOffset($event, 1)"/>
        </div>
    </div>
</template>

<script>
import Button from "./../../shared/parts/Button.vue";

export default {
    components: {
        /**
         * Button for iterating trough matches list
         */
        appButton: Button
    },
    props:{
        /**
         * Pixels to move on x-axis
         */
        slideBy: {
            type: Number,
            default: 370
        },
        /**
         * Text if no element was passed 
         */
        empty: {
            type: String,
            default: "Keine Einträge vorhanden."
        }
    },
    data(){
        return {
            lastClick: -Infinity,
            xOffset: 0,
            transition: false
        };
    },
    methods: {
        /**
         * @param val: Multiplier to scroll to left (-1) or right(1)
         * checks if last click was at least 500 ms in the past then increment scroll position by the width of a match card
         */
        addToXOffset: function(event, val){
            var now = new Date();
            now = now.getMilliseconds() + now.getSeconds()*1000 + now.getMinutes()*60*1000 + now.getHours()*60*60*1000;
            if(this.lastClick < now - 300){
                var offset = this.slideBy*val;
                var matchesContainer = event.target.closest(".slider_container").querySelector(".slidehow_transition");
                if(!matchesContainer) matchesContainer = event.target.closest(".slider_container").querySelector(".slider_content");
                matchesContainer.scrollBy(offset,0);
                this.lastClick = now;
                this.xOffset += offset;
            }
        },
        /**
         * Scrollbar Visible Function
         * @return boolean if scrollbar is for element visible
         */
        scrollbarVisible(element) {
            return element.scrollHeight > element.clientHeight;
        },
        /**
         * Checks if a transition element exists
         */
        checkOnTransition(){
            if(this.$refs.slider_content) {
                var transitionEl = this.$refs.slider_content.querySelector(".slidehow_transition");
                if(transitionEl){
                    this.transition = true;
                    console.log("[Slideshow]: Transitions enabled");
                }
            }
        }
    },
    mounted(){
        this.checkOnTransition();
    }
}
</script>

<style scoped>
    .slider_container{
        display: grid;
        grid-template-columns: 100px calc(100% - 200px) 100px;
        overflow: hidden;
    }
    .slider_content{
        display: flex;
        grid-column: 2/3;
        overflow-x: hidden;
    }
    .slider_content.no_transition, .slidehow_transition{
        display: flex;
        flex-direction: row;
        scroll-behavior: smooth;
        mask: linear-gradient(90deg, rgba(0,0,0,0) 0, rgba(0,0,0,1) 25px, rgba(0,0,0,1) calc(100% - 25px), rgba(0,0,0,0) 100%);
        padding: 30px 25px 50px 25px;
    }

    .slidehow_transition{
        overflow-x: hidden;
    }

    .slider_content p.empty{
        display: block;
        width: 100%;
        text-align: center;
        font: var(--app-font-xs-regular);
        color: var(--app-color-dark-grey);
        margin: 20px 0 0 0;
    }

    .slider_content.no_transition::after, .slidehow_transition::after{
        display: block;
        content: "i";
        height: 0;
        visibility: hidden;
    }

    .slider_container>div:not(:nth-child(2)){
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .slider_container>div:first-child{
        grid-column: 1 / 2;
        grid-row: 1 / 2;
    }
    .slider_container>div:last-child{
        grid-column: 3 / 4;
        grid-row: 1 / 2;
    }
</style>