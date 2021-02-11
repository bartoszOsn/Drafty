<template lang="pug">
    button.btn.btn-primary(:disabled="saving || !canSave" v-on="$listeners")
        span.content(:style="{opacity: saving?0:1}")
            slot
        div.overlay.d-flex.justify-content-center.align-items-center(:style="{opacity: saving?1:0}")
            .spinner-border.spinner-border-sm
</template>

<script>
export default {
    props: {
        canSave: Boolean,
        saving: Boolean
    }
}
</script>

<style lang="scss" scoped>
.btn {
    position: relative;
}

.content, .overlay {
    transition: opacity 0.2s;
}

.overlay {
    position: absolute;
    inset: 0;
}
</style>