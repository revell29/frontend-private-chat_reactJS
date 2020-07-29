const showImage = (data, urlFile, text) => {
  return {
    type: "SHOW_IMAGE",
    action: data,
    url: urlFile,
    text: text,
  };
};

const loginUser = (data) => {
  return {
    type: "LOGIN",
    action: data,
  };
};

const switchConversation = (userId, roomId) => {
  return {
    type: "SWITCH_CHAT",
    payload: { user_id: userId, room: roomId },
  };
};

const saveMessage = (data) => {
  return {
    type: "SAVE_MESSAGE",
    payload: data,
  };
};

const hideListUser = (data) => {
  return {
    type: "HIDE_LIST_CHAT",
    payload: data,
  };
};

export { showImage, loginUser, switchConversation, saveMessage, hideListUser };
