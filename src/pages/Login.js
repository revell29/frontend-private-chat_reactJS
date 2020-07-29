/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { setStorage } from '../utils/helpers';

function Login() {
  const [data, setData] = useState({
    username: '',
    password: '',
  });
  const [isError, setIsError] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/login`, {
        username: data.username,
        password: data.password,
      });
      setStorage('login', JSON.stringify(response.data));
      window.location.href = '/home';
    } catch (error) {
      setIsError(true);
      setErrMessage(error.response.data.message);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold antialiased mb-2">WebChat</h2>
      {isError && (
        <div className="bg-red-500 text-white rounded w-7/12 sm:w-5/12 md:w-4/12 lg:w-3/12 mb-4 p-4">
          {errMessage}
        </div>
      )}
      <div className="w-7/12 sm:w-5/12 md:w-4/12 lg:w-3/12 flex flex-col items-center border rounded">
        <form className="bg-white rounded px-8 pt-6 w-full" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              onChange={handleChange}
              value={data.username}
              type="text"
              className="p-2 rounded border-0 w-full focus:outline-none bg-gray-200"
              id="username"
              name="username"
              placeholder="Username"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              onChange={handleChange}
              value={data.password}
              type="password"
              className="p-2 rounded border-0 w-full focus:outline-none bg-gray-200"
              id="password"
              name="password"
              placeholder="Password"
              required
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign In
            </button>
          </div>
        </form>
        <Link to="/register" className="text-blue-500 pb-6">
          Register
        </Link>
      </div>
    </div>
  );
}

export default Login;
