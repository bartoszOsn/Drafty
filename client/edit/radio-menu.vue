<template lang="pug">
    div.buttons.bg-light.shadow
        button.btn.text-start.ps-4(
            v-for="value, index in options",
            :class="index == selectedIndex? 'btn-primary selected-button':'btn-outline-primary'",
            @click="selected(index)"
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
         * Index of selected value.
         */
        selectedIndex: Number,
    },
    model: {
        prop: 'selectedIndex',
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
        selected(index) {
            this.$emit('selected', index);
        }
    }
}
</script>

<style lang="scss" scoped>
.buttons {
    display: flex;
    flex-direction: column;
    padding: 5px;

    & > * {
        flex: 1 1 0;
        white-space: nowrap;
    }
}

.buttons > * + * {
    margin-top: 0.5rem;
}
</style>