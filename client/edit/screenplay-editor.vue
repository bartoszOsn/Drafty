<template lang="pug">
    .editor
        portal(to="navbar")
            button.btn.btn-outline-primary.px-3 Save
        .bg-light.shadow
            radio-menu.sticky-top(:options="lineTypes.map(t => ({text: t.name, icon: t.icon}))", v-model="lineType")

        .page.shadow.border.mx-auto.mt-4(style="width: 8.5in; height: 11in")
</template>

<script>
import lineTypes from './../../shared/lineTypes';
import RadioMenu from './radio-menu.vue'

export default {
    data: function() {
        return {
            lineTypes,
            lineType: 0
        }
    },
    components: {
        'radio-menu': RadioMenu
    }
}
</script>

<style lang="scss" scoped>
.editor {
    display: grid;
    grid-template-columns: 200px 1fr;
}

</style>