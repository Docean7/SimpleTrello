import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    listId: 0,
    notesId: 0,
    lists: []
  },
  mutations: {
    /**
     //    * @param {string} name
     //    */
    addList (state, name) {
      state.lists.push({ id: state.listId, name: name, notes: [] })
      state.listId += 1
    },

    addNote (state, payload) {
      let index = state.lists.findIndex(l => l.id === payload.listId)
      state.lists[index].notes.push({ id: state.notesId, text: payload.note })
      state.notesId += 1
    },

    updateNotes (state, payload) {
      let index = state.lists.findIndex(l => l.id === payload.id)
      state.lists[index].notes = payload.notes
    },

    deleteNote (state, payload) {
      let index = state.lists.findIndex(l => l.id === payload.listId)
      state.lists[index].notes.splice(state.lists[index].notes.findIndex(note => note.id === payload.noteId), 1)
    },

    deleteList (state, id) {
      state.lists.splice(state.lists.findIndex(l => l.id === id), 1)
    },

    renameList (state, payload) {
      let index = state.lists.findIndex(l => l.id === payload.listId)
      let old = state.lists[index]
      state.lists.splice(index, 1, { id: old.id, name: payload.name, notes: old.notes })
    },

    editNote (state, payload) {
      let listIndex = state.lists.findIndex(l => l.id === payload.listId)
      let noteIndex = state.lists[listIndex].notes.findIndex(n => n.id === payload.noteId)
      let oldNote = state.lists[listIndex].notes[noteIndex]
      state.lists[listIndex].notes.splice(noteIndex, 1, { id: oldNote.id, text: payload.value })
    }
  },
  getters: {
    getNotesById: state => id => {
      let index = state.lists.findIndex(l => l.id === id)
      return state.lists[index].notes
    }
  }
})
