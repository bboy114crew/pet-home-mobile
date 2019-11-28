export const pushNotification = (notification) => {
  return {
    type: "PUSH",
    payload: notification
  }
}

export const clearNotification = () => {
  return {
    type: "CLEAR"
  }
}