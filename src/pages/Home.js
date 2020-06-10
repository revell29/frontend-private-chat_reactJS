/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { getStorage } from "../utils/helpers";
import SocketIo from "socket.io-client";
import ChatBox from "../components/Home/ChatBox";
import DefaultChat from "../assets/DefaultChat.svg";
import { WebNotif } from "../utils/Notification";
import Avatar from "react-avatar";
import Navbar from "../components/Home/Navbar";

let socket;

export default function Home(props) {
    const [dataUser, setDataUser] = useState([]);
    const [name, setName] = useState("");
    const [selectedUser, setSelectUser] = useState("");
    const [message, setMessage] = useState("");
    const [dataMessages, setDataMessages] = useState([]);
    const [roomId, setRoom] = useState("");
    const [userId, setUserId] = useState("");
    const [receivedUser, setReceivedUser] = useState("");
    const [openedChat, setOpenedChat] = useState(false);

    const getUser = async (username) => {
        axios.get(`${process.env.REACT_APP_API_URL}/users/${username}`).then((response) => {
            setDataUser(response.data.data);
        });
    };

    const getMessage = async (from, to) => {
        await axios
            .post(`${process.env.REACT_APP_API_URL}/room/data/${roomId}`, {
                from: from,
                to: to,
                rid: roomId,
            })
            .then((response) => {
                // if (response.data.data.length > 0) {
                setDataMessages(response.data.data);
                console.log(response.data.data);
                // }
            });
    };

    const craeteRoom = async (from, to) => {
        await axios
            .post(`${process.env.REACT_APP_API_URL}/room`, {
                from: from,
                to: to,
                rid: roomId,
            })
            .then((response) => {
                setDataMessages(response.data.messages);
                setRoom(response.data._id);
                socket.emit("join", response.data._id);
            });
    };

    useEffect(() => {
        const dataStorage = getStorage("login");
        const dataStorage2 = JSON.parse(dataStorage);
        setName(dataStorage2.data.username);
        setUserId(dataStorage2.data._id);
        getUser(dataStorage2.data.username);
        socket = SocketIo.connect(`${process.env.REACT_APP_SOCKET_URL}`, {
            query: {
                username: dataStorage2.data.username,
            },
        });
    }, []);

    useEffect(() => {
        socket.on("new message", (data) => {
            console.log(data);
            WebNotif(data.from, data.message);
            setDataMessages((dataMessages) => [...dataMessages, data]);
        });

        socket.on("received", (data) => {
            setDataMessages((dataMessages) => [...dataMessages, data]);
        });
    }, []);

    const selectUser = (e, id, username) => {
        socket.emit("changeRoom", {
            user: userId,
            rid: roomId,
        });
        setRoom("");
        e.preventDefault();
        setSelectUser(id);
        setOpenedChat(true);
        setReceivedUser(username);
        craeteRoom(userId, id);
    };

    const sendMessage = async (event) => {
        console.log("test");
        if (event.key === "Enter") {
            if (!event.nativeEvent.shiftKey) {
                if (message) {
                    await axios
                        .post(`${process.env.REACT_APP_API_URL}/message`, {
                            from: name,
                            to: receivedUser,
                            message: message,
                            author: userId,
                            rid: roomId,
                        })
                        .then((response) => {
                            // getMessage(name, selectedUser);
                            setMessage("");
                        });

                    socket.emit("send message", {
                        from: name,
                        to: receivedUser,
                        message: message,
                        author: userId,
                        rid: roomId,
                    });
                    socket.emit("received", {
                        from: name,
                        to: receivedUser,
                        message: message,
                        author: userId,
                        rid: roomId,
                    });
                }
            }
        }
    };

    return (
        <>
            <Navbar />
            <div className="flex h-screen pt-16">
                <div className="w-2/5 bg-white border-r border-b h-full" style={{ overflow: "auto" }}>
                    {dataUser.map((item, key) => (
                        <div className="flex flex-start border-b items-center p-5 w-full cursor-pointer" key={key} onClick={(e) => selectUser(e, item._id, item.username)}>
                            <Avatar googleId="118096717852922241760" name={item.username} size="50" round={true} />
                            <div className="flex flex-col ml-4">
                                <div className="w-full">{item.username}</div>
                                <small>Online</small>
                            </div>
                        </div>
                    ))}
                </div>
                {openedChat ? (
                    <div className="mx-auto w-full relative bg-white">
                        <ChatBox messages={dataMessages} name={name} />
                        <div className=" w-full h-15 bg-white shadow-lg border-t absolute" style={{ bottom: "0px" }}>
                            <div className="flex">
                                <input
                                    type="text"
                                    onKeyPress={(event) => (event.key === "Enter" ? sendMessage(event) : null)}
                                    name="message"
                                    value={message}
                                    onChange={({ target: { value } }) => setMessage(value)}
                                    className="focus:outline-none w-full m-2 h-10 px-4 mr-1 rounded-full border border-gray-300 bg-gray-200 resize-none text-sm"
                                    placeholder="Type a message"
                                />
                                <button className="m-2">
                                    <svg
                                        className="svg-inline--fa text-green-400 fa-paper-plane fa-w-16 w-12 h-12 py-2 mr-2"
                                        aria-hidden="true"
                                        focusable="false"
                                        data-prefix="fas"
                                        data-icon="paper-plane"
                                        role="img"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col mx-auto w-full relative bg-white h-full items-center justify-center">
                        <div className="bg-red-500 rounded-full p-10 h-auto flex items-center justify-center">
                            <img src={DefaultChat} className="h-20 w-20" />
                        </div>
                        <h2 className="text-2xl text-gray-700 mt-5">Start chat with other member</h2>
                    </div>
                )}
            </div>
        </>
    );
}
