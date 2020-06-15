let user = JSON.parse(localStorage.getItem("login"));
const initialState = {
  openModal: false,
  url: "",
  text: "",
  isLogin: false,
  user: user ? user.data : {},
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
    default:
      return state;
  }
};

export default reducer;
