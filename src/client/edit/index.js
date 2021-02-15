import Vue from 'vue'
import Vuex from 'vuex'
import contenteditable from 'vue-contenteditable'
import ScreenplayEditor from './screenplay-editor.vue'
import storeOptions from './store'

Vue.use(Vuex);
Vue.use(contenteditable);

const store = new Vuex.Store(storeOptions);

store.commit('updateId', {
    id: location.pathname.split('/').pop()
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