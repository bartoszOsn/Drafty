import Vuex from 'vuex';

export default {
    state: {
        content: [
            {
                type: 'Scene',
                text: "Int. Day. Small room that at the surface looks cozy, but there is something uneasy in here."
            },
            {
                type: 'Action',
                text: "At the bet sits little KID and, as it looks like at first glance, laughs. But if someone would watch longer, he would understand, that the kid actually cries."
            }
        ],
        focusedParagraphIndex: null,
        loading: false
    },
    mutations: {
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
        }
    }
};