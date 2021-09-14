export default function createWebSocketPlugin (socket) {
  return store => {
    const userToken = store.state.userToken
    socket.on(`${userToken}:notify`, data => {
      // TODO Invocar mutação da store para acrescentar mensagem do robo
      /**
       * Chamar essa mutação usando `store.commit('nomeDaMutacao', data)`.
       * Passar o data inteiro, a lógica será implementada na mutação.
       */
    })
  }
}