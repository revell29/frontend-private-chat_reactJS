import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const [data, setData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const [isError, setIsError] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      setIsError(true);
      setMessage("Password didn't match");
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/register`, {
        username: data.username,
        password: data.password,
      });
      setIsError(false);
      setMessage(`${response.data.message} now you can login`);
    } catch (error) {
      setIsError(true);
      setMessage(error.res.data.message);
    }
  };

  let msg = null;

  if (isError) {
    msg = (
      <div className="bg-red-500 text-white rounded w-7/12 sm:w-5/12 md:w-4/12 lg:w-3/12 mb-4 p-4">
        {message}
      </div>
    );
  } else {
    msg = (
      <div className="bg-green-500 text-white rounded w-7/12 sm:w-5/12 md:w-4/12 lg:w-3/12 mb-4 p-4">
        {message}
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold antialiased mb-2">WebChat</h2>
      {isError !== null && msg}
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              onChange={handleChange}
              value={data.confirmPassword}
              type="password"
              className="p-2 rounded border-0 w-full focus:outline-none bg-gray-200"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              required
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </button>
          </div>
        </form>
        <Link to="/" className="text-blue-500 pb-6">
          Login
        </Link>
      </div>
    </div>
  );
}
