import Vuex from 'vuex';

export default {
    state: {
        content: [],
        focusedParagraphIndex: null,
        loading: true,
        saving: false,
        modified: false
    },
    mutations: {
        updateContent(state, {content}) {
            state.content = content;
        },
        updateParagraph(state, {text, index}) {
            state.content[index].text = text;
        },
        insertParagraph(state, {index, type}) {
            state.content.splice(index, 0, {
                type: type,
                text: ''
            });
        },
        changeParagraphType(state, {index, type}) {
            state.content[index].type = type;
        },
        removeParagraph(state, {index}) {
            state.content.splice(index, 1);
        },
        updateFocus(state, {index}) {
            state.focusedParagraphIndex = index;
        },
        updateLoading(state, {loading}) {
            state.loading = loading;
        },
        updateSaving(state, {saving}) {
            state.saving = saving;
        }
    }
};