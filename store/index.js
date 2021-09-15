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
  // TODO Mudar de várias conversas para uma conversa apenas
  conversationActive: -1,
  conversations: [
    {
      avatar: 'https://robohash.org/rick-sanchez',
      name: 'Rick Sanchez',
      messages: [
        {
          content: 'Listen, Morty, I hate to break it to you but what people call "love" is just a chemical reaction that compels animals to breed. It hits hard, Morty, then it slowly fades, leaving you stranded in a failing marriage. I did it. Your parents are gonna do it. Break the cycle, Morty. Rise above. Focus on science',
          self: true,
          time: '12:55',
          actions: [
            {
              text: 'action 1',
              target: '#'
            },
            {
              text: 'action 2',
              target: '#'
            },{
              text: 'action 3',
              target: '#'
            }
          ]
        },
        {
          content: "Nobody exists on purpose. Nobody belongs anywhere. We're all going to die. Come watch TV.",
          self: false,
          time: '12:56'
        },
        {
          content: 'Lorem ipsum dolor:',
          self: false,
          time: '12:57',
          actions: [
            {
              text: 'Sit amet conseqtur',
              target: '#'
            },
          ]
        },
        {
          content: "Yay!",
          self: true,
          time: '12:59'
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
  // TODO Transformar sendMessage em uma action
  /**
   * POST message to localhost:3030/messages contendo as propriedades abaixo
   * @param {String} tokenFrom - userToken
   * @param {String} wizardId - se houver wizardId no state
   * @param {String} transport - com o valor fixo 'api'
   * @param {String} text - mensagem do usuário
   * 
   * Se houver accessToken no state, acrescentar a propriedade abaixo no headers
   * @param {String} Authorization - `Bearer ${accessToken}`
   * 
   * PS: Acho que fazer usando o axios é o mais fácil.
   */
  sendMessage(state, payload) {
    const index = state.conversationActive
    const messages = state.conversations[index].messages
    messages.push(payload)
  }
  // TODO Criar commit para receber notificação do servidor
  /**
   * O conteúdo da resposta recebida virá como:
   * @param {String} text - mensagem do bot
   * @param {String} wizardId - se um valor retornar (nulo ou string) e for diferente do registrado no state, alterar o state
   * @param {String} accessToken - se um valor retornar (nulo ou string) e for diferente do registrado no state, alterar o state
   * @param {Object} authorization.payload - se um valor retornar (nulo ou string) e for diferente do registrado no state, alterar o state
   * @param {Array} options - opções automáticas para o usuário
   */
}

export const actions = {}

export const plugins = [
  createWebSocketPlugin(socket)
]