export const state = () => ({
  conversationActive: -1,
  conversations: [
    {
      avatar: 'https://robohash.org/rick-sanchez',
      name: 'Rick Sanchez',
      messages: [
        {
          content: 'Listen, Morty, I hate to break it to you but what people call "love" is just a chemical reaction that compels animals to breed. It hits hard, Morty, then it slowly fades, leaving you stranded in a failing marriage. I did it. Your parents are gonna do it. Break the cycle, Morty. Rise above. Focus on science',
          self: true,
          time: '12:55'
        },
        {
          content: "Nobody exists on purpose. Nobody belongs anywhere. We're all going to die. Come watch TV.",
          self: false,
          time: '12:56'
        },
      ]
    },
    {
      avatar: 'https://robohash.org/pantaleon-pantoja',
      name: 'Pantaleon Pantoja',
      messages: [
      ]
    },
    {
      avatar: 'https://robohash.org/ursula-buendia',
      name: 'Úrsula Buendía',
      messages: [
      ]
    }
  ]
})

export const mutations = {
  openConversation(state, payload) {
    state.conversationActive = payload
  },

  closeConversation(state) {
    state.conversationActive = -1
  },

  sendMessage(state, payload) {
    const index = state.conversationActive
    const messages = state.conversations[index].messages
    messages.push(payload)
  }
}