<template>
  <v-col cols="12" lg="8" class="conversation-area mx-auto">
    <v-row class="no-gutters flex-column" style="height: 100%">
      <v-col
        class="conversation-area__feed flex-grow-1 flex-shrink-0"
      >
        <v-row
          v-for="(message, i) in messages"
          :key="i"
          class="no-gutters py-2"
        >
          <v-col
            cols="auto"
            style="max-width: 75%;"
            :class="message.self ? 'ml-auto' : 'mr-auto'"
            class="conversation-area__card"
          >
            <v-card class="conversation-area__baloon pa-4 pb-2" :class="message.self ? 'conversation-area__baloon--self' : 'conversation-area__baloon--other'">
              {{message.content}}
              <v-card-actions class="pa-0">
                <span class="conversation-area__time-label" :class="message.self ? 'text-right' : ''">
                  {{message.time}}
                </span>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col class="conversation-area__input pa-3 pt-0 flex-grow-0 flex-shrink-1">
        <v-row class="no-gutters container pa-0 mx-auto">
          <v-col col="12" lg="8" class="mx-auto">
            <v-text-field v-model="typedMessage" hide-details color="primary" @keyup.enter="sendMessage(typedMessage)">
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
export default {
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
      this.$store.commit('sendMessage', message)
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
.conversation-area__baloon
  border-radius: 20px!important  
.conversation-area__baloon--self
  background-color: var(--v-primary-base)!important
  border-bottom-right-radius: 0!important
  color: #FFFFFF!important
.conversation-area__baloon--other
  background-color: var(--v-secondary-lighten2)!important
  border-bottom-left-radius: 0!important
  color: #FFFFFF!important
.conversation-area__time-label
  width: 100%
  font-weight: 300
  font-style: italic
  font-size: 0.75rem

</style>