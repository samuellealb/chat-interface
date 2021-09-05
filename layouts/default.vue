<template>
  <v-app>
    <v-app-bar
      clipped-left
      fixed
      app
      color="primary"
    >
      <v-icon v-if="conversationActive >= 0" color="white" @click="closeConversation">mdi-arrow-left</v-icon>
      <v-spacer />
      <v-toolbar-title class="white--text font-weight-bold" v-text="activeTitle" />
      <v-spacer />
      <v-icon color="white" @click="drawer = !drawer">mdi-cog-outline</v-icon>
    </v-app-bar>
    <v-main>
      <v-container style="height: 100%">
        <Nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="drawer"
      right
      fixed
      temporary
    >
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i">
          <v-list-item-action>
            <v-icon>
              {{item.icon}}
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>{{item.title}}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data () {
    return {
      appTitle: 'Sales Buddy',
      drawer: false,
      items: [
        {
          icon: 'mdi-account',
          title: 'User profile',
          to: '#'
        }
      ],
    } 
  },
  computed: {
    ...mapState({
      conversationActive: 'conversationActive',
      conversations: 'conversations'
    }),
    activeTitle () {
      if (this.conversationActive === -1) {
        return this.appTitle
      } else {
        return this.conversations[this.conversationActive].name
      }
    }
  },
  methods: {
    ...mapMutations({
      closeConversation: 'closeConversation'
    })
  }
}
</script>
