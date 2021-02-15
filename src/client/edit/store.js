export default {
    state: {
        content: [],
        focusedParagraphIndex: null,
        loading: true,
        saving: false,
        modified: false,
        screenplayId: null,
        exportModalShown: false
    },
    mutations: {
        updateContent(state, {content}) {
            state.content = content;
            state.modified = true;
        },
        updateParagraph(state, {text, index}) {
            state.content[index].text = text;
            state.modified = true;
        },
        insertParagraph(state, {index, type}) {
            state.content.splice(index, 0, {
                type: type,
                text: ''
            });
            state.modified = true;
        },
        changeParagraphType(state, {index, type}) {
            state.content[index].type = type;
            state.modified = true;
        },
        removeParagraph(state, {index}) {
            state.content.splice(index, 1);
            state.modified = true;
        },
        updateFocus(state, {index}) {
            state.focusedParagraphIndex = index;
        },
        updateLoading(state, {loading}) {
            state.loading = loading;
        },
        updateSaving(state, {saving}) {
            state.saving = saving;
        },
        resetModified(state) {
            state.modified = false;
        },
        updateId(state, {id}) {
            state.screenplayId = id;
        },
        updateExportModal(state, {shown}) {
            state.exportModalShown = shown;
        }
    }
};