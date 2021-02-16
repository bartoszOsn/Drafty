<template lang="pug">
    .mb-2.row
        .col-10
            div.py-2.px-3.border-bottom.border-primary.text-truncate(v-if="!editing")
                span {{title}}
            input.form-control(ref="input", v-else, v-model="newName", @blur="blur", @keyup.enter="blur")
        button.btn.btn-sm.col-2(@click="edit")
            span.fas.fa-edit.my-auto.ps-0
</template>

<script>
export default {
    data() {
        return {
            editing: false,
            newName: ''
        };
    },

    computed: {
        title() {
            return this.$store.state.title;
        }
    },

    methods: {
        blur() {
            this.editing = false;
            if(this.newName == this.title) {
                return;
            }
            fetch(`/API/screenplay/rename/${this.$store.state.screenplayId}`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({title: this.newName})
            });
            this.$store.commit('updateTitlepage', {title: this.newName});
        },

        edit() {
            this.editing = true;
            this.newName = this.title;
            this.$nextTick(()=> this.$refs.input.focus());
        }
    }
}
</script>