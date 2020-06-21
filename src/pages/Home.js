/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import axios from "axios";
import SocketIo from "socket.io-client";
import ChatBox from "../components/Home/ChatBox";
import DefaultChat from "../assets/DefaultChat.svg";
import Attach from "../assets/attach.svg";
import { WebNotif } from "../utils/Notification";
import Navbar from "../components/Home/Navbar";
import UploadFile from "../components/Home/UploadFile";
import ModalImage from "../components/Home/ModalImage";
import UserList from "../components/Home/UserList";
import { useSelector, useDispatch } from "react-redux";
import { showImage, switchConversation, saveMessage } from "../redux/action";
import InfiniteScroll from "react-infinite-scroll-component";
import { getUserList } from "../utils/service";
import BeatLoader from "react-spinners/BeatLoader";

let socket;

export default function Home(props) {
  const [dataUser, setDataUser] = useState([]);
  const name = useSelector((state) => state.user.username);
  const [selectedUser, setSelectUser] = useState("");
  const [message, setMessage] = useState("");
  const [dataMessages, setDataMessages] = useState([]);
  const [roomId, setRoom] = useState("");
  const [userId, setUserId] = useState("");
  const [receivedUser, setReceivedUser] = useState("");
  const [openedChat, setOpenedChat] = useState(false);
  const [activeIndex, setActiveIndex] = useState("");
  const [openFile, setOpenFile] = useState(false);
  const [fileSeleted, setFile] = useState("");
  const openImage = useSelector((state) => state.openModal);
  const files = useSelector((state) => state);
  const roomChat = useSelector((state) => state.room_chat);
  const stateMessage = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  async function createRoom(from, to) {
    await dispatch(showImage(false));
    await axios
      .post(`${process.env.REACT_APP_API_URL}/room`, {
        from: from,
        to: to,
        rid: roomId,
      })
      .then((response) => {
        if (response.data.messages) {
          setDataMessages(response.data.messages);
        } else {
          setDataMessages([]);
        }
        setRoom(response.data._id);
        socket.emit("join", response.data._id);
        dispatch(switchConversation(to, response.data._id));
        dispatch(saveMessage(response.data.messages));
      });
  }

  function handleFile(data) {
    setFile(data);
  }

  function selectUser(e, id, username, key) {
    e.preventDefault();
    socket.emit("changeRoom", {
      user: userId,
      rid: roomId,
    });
    setRoom("");
    setSelectUser(id);
    setOpenFile(false);
    setOpenedChat(true);
    setActiveIndex(key);
    setReceivedUser(username);
    const checkUser = roomChat.find((i) => i.user_id === id);
    if (!checkUser) {
      createRoom(userId, id);
    } else {
      setRoom(checkUser.room);
      const dataMessage = [];
      stateMessage.map((i) => {
        if (i.from === name && i.to === username) {
          dataMessage.push(i);
        }
      });
      socket.emit("join", checkUser.room);
      setDataMessages(dataMessage);
    }
  }

  function getUser() {
    setPage(page + 1);
    setLoading(true);
    getUserList(name, page)
      .then((response) => {
        setTimeout(() => {
          setDataUser(dataUser.concat(response));
          setLoading(false);
        }, 400);
      })
      .catch((error) => console.log(error));
  }

  function typing(event) {
    if (event.key === "Enter") {
      if (!event.nativeEvent.shiftKey) {
        sendMessage(event);
      }
    }
  }

  async function postMessage(data) {
    const formData = new FormData();
    formData.append("from", data.from);
    formData.append("to", data.to);
    formData.append("message", data.message);
    formData.append("author", data.author);
    formData.append("rid", data.roomId);
    formData.append("files", fileSeleted);
    await axios
      .post(`${process.env.REACT_APP_API_URL}/message`, formData, {
        onUploadProgress: function (progressEvent) {
          let percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        },
      })
      .then((response) => {
        dispatch(saveMessage(response.data.data));
        setTimeout(() => {
          setMessage("");
          setOpenFile(false);
          setFile("");
          setProgress(0);
          setLoading(false);
          socket.emit("send message", {
            from: response.data.data.from,
            to: response.data.data.to,
            message: response.data.data.message,
            author: response.data.data.author,
            rid: response.data.data.rid,
            files: response.data.data.files,
          });
          socket.emit("received", {
            from: response.data.data.from,
            to: response.data.data.to,
            message: response.data.data.message,
            author: response.data.data.author,
            rid: response.data.data.rid,
            files: response.data.data.files,
          });
        }, 100);
      });
  }

  useEffect(() => {
    async function init() {
      setUserId(files.user._id);
      await getUser();
    }
    init();
  }, []);

  useEffect(() => {
    socket = SocketIo.connect(`${process.env.REACT_APP_SOCKET_URL}`, {
      transports: ["websocket"],
      query: {
        username: name,
      },
    });
  }, []);

  useEffect(() => {
    socket.on("new message", (data) => {
      WebNotif(data.from, data.message);
      setDataMessages((dataMessages) => [...dataMessages, data]);
    });

    socket.on("received", (data) => {
      setDataMessages((dataMessages) => [...dataMessages, data]);
    });

    return () => {
      setProgress(0);
    };
  }, []);

  async function sendMessage(event) {
    if (message) {
      setLoading(true);
      let data = {
        from: name,
        to: receivedUser,
        message: message,
        author: userId,
        roomId: null,
      };
      const checkUser = roomChat.find((i) => i.user_id === selectedUser);
      if (!checkUser) {
        data.roomId = roomId;
        postMessage(data);
      } else {
        data.roomId = checkUser.room;
        postMessage(data);
      }
    }
  }

  return (
    <>
      <Navbar />
      <div className="flex h-screen pt-16">
        <div
          id="userList"
          className="w-2/5 bg-white border-r border-b h-full user-list"
          style={{ overflow: "auto" }}
        >
          <InfiniteScroll
            dataLength={dataUser.length}
            next={getUser}
            scrollableTarget="userList"
            hasMore={true}
            loader={
              <div className="w-full flex justify-center items-center p-5">
                <BeatLoader size={14} color={"#123abc"} loading={loading} />
              </div>
            }
          >
            {dataUser.map((item, key) => (
              <UserList
                item={item}
                key={key}
                number={key}
                userClick={selectUser.bind(this)}
                activeIndex={activeIndex}
              />
            ))}
          </InfiniteScroll>
        </div>
        {openedChat ? (
          <div className="mx-auto w-full relative bg-white chat-box">
            <ModalImage dataFile={files} openImage={openImage} />
            <ChatBox messages={dataMessages} name={name} />
            <div
              className=" w-full h-15 bg-white shadow-lg border-t absolute"
              style={{ bottom: "0px" }}
            >
              <div className="flex">
                <button
                  className="ml-4 focus:outline-none"
                  onClick={(e) =>
                    openFile ? setOpenFile(false) : setOpenFile(true)
                  }
                >
                  <img src={Attach} className="h-5 w-5" />
                </button>
                <UploadFile
                  active={openFile}
                  selectFile={handleFile}
                  progress={progress}
                  loading={loading}
                />
                <input
                  type="text"
                  onKeyPress={typing}
                  name="message"
                  value={message}
                  onChange={({ target: { value } }) => setMessage(value)}
                  className="focus:outline-none w-full m-2 h-10 px-4 mr-2 rounded-full border border-gray-300 bg-gray-200 resize-none text-sm"
                  placeholder="Type a message"
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col mx-auto w-full relative bg-white h-full items-center justify-center">
            <div className="bg-blue-500 rounded-full p-10 h-auto flex items-center justify-center">
              <img src={DefaultChat} className="h-20 w-20" />
            </div>
            <h2 className="text-2xl text-gray-700 mt-5">
              Start chat with other member
            </h2>
          </div>
        )}
      </div>
    </>
  );
}
