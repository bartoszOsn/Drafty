<template lang="pug">
    .editor
        portal(to="navbar")
            button.btn.btn-outline-primary.px-5(@click="save") Save
        .bg-light.shadow
            radio-menu.sticky-top(:options="lineTypes.map(t => ({text: t.name, icon: t.icon}))", v-model="currentParagraphType")
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
            lineType: 'Action'
        }
    },
    computed: {
        focusedParagraphIndex() {
            return this.$store.state.focusedParagraphIndex
        },
        currentParagraphType: {
            get() {
                return this.$store.state.content[this.focusedParagraphIndex]?.type;
            },
            set(value) {
                this.$store.commit('changeParagraphType', {
                    index: this.$store.state.focusedParagraphIndex,
                    type: value
                });
            }
        }
    },
    methods: {
        save() {
            const data = this.$store.state.content;
            const id = location.pathname.split('/').pop();
            const body = JSON.stringify({content: data});
            console.log(body);
            fetch('../../API/screenplay/' + id, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: body
            }).finally(console.log);
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