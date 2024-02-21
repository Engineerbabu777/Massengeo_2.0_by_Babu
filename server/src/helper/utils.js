export const findImageMessage = (messageType,data) => {
  // SWITCH FOR IMAGE!
  switch (messageType) {
    case 'text':
      return null
    case 'image':
      return data.image
    case 'image-text':
      return data.image
    default:
      null
  }
}
