<template lang="pug">
    .editor
        portal(to="navbar")
            button.btn.btn-outline-primary.px-5 Save
        .bg-light.shadow
            radio-menu.sticky-top(:options="lineTypes.map(t => ({text: t.name, icon: t.icon}))", v-model="lineType")

        editor-page
</template>

<script>
import lineTypes from './../../shared/lineTypes';
import RadioMenu from './radio-menu.vue'
import EditorPage from './page.vue';

export default {
    data: function() {
        return {
            lineTypes,
            lineType: 0
        }
    },
    components: {
        'radio-menu': RadioMenu,
        'editor-page': EditorPage
    }
}
</script>

<style lang="scss" scoped>
.editor {
    display: grid;
    grid-template-columns: 200px 1fr;
}

</style>