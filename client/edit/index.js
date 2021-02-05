import Vue from 'vue'
import PortalVue from 'portal-vue'
import Vuex from 'vuex'
import contenteditable from 'vue-contenteditable'
import ScreenplayEditor from './screenplay-editor.vue'
import storeOptions from './store'

Vue.use(PortalVue);
Vue.use(Vuex);
Vue.use(contenteditable);

const store = new Vuex.Store(storeOptions);

const portal = new Vue({
    el: '#portal',
    template: '<portal-target name="navbar"></portal-target>',
    store: store
});

const app = new Vue({
    el: '#app',
    template: '<screenplay-editor />',
    data: {
    },
    components: {
        "screenplay-editor": ScreenplayEditor
    },
    store: store
  });