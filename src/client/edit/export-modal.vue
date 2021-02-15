<template lang="pug">
    modal(
        :title="'Export to PDF'"
        :confirmButton="'Download'",
        :shown="$store.state.exportModalShown",
        @close="$store.commit('updateExportModal', {shown: false})"
        )
        .mb-3
            label.form-label Title of your screenplay
            input.form-control(type="text")

        .mb-3
            label.form-label Author
            input.form-control(type="text")
        .form-text This informations are used on the title page.
</template>

<script>
import Modal from './modal.vue';
export default {
    components: {
        modal: Modal
    }
}
</script>