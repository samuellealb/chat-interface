<template>
  <v-col cols="12" lg="8" class="conversation-area mx-auto">
    <v-row class="no-gutters flex-column" style="height: 100%">
      <v-col
        class="conversation-area__feed flex-grow-1 flex-shrink-0"
      >
        <conversation-messages
          v-for="(message, i) in messages"
          :key="i"
          :messages="messages"
          :message="message"
          :index="i"
        />
      </v-col>
      <v-col class="conversation-area__input pa-3 pt-0 flex-grow-0 flex-shrink-1">
        <v-row class="no-gutters container pa-0 mx-auto">
          <v-col col="12" lg="8" class="mx-auto">
            <v-text-field v-model="typedMessage" hide-details outlined color="primary" @keyup.enter="sendMessage(typedMessage)">
              <v-btn slot="append" :disabled="!typedMessage" color="primary" icon>
                <v-icon @click="sendMessage(typedMessage)">mdi-send</v-icon>
              </v-btn>
            </v-text-field>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import ConversationMessages from '@/components/ConversationMessages.vue'

export default {
  components: { ConversationMessages },
  data () {
    return {
      typedMessage: ''
    }
  },
  computed: {
    messages () {
      const index = this.$store.state.conversationActive
      const messages = this.$store.state.conversations[index].messages
      return messages.slice().reverse()
    },
    bottom () {
      return document.body.scrollHeight
    }
  },
  mounted () {
    this.$vuetify.goTo(this.bottom, { duration: 0})
  },
  methods: {
    sendMessage (typedMessage) {
      if (!typedMessage) return

      class Message {
        constructor(content) {
          this.content = content
          this.self = true
          const today = new Date();
          const hour = today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
          this.time = hour 
        }
      }

      const message = new Message(typedMessage)
      this.$store.dispatch('sendMessage', message)
      this.typedMessage = ''
      this.$vuetify.goTo(this.bottom)
    }
  }
}
</script>

<style lang="sass">
.conversation-area__feed
  flex-flow: column-reverse
  display: flex
  margin-bottom: 64px
.conversation-area__feed > .row
  flex-shrink: 1
  flex-grow: 0
.conversation-area__input
  position: fixed
  bottom: 0
  left: 0
  background-color: #FFFFFF
  .v-input__append-inner
    margin: auto
</style>