<template>
  <v-col class="conversations-list mx-auto" cols="12" lg="8">
    <v-list>
      <v-list-item v-for="(conversation, i) in conversations" :key="i" class="conversation-list__item px-0" @click="openConversation(i)">
        <v-list-item-avatar>
          <v-avatar v-if="conversation.avatar" color="grey lighten-1">
            <img :src="conversation.avatar" :alt="conversation.name" />
          </v-avatar>
          <v-icon v-else>mdi-account</v-icon>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="d-flex justify-space-between">
            {{conversation.name}}
            <v-chip v-if="conversation.messages.length" x-small pill outlined color="primary">{{conversation.messages[conversation.messages.length - 1].time}}</v-chip>
          </v-list-item-title>
          <v-list-item-subtitle v-if="conversation.messages.length">{{conversation.messages[conversation.messages.length - 1].content}}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-col>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState({
      conversations: 'conversations'
    })
  },
  methods: {
    ...mapMutations({
      openConversation: 'openConversation'
    })
  }
}
</script>


<style lang="sass">
.conversation-list__item
  .chat-item
    cursor: pointer
    border-bottom: solid var(--v-secondary-lighten5) 1px
    &:last-of-type
      border-bottom: none
</style>