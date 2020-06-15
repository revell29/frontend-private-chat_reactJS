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

export { showImage, loginUser };
