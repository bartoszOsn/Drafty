<template lang="pug">
    div.form-floating.has-validation
        input.form-control(
            :type="type"
            :id="inputId"
            :placeholder="placeholder"
            :class="{'is-valid': isValid && message, 'is-invalid' : !isValid && message}"
            @input="input"
            v-model="val"
        )
        label(:for="inputId") {{placeholder}}
        div(:class="isValid?'valid-feedback':'invalid-feedback'") {{message}}
</template>

<script>
export default {
    props: {
        type: String,
        placeholder: String,
        validator: Function,
        value: String
    },
    data: function(){
        return {
            id: null,
            message: null,
            dataIsValid: false,
            timeoutId: null,
            val: ''
        }
    },
    computed: {
        inputId() {
            return 'input__' + this.id;
        },
        isValid: {
            get: function() {
                return this.dataIsValid;
            },
            set: function(value) {
                if(value !== this.dataIsValid) {
                    this.dataIsValid = value;
                    this.$emit('validation-changed', value);
                }
            }
        }
    },
    methods: {
        input() {
            this.$emit('input', this.val);
            if(this.timeoutId != null) {
                clearTimeout(this.timeoutId);
            }
            this.message = null;
            this.timeoutId = setTimeout(()=> {
                //if validator returns promise, then wait for it to resolve
                //otherwise, treat returned value as validation result.
                let result = this.validator(this.val);
                if(result.then) {
                    result.then((data)=> {
                        this.isValid = data.result;
                        this.message = data.message;
                    });
                }
                else {
                    this.isValid = result.result;
                    this.message = result.message;
                }
                this.timeoutId = null;
            }, 300);
        }
    },
    mounted() {
        this.id = this._uid;
    },
    name: 'validated-textbox'
}
</script>