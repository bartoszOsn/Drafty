<template lang="pug">
    div.page.shadow.border.mx-auto.my-4(:style="pageMargins")
        contenteditable(
            v-for="paragraph, index in content",
            :key="index"
            ref="paragraph"
            tag="div",
            :contenteditable="true",
            :value="paragraph.text",
            :style="paragraphStyles[paragraph.type]"
            @input="updateParagraph($event, index)"
            @returned="newParagraph(index+1)"
            :noNL="true",
            :noHTML="true"
        )
</template>

<script>
import pageData from './../../shared/pageData';
import lineTypes from './../../shared/lineTypes';

function toCSS(lineType) {
    return {
        'text-align': lineType['text-align'],
        'margin': lineType.margin.map((t,i)=> t + ((i%2 == 0)?'rem':'in')).join(' '),
        'text-transform': lineType.uppercase?'uppercase':'none'
    };
}

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
            },
            paragraphStyles: lineTypes.reduce((res, val)=> ({...res, [val.name]: toCSS(val)}), {})
        }
    },
    computed: {
        content() {
            return this.$store.state.content;
        }
    },
    methods: {
        updateParagraph(text, index) {
            this.$store.commit('updateParagraph', {text, index});
        },
        newParagraph(index) {
            this.$store.commit('insertParagraph', {
                index: index,
                type: "Dialogue"
                }
            );
            setTimeout(()=>this.$refs.paragraph[index].$refs.element.focus(), 0);
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