<template lang="pug">
    .editor
        export-modal
        .bg-light.shadow
            div.d-grid.px-2.pt-2.sticky-top
                name-input
                save-button(:can-save="modified", :saving="saving" @click="save") Save
                hr
                radio-menu(:options="lineTypes.map(t => ({text: t.name, icon: t.icon}))", v-model="currentParagraphType")
                hr
                tooltip(:text="'Save your document first!'", :enable="modified")
                    span.d-grid(tabindex=0)
                        button.btn.btn-outline-primary(:disabled="modified" @click="showModal") Export
                hr
                label Zoom
                    input.form-range(type="range" min="0.2" max="5" step="0.05" v-model="zoom")
        div.page-area
            editor-page.page(:style="{transform: `scale(${zoom}`}")
</template>

<script>
// TODO: fix zoom

import lineTypes from './../../shared/lineTypes';
import RadioMenu from './radio-menu.vue'
import EditorPage from './page.vue';
import SaveButton from './saveButton.vue';
import Tooltip from './tooltip';
import exportModal from './export-modal.vue';
import NameInput from './name-input.vue';

export default {
    data: function() {
        return {
            lineTypes,
            lineType: 'Action',
            zoom: 1,
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
        },
        saving() {
            return this.$store.state.saving || this.$store.state.loading;
        },
        modified() {
            return this.$store.state.modified;
        }
    },
    methods: {
        async save() {
            const data = this.$store.state.content;
            const id = this.$store.state.screenplayId;
            const body = JSON.stringify({content: data});
            this.$store.commit('updateSaving', {saving: true});
            await fetch('../../API/screenplay/' + id, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: body
            });
            this.$store.commit('updateSaving', {saving: false});
            this.$store.commit('resetModified');
        },
        async load() {
            const id = this.$store.state.screenplayId;
            this.$store.commit('updateLoading', {loading: true});
            const response = await fetch('../../API/screenplay/' + id, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "GET"
            });
            const data = await response.json();
            if(!data.content.length) {
                this.$store.commit('insertParagraph', {index: 0, type: 'Scene'});
            }
            else {
                this.$store.commit('updateContent', data);
            }
            this.$store.commit('updateTitlepage', {author: data.author, title: data.title});

            this.$store.commit('updateLoading', {loading: false});
            this.$store.commit('resetModified');
        },

        showModal() {
            this.$store.commit('updateExportModal', {shown: true});
        }
    },
    mounted() {
        this.load();
    },
    components: {
        'radio-menu': RadioMenu,
        'editor-page': EditorPage,
        'save-button': SaveButton,
        'tooltip': Tooltip,
        'export-modal': exportModal,
        'name-input': NameInput
    }
}
</script>

<style lang="scss" scoped>
.editor {
    display: grid;
    grid-template-columns: 200px 1fr;
    max-height: 100%;
    overflow: auto;
}

.page {
    transform-origin: top center;
}
</style>