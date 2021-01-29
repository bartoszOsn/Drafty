<template lang="pug">
    radio-menu(:options="lineTypes.map(t => t.name)")
</template>

<script>
import lineTypes from './../../shared/lineTypes';
import RadioMenu from './radio-menu.vue'

export default {
    data: function() {
        return {
            lineTypes
        }
    },
    components: {
        'radio-menu': RadioMenu
    }
}
</script>