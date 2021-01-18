import Vue from 'vue';
import password from './validated-textbox.vue';

let app = new Vue({
    el: '#app',
    data: {
    },
    components: {
        'validated-textbox': password
    }
  });