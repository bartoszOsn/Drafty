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
        validateEmail(email) {
            if(email.match(/^\S+@\S+\.\S+$/)) {
                return {
                    result: true,
                    message: " "
                };
            }
            return {
                result: false,
                message: "This is not valid E-mail address."
            };
        },
        showPassword: false,
        password: '',
        validUsername: false,
        validPassword: false,
        validEmail: false,
        validConfirmPassword: false
    },
    created() {
        this.confirmPasswordValidation = (confirmPassword) => {
            if(this.password == confirmPassword) {
                return {
                    result: true,
                    message: ' '
                }
            }
            else {
                return {
                    result: false,
                    message: 'Type the same password as above!'
                }
            }
        };
    },
    components: {
        'validated-textbox': validatedTextbox
    }
  });