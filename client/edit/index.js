import Vue from 'vue';
import PortalVue from 'portal-vue';
import Vuex from 'vuex';
import contenteditable from 'vue-contenteditable'
import ScreenplayEditor from './screenplay-editor.vue';

Vue.use(PortalVue);
Vue.use(Vuex);
console.log(contenteditable);
Vue.use(contenteditable);

const store = new Vuex.Store({
    state: {
        content: [
            {
                type: 'Scene',
                text: "INT. DAY. SMALL ROOM THAT AT THE SURFACE LOOKS COZY, BUT THERE IS SOMETHING UNEASY IN HERE."
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