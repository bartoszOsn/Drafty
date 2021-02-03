<template lang="pug">
    div.page.shadow.border.mx-auto.my-4(:style="pageMargins")
        contenteditable(tag="div", :contenteditable="true", v-model="test", :noNL="true", :noHTML="true")
        contenteditable(tag="div", :contenteditable="true", v-model="test2", :noNL="true", :noHTML="true")
</template>

<script>
import pageData from './../../shared/pageData';
export default {
    data() {
        return {
            test: 'Hello',
            test2: 'Hello',
            pageMargins: {
                'padding-top': pageData.margin[0] + 'in',
                'padding-right': pageData.margin[1] + 'in',
                'padding-bottom': pageData.margin[2] + 'in',
                'padding-left': pageData.margin[3] + 'in',
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .page {
        width: 8.5in;
        min-height: 11in;
        font-family: 'Courier New', Courier, monospace;
        font-size: 12pt;
    }

    div[contenteditable] {
        &:hover {
            background-color: rgba(255, 255, 0, 0.1);
        }
        &:focus {
            background-color: rgba(255, 255, 0, 0.2);
        }
        
    }
</style>