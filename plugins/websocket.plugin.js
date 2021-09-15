/* eslint-disable no-console */
export default function createWebSocketPlugin (socket) {
  return store => {
    const userToken = store.state.userToken
    socket.on(`${userToken}:notify`, data => {
      store.commit('receiveMessage', data)
    })
  }
}