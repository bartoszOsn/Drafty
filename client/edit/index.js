import Vue from 'vue';
import PortalVue from 'portal-vue';
import Vuex from 'vuex';
import contenteditable from 'vue-contenteditable'
import ScreenplayEditor from './screenplay-editor.vue';

Vue.use(PortalVue);
Vue.use(Vuex);
Vue.use(contenteditable);

const store = new Vuex.Store({
    state: {
        content: [
            {
                type: 'Scene',
                text: "Int. Day. Small room that at the surface looks cozy, but there is something uneasy in here."
            },
            {
                type: 'Action',
                text: "At the bet sits little KID and, as it looks like at first glance, laughs. But if someone would watch longer, he would understand, that the kid actually cries."
            }
        ]
    },
    mutations: {
        updateParagraph(state, {text, index}) {
            state.content[index].text = text;
        },
        insertParagraph(state, {index, type}) {
            state.content.splice(index, 0, {
                type: type,
                text: ''
            });
        }
    }
})

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