<template lang="pug">
    div.page.shadow.border.mx-auto.my-4(:style="pageMargins")
        loading-indicator(v-if="loading")
        template(v-else)
            editable-paragraph(
                v-for="paragraph, index in content",
                :key="index",
                ref="paragraph",
                tag="div",
                :contenteditable="true",
                :value="paragraph.text",
                :style="paragraphStyles[paragraph.type]",
                @input="updateParagraph($event, index)",
                @returned="newParagraph(index+1)",
                @focus="focused(index)",
                @keydown.tab.exact.prevent="tranformForward(index)",
                @keydown.tab.shift.exact.prevent="transformBackward(index)",
                @keydown.backspace="onBackspace($event, index)"
                
                :noNL="true",
                :noHTML="true"
            )
</template>

<script>
//TODO: navigate in script by arrows.

import pageData from './../../shared/pageData';
import lineTypes from './../../shared/lineTypes';
import editableParagraph from './paragraph.vue';
import loadingIndicator from './loadingIndicator.vue';

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
        },
        focusIndex: {
            get() {
                return this.$store.state.focusedParagraphIndex;
            },
            set(value) {
                this.$store.commit('updateFocus', {index: value});
            }
        },
        loading() {
            return this.$store.state.loading
        }
    },
    methods: {
        updateParagraph(text, index) {
            this.$store.commit('updateParagraph', {text, index});
        },
        newParagraph(index) {
            const prevType = this.$store.state.content[index-1].type;
            const nextType = lineTypes.find(t=> t.name == prevType)["next-paragraph"];

            const selection = getSelection();

            this.$store.commit('insertParagraph', {
                index: index,
                type: nextType
            });
            if(selection.type == 'Caret') {
                const pos = selection.anchorOffset;
                const text = this.$store.state.content[index - 1].text.substring(pos);
                this.$store.commit('updateParagraph', {
                        index: index-1,
                        text: this.$store.state.content[index - 1].text.substring(0, pos)
                    });
                this.$store.commit('updateParagraph', {
                        index: index,
                        text: text
                    });
            }
            this.$nextTick(()=> {
                this.$refs.paragraph[index].$refs.editable.$refs.element.focus()
            });
        },
        tranformForward(index) {
            const prevType = this.$store.state.content[index].type;
            const nextType = lineTypes.find(t=> t.name == prevType)["tab-transform"];
            this.$store.commit('changeParagraphType', {index, type: nextType});
        },
        transformBackward(index) {
            const prevType = this.$store.state.content[index].type;
            const nextType = lineTypes.find(t=> t.name == prevType)["tab-shift-transform"];
            this.$store.commit('changeParagraphType', {index, type: nextType});
        },
        onBackspace(event, index) {
            const selection = getSelection();
            if(selection.type == "Caret") {
                if(selection.anchorOffset == 0) {
                    if(index == 0) {
                        return;
                    }
                    let text = this.$store.state.content[index - 1].text;
                    const pos = text.length;
                    text += this.$store.state.content[index].text
                    this.$store.commit('updateParagraph', {
                        index: index-1,
                        text: text
                    });
                    this.$store.commit('removeParagraph', {index});
                    event.preventDefault();
                    this.$nextTick(()=> {
                        this.setCaret(this.$refs.paragraph[index - 1].$refs.editable.$refs.element, pos);
                    });
                }
            }
        },
        focused(index) {
            this.focusIndex = index;
            console.log("focused: ", this.focusIndex);
        },
        setCaret(elem, caretPos) {
            var range = document.createRange();
            var sel = window.getSelection();
            
            range.setStart(elem.childNodes[0], caretPos);
            range.collapse(true);
            
            sel.removeAllRanges();
            sel.addRange(range);
        }
    },
    components: {
        "editable-paragraph": editableParagraph,
        "loading-indicator": loadingIndicator
    }
}
</script>

<style lang="scss" scoped>

    .page {
        width: 8.5in;
        min-height: 11in;
        font-family: 'Courier Prime';
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