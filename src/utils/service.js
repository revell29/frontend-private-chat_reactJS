import axios from "axios";

export function getUserList(name, page) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/users/${name}?page=${page}`)
      .then((response) => {
        return resolve(response.data.data.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
