<template lang="pug">
    div.form-floating.has-validation
        input.form-control(
            :type="type"
            :id="inputId"
            :placeholder="placeholder"
            :class="{'is-valid': isValid && message, 'is-invalid' : !isValid && message}"
            @input="input"
            v-model="value"
        )
        label(:for="inputId") {{placeholder}}
        div(:class="isValid?'valid-feedback':'invalid-feedback'") {{message}}
</template>

<script>
export default {
    props: {
        type: String,
        placeholder: String,
        validator: Function
    },
    data: function(){
        return {
            id: null,
            message: null,
            isValid: false,
            timeoutId: null,
            value: ''
        }
    },
    computed: {
        inputId() {
            return 'input__' + this.id;
        }
    },
    methods: {
        input() {
            if(this.timeoutId != null) {
                clearTimeout(this.timeoutId);
            }
            this.message = null;
            this.timeoutId = setTimeout(()=> {
                //if validator returns promise, then wait for it to resolve
                //otherwise, treat returned value as validation result.
                let result = this.validator(this.value);
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