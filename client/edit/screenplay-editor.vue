<template lang="pug">
    .editor
        portal(to="navbar")
            //p This is just some test fo' fuck's sake.
            radio-menu(:options="lineTypes.map(t => ({text: t.name, icon: t.icon}))", v-model="lineType")
        //portal-target(name="navbar")
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
</style>