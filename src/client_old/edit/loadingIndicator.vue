<template lang="pug">
    p.loader {{truncatedText}}
</template>

<script>
export default {
    data() {
        return {
            text: 'Loading...',
            writtenCharacters: 6,
            writeSpeed: 300,
            idleSpeed: 1000,
            deleteSpeed: 100,
            deleting: false,
            interval: null,
            callback: null
        };
    },
    computed: {
        truncatedText() {
            return this.text.substring(0, this.writtenCharacters);
        }
    },
    mounted() {
        this.callback = ()=> {
            if(!this.deleting) {
                if(this.writtenCharacters < this.text.length) {
                    this.writtenCharacters++;
                    this.interval = setTimeout(this.callback, this.writeSpeed);
                }
                else {
                    this.deleting = true;
                    this.interval = setTimeout(this.callback, this.idleSpeed);
                }
            }
            else {
                if(this.writtenCharacters > 0) {
                    this.writtenCharacters--;
                    this.interval = setTimeout(this.callback, this.deleteSpeed);
                }
                else {
                    this.deleting = false;
                    this.interval = setTimeout(this.callback, this.idleSpeed);
                }
            }
            
        }
        this.callback();
    },
    beforeDestroy() {
        clearTimeout(this.interval);
    }
}
</script>

<style lang="scss" scoped>
.loader {
    font-size: 2rem;
}
</style>