<template lang="pug">
    .custom-modal(v-show="shown" @click="$emit('close')")
        .modal-dialog.bg-white(@click.stop)
            .modal-content
                .modal-header
                    h5.modal-title {{title}}
                    button.btn-close(@click="$emit('close')")
                        span &times;
                .modal-body
                    slot
                .modal-footer
                        button.btn.btn-secondary(v-if="cancelButton", @click="$emit('close')") {{cancelButton}}
                        button.btn.btn-primary(v-if="confirmButton", @click="$emit('confirmed')") {{confirmButton}}
</template>

<script>
export default {
    props: {
        title: String,
        shown: {
            type: Boolean,
            default: false
        },
        confirmButton: {
            type: String,
            default: 'Ok'
        },
        cancelButton: {
            type: String,
            default: 'Cancel'
        }
    }
}
</script>

<style lang="scss" scoped>
.custom-modal {
    position: fixed;
    inset: 0;
    z-index: 99999;
    background-color: rgba(0, 0, 0, 0.5);
}
</style>