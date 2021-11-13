<template>
    <img :src="require('@/assets/' + srcValue )" :alt="altValue" :class="getClasses" :id="idValue">
</template>

<script>
export default {
    props: {
        /**
         * The src-path relative to the assets folder
         */
        srcValue: {
            type: String,
            required: true
        },
        /**
         * the classes seperated by " "
         */
        classvalue: {
            type: String
        },
        /**
         * Alternative Description of image
         */
        altValue: {
            type: String
        },
        /**
         * Id of image
         */
        idValue: {
            type: String
        }
    },
    computed: {
        /**
         * if classes were defined:
         *  - add them all to one object containing: className: true
         */
        getClasses: function(){
            var classesObj = "";
            if(this.classValue){
                classesObj = {};
                var classes = this.classvalue.split(" ");
                    classes.forEach(c=>{
                    classesObj[c] = true
                });
            }
            return classesObj;
        }
    }
}
</script>