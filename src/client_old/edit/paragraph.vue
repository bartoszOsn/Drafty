<template lang="pug">
    contenteditable(
        ref="editable"
        v-bind="$attrs",
        v-on="$listeners"
    )
</template>

<script>
export default {
    data: function() {
        return {
            focusListener: null,
            blurListener: null
        }
    },
    mounted() {
        const elem = this.$refs.editable.$refs.element;
        this.focusListener = ()=> this.$emit('focus');
        this.blurListener = ()=> this.$emit('blur')
        elem.addEventListener('focus', this.focusListener);
        elem.addEventListener('blur', this.blurListener);
    },
    beforeDestroy() {
        const elem = this.$refs.editable.$refs.element;
        elem.removeEventListener('focus', this.focusListener);
        elem.removeEventListener('blur', this.blurListener);
    }
}
</script>