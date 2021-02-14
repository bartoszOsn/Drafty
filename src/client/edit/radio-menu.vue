<template lang="pug">
    div.buttons
        button.btn.text-start.ps-4(
            v-for="value, index in options",
            :class="value.text == selectedValue? 'btn-primary selected-button':'btn-outline-primary'",
            @mousedown.stop.prevent="selected(value.text)"
        )
            span.me-2(:class="value.icon")
            span {{value.text}}
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
         * Selected value.
         */
        selectedValue: null,
    },
    model: {
        prop: 'selectedValue',
        event: 'selected'
    },
    computed: {
        gridStyle: function() {
            return {
                'grid-template-columns': `repeat(${this.columns}, 1fr)`
            };
        }
    },
    methods: {
        selected(value) {
            this.$emit('selected', value);
        }
    }
}
</script>

<style lang="scss" scoped>
.buttons {
    display: flex;
    flex-direction: column;

    & > * {
        flex: 1 1 0;
        white-space: nowrap;
    }
}

.buttons > * + * {
    margin-top: 0.5rem;
}
</style>