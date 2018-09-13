<template>
    <div>
        <v-toolbar dark class="toolbar">
            <v-toolbar-title class="white--text">{{name}}</v-toolbar-title>

            <v-spacer></v-spacer>
            <v-btn icon @click="editListDialog = true">
                <v-icon>edit</v-icon>
            </v-btn>
            <v-btn icon @click="deleteList">
                <v-icon>close</v-icon>
            </v-btn>
        </v-toolbar>
        <v-list class="list">
            <draggable class="draggable" v-model="notes" @start="drag=true" @end="drag=false"
                       :options="{group:'notes'}">
                <v-list-tile
                        v-for="note in notes"
                        :key="note.id"
                        class="note"
                >

                    <v-list-tile-content @click="showEditNoteModal(note)">
                        <v-list-tile-title>{{note.text}}</v-list-tile-title>
                    </v-list-tile-content>

                    <v-list-tile-action>
                        <v-icon @click="deleteNote(note.id)">close</v-icon>
                    </v-list-tile-action>
                </v-list-tile>
            </draggable>
        </v-list>
        <v-text-field
                label="Write a note"
                v-model.trim="noteTextField"
                clearable
                @keypress.enter="addNote"
        ></v-text-field>
        <v-btn round color="red" dark @click="addNote">Add note</v-btn>

        <v-dialog
                v-model="editListDialog"
                max-width="290"
        >
            <v-card>
                <v-card-title class="headline">Rename list</v-card-title>
                <v-card-text>
                    <v-text-field :label="name" v-model="listName" @keypress.enter="renameList"></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="editListDialog = false">Close</v-btn>
                    <v-btn color="blue darken-1" flat @click="renameList">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog
                v-model="editNoteDialog"
                max-width="290"
        >
            <v-card>
                <v-card-title class="headline">Edit note</v-card-title>
                <v-card-text>
                    <v-text-field v-model="currentNote.text" @keypress.enter="editNote(currentNote.id)"></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="editNoteDialog = false">Close</v-btn>
                    <v-btn color="blue darken-1" flat @click="editNote(currentNote.id)">Edit</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  components: { draggable },
  name: 'TrelloList',
  props: {
    id: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      noteTextField: '',
      editListDialog: false,
      editNoteDialog: false,
      listName: name,
      currentNote: {}
    }
  },
  computed: {
    notes: {
      get () {
        return this.$store.getters.getNotesById(this.id)
      },
      set (value) {
        this.$store.commit('updateNotes', { notes: value, id: this.id })
      }
    }
  },
  methods: {
    addNote () {
      this.$store.commit('addNote', { listId: this.id, note: this.noteTextField })
      this.noteTextField = ''
    },
    deleteNote (id) {
      this.$store.commit('deleteNote', { listId: this.id, noteId: id })
    },
    deleteList () {
      this.$store.commit('deleteList', this.id)
    },
    renameList () {
      this.$store.commit('renameList', { listId: this.id, name: this.listName })
      this.editListDialog = false
    },
    editNote (id) {
      this.$store.commit('editNote', { listId: this.id, noteId: id, value: this.currentNote.text })
      this.editNoteDialog = false
      this.currentNote = {}
    },
    showEditNoteModal (note) {
      this.currentNote = note
      this.editNoteDialog = true
    }
  }
}
</script>

<style scoped>
    .list {
        background-color: darkgrey;
    }
    .toolbar {
        background-color: #1c2940;
    }

    .note {
        min-height: 20px;
        background-color: #FFFFFF;
        color: #4d4d4d;
        margin-bottom: 10px;
        border-radius: 10px;
        font-family: 'Open Sans', sans-serif;
        font-weight: 400;
        font-size: 17px;
        cursor: pointer;
    }
</style>
