import React from "react";
import { clearStorage } from "../../utils/helpers";

export default function navbar() {
    const logout = (e) => {
        e.preventDefault();
        clearStorage("login");
        window.location.href = "/";
    };

    return (
        <div className="border-b px-5 py-4 w-full bg-white fixed top-0">
            <div className="flex justify-between">
                <h2>WebChat</h2>
                <button className="bg-blue-600 p-0 text-sm rounded text-white px-3 py-1 hover:bg-blue-700" onClick={(e) => logout(e)}>
                    Logout
                </button>
            </div>
        </div>
    );
}
