/* eslint-disable no-unused-expressions */
/* eslint-disable no-fallthrough */
let user = JSON.parse(localStorage.getItem("login"));
const initialState = {
  openModal: false,
  url: "",
  text: "",
  isLogin: false,
  user: user ? user.data : {},
  room_chat: [],
  message: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_IMAGE":
      return {
        ...state,
        openModal: action.action,
        url: action.url,
        text: action.text,
      };
    case "LOGIN":
      return {
        isLogin: action.action,
      };
    case "SWITCH_CHAT":
      return {
        ...state,
        room_chat: [...state.room_chat, action.payload],
      };

    case "SAVE_MESSAGE":
      return {
        ...state,
        message: state.message.concat(action.payload),
      };
    default:
      return state;
  }
};

export default reducer;
