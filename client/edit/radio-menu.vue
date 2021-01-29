<template lang="pug">
    div.grid(:style="gridStyle")
        button.btn.btn-outline-primary(v-for="value, index in options") {{value}}
</template>

<script>
export default {
    props: {
        /**
         * Array of string, where each string is a possible value to choose.
         */
        options: {
            type: Array,
            requred: true
        },
        /**
         * Index of selected value.
         */
        selectedIndex: Number,
        /**
         * Number of columns in which grid of options will be arranged.
         */
        columns: {
            type: Number,
            default: 2
        }
    },
    computed: {
        gridStyle: function() {
            return {
                'grid-template-columns': `repeat(${this.columns}, 1fr)`
            };
        }
    },
    methods: {
        selected(index) {
            this.$emit('selected', index);
        }
    }
}
</script>

<style lang="scss">
.grid {
    display: grid;
}
</style>