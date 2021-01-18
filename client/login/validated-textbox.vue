<template lang="pug">
    div.form-floating.m-3
        input.form-control(:type="type" :id="inputId" :placeholder="placeholder")
        label(:for="inputId") {{placeholder}}
</template>

<script>
export default {
    props: {
        type: String,
        placeholder: String
    },
    data: function(){
        return {
            id: null
        }
    },
    computed: {
        inputId() {
            return 'input__' + this.id;
        }
    },
    mounted() {
        this.id = this._uid;
    },
    name: 'validated-textbox'
}
</script>