/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
    const [data, setData] = useState({});

    var submit = async (e) => {
        e.preventDefault();
        console.log("test");
        await axios
            .post(`${process.env.REACT_APP_API_URL}/auth/register`, {
                username: data.username,
                password: data.password,
            })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => console.log(error));
    };

    return (
        <div className="h-screen">
            <div className="flex flex-col justify-center h-screen items-center">
                <form className="bg-white rounded px-8 pt-6 pb-8 mb-4 w-full sm:w-6/12 md:w-2/5 lg:w-4/12 xl:w-1/4" onSubmit={(e) => submit(e)}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                        <input
                            onChange={(e) => setData({ ...data, username: e.target.value })}
                            type="text"
                            name="username"
                            className="p-2 rounded border-0 w-full focus:outline-none bg-gray-200"
                            placeholder="Username"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input
                            onChange={(e) => setData({ ...data, password: e.target.value })}
                            type="password"
                            name="password"
                            className="p-2 rounded border-0 w-full focus:outline-none bg-gray-200"
                            placeholder="Username"
                        />
                    </div>
                    <div className="mb-4">
                        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Sign Up
                        </button>
                    </div>
                </form>
                <div className="flex-none">
                    <Link to="/" className="text-blue-500">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
