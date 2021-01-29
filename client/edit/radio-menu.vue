<template lang="pug">
    div.buttons()
        button.btn(
            v-for="value, index in options",
            :class="index == selectedIndex? 'btn-primary selected-button':'btn-outline-primary'",
            @click="selected(index)"
        )
            span(:class="[value.icon, index == selectedIndex?'me-2':'']")
            span(v-show="index == selectedIndex") {{value.text}}
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
    padding: 5px;

    & > * {
        flex: 0 1 0;
        white-space: nowrap;
        transition: 0.2s flex-grow, 0.2s flex-shrink;
    }
}

.buttons > button + button {
    margin-left: 0.5rem;
}

.buttons > .selected-button {
    flex: 1 0 0;
}
</style>