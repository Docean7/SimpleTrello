<template>
    <div class="wrapper">
        <div class="listAdder">
            <v-text-field
                    label="List name"
                    v-model.trim="listTextField"
                    clearable
                    @keypress.enter="addList"
            ></v-text-field>
            <v-btn round color="red" dark @click="addList">Add list</v-btn>
        </div>
        <div class="lists">
            <TrelloList v-for="list in lists" :key="list.id" :id="list.id" :name="list.name"></TrelloList>
        </div>
    </div>
</template>

<script>

import TrelloList from '@/components/TrelloList'

export default {
  name: 'TrelloBoard',
  components: { TrelloList },
  data () {
    return {
      listTextField: ''
    }
  },
  computed: {
    lists () {
      return this.$store.state.lists
    }
  },
  methods: {
    addList () {
      this.$store.commit('addList', this.listTextField)
      this.listTextField = ''
    }
  }
}
</script>

<style scoped>
    .wrapper {
        display: grid;
        grid-template: repeat(4, 1fr)/repeat(12, 1fr);
        grid-row-gap: 5em;
    }
    .listAdder {
        grid-row: 1/2;
        grid-column:2/-2 ;
    }
    .lists {
        justify-content: center;
        position: relative;
        grid-row: 2/-1;
        grid-column: 2/-2;
        display: grid;
        grid-template: 1fr/repeat(auto-fit, minmax(400px, .2fr));
        grid-gap: 5em;
    }
</style>
