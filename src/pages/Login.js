/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { setStorage } from "../utils/helpers";

function Login() {
  const [data, setData] = useState({});
  const [auth, isAuth] = useState(false);
  const [errMessage, setMessage] = useState("");
  const dispatch = useDispatch();

  const login = async (e) => {
    e.preventDefault();
    await axios
      .post(`${process.env.REACT_APP_API_URL}/auth/login`, {
        username: data.username,
        password: data.password,
      })
      .then((response) => {
        setStorage("login", JSON.stringify(response.data));
        window.location.href = "/home";
        console.log(response.data);
      })
      .catch((error) => {
        let Err = error.response;
        if (Err === 401) {
          isAuth(true);
          setMessage(error.response.data.message);
          console.log(error);
        }
      });
  };
  return (
    <div className="h-screen">
      <div className="flex flex-col justify-center h-screen items-center">
        {auth ? (
          <div className="bg-red-700 text-white rounded w-full sm:w-6/12 md:w-2/5 lg:w-4/12 xl:w-1/4 p-4">
            {errMessage}
          </div>
        ) : null}
        <form className="bg-white rounded px-8 pt-6 pb-8 mb-4 w-full sm:w-6/12 md:w-2/5 lg:w-4/12 xl:w-1/4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              onChange={(e) => setData({ ...data, username: e.target.value })}
              type="text"
              className="p-2 rounded border-0 w-full focus:outline-none bg-gray-200"
              placeholder="Username"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              onChange={(e) => setData({ ...data, password: e.target.value })}
              type="password"
              className="p-2 rounded border-0 w-full focus:outline-none bg-gray-200"
              placeholder="Username"
            />
          </div>
          <div className="mb-4">
            <button
              type="button"
              onClick={(e) => login(e)}
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign In
            </button>
          </div>
        </form>
        <div className="flex-none">
          <Link to="/register" className="text-blue-500">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
