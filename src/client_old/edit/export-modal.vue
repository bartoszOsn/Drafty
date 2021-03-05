<template lang="pug">
    modal(
        :title="'Export to PDF'"
        :confirmButton="'Download'",
        :shown="modalShown",
        @close="modalShown = false",
        @confirmed="download"
        )
        .mb-3
            label.form-label Title of your screenplay
            input.form-control(type="text", v-model="title")

        .mb-3
            label.form-label Author
            input.form-control(type="text", v-model="author")
        .form-text This informations are used on the title page.
</template>

<script>
import Modal from './modal.vue';
export default {
    data() {
        return {
            title: '',
            author: ''
        }
    },

    computed: {
        modalShown: {
            get() {
                return this.$store.state.exportModalShown;
            },

            set(value) {
                this.$store.commit('updateExportModal', {shown: value})
            }
        }
    },

    watch: {
        modalShown() {
            if(this.modalShown) {
                this.title = this.$store.state.title;
                this.author = this.$store.state.author;
            }
        }
    },

    methods: {
        getUrl() {
            const title = encodeURIComponent(this.title);
            const author = encodeURIComponent(this.author);
            const id = this.$store.state.screenplayId;

            return `/API/export/${id}/${title}/${author}`;
        },

        download() {
            const url = this.getUrl();
            window.open(url, '__blank');
        }
    },

    components: {
        modal: Modal
    }
}
</script>