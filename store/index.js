import randtoken from 'rand-token'
import { io } from 'socket.io-client'
import createWebSocketPlugin from '~/plugins/websocket.plugin'

const socket = io('http://localhost:3031', { transports : ['websocket'] })

if (!localStorage.userToken) {
  localStorage.userToken = randtoken.generate(16)
}

export const state = () => ({
  userToken: localStorage.userToken,
  wizardId: null,
  accessToken: null,
  payload: null,
  messageModel: {
    content: '',
    self: null,
    time: '',
    actions: []
  },
  conversationActive: -1,
  conversations: [
    {
      avatar: 'https://robohash.org/sales-buddy-bot',
      name: 'Sales Buddy Bot',
      messages: [
        // {
        //   content: 'Lorem ipsum dolor:',
        //   self: false,
        //   time: '12:57',
        //   actions: [
        //     {
        //       text: 'Sit amet conseqtur',
        //       target: '#'
        //     },
        //   ]
        // },
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
  
  registerMessage(state, payload) {
    const index = state.conversationActive
    const messages = state.conversations[index].messages
    messages.push(payload)
  },

  receiveMessage(state, data) {
    if (data.wizardId && data.wizardId !== state.wizardId) {
      state.wizardId = data.wizardId
    }
    if (data.accessToken && data.accessToken !== state.accessToken) {
      state.accessToken = data.accessToken
    }
    if (data.authorization && data.authorization.payload !== state.payload) {
      state.payload = data.authorization.payload
    }

    const message = Object.assign({}, state.messageModel)
    message.content = data.text
    message.self = false
    message.actions = Array.from(data.options)
    const today = new Date();
    const hour = today.getHours() + ":" + (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
    message.time = hour 

    const index = state.conversationActive
    const messages = state.conversations[index].messages
    messages.push(message)
  }
  
}

export const actions = {

   sendMessage({commit, state}, payload) {
    commit('registerMessage', payload)
    
    const message = {}
    message.tokenFrom = state.userToken
    if (state.wizardId) message.wizardId = state.wizardId
    message.transport = 'api'
    message.text = payload.content

    if (state.accessToken) this.$axios.setHeader('Authorization', `Bearer ${state.accessToken}`)
    this.$axios
      .post('/messages', message)
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error)
      })

  }
}

export const plugins = [
  createWebSocketPlugin(socket)
]