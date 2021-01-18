import Vue from 'vue';
import password from './password.vue';

let app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!'
    },
    components: {
        'custom-password': password
    }
  });