import Vue from 'vue';
import ScreenplayEditor from './screenplay-editor.vue'

const app = new Vue({
    el: '#app',
    template: '<screenplay-editor />',
    data: {
        showPassword: false,
        username: '',
        password: ''
    },
    components: {
        "screenplay-editor": ScreenplayEditor
    }
  });