import Vue from 'vue';
import validatedTextbox from './validated-textbox.vue';

const {isPasswordValid} = require('./../../shared/validation');

let app = new Vue({
    el: '#app',
    data: {
        validateUsername(username) {
            return fetch('../API/validate_login', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    data: username
                }) 
            })
                .then(res=>res.json());
        },
        validatePassword(password) {
            return isPasswordValid(password)
        },
        showPassword: false
    },
    components: {
        'validated-textbox': validatedTextbox
    }
  });