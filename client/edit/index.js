import Vue from 'vue';
import PortalVue from 'portal-vue'
import ScreenplayEditor from './screenplay-editor.vue'

Vue.use(PortalVue);

const portal = new Vue({
    el: '#portal',
    template: '<portal-target name="navbar"></portal-target>'
});

const app = new Vue({
    el: '#app',
    template: '<screenplay-editor />',
    data: {
    },
    components: {
        "screenplay-editor": ScreenplayEditor
    }
  });