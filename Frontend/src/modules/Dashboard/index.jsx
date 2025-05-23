import React, { useContext, useEffect, useRef, useState } from "react";
import Img1 from "../../assets/img1.jpg";
import tutorialsdev from "../../assets/tutorialsdev.png";
import Input from "../../components/Input";
import { io } from "socket.io-client";
import { AuthContext } from "../../components/auth/Auth-context";
import { useAuth } from "../../components/auth/auth-hook";

const Dashboard = () => {
  const auth = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState({});
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const messageRef = useRef(null);
  const loggedInUser = auth.userId;
  const loggedInUserData = users.find((user) => user._id === loggedInUser);

  useEffect(() => {
    setSocket(io("http://localhost:8080"));
  }, []);

  useEffect(() => {
    socket?.emit("addUser", loggedInUser);
    socket?.on("getUsers", (users) => {
      console.log("activeUsers :>> ", users);
    });
    socket?.on("getMessage", (data) => {
      setMessages((prev) => ({
        ...prev,
        messages: [
          ...prev.messages,
          { user: data.user, message: data.message },
        ],
      }));
    });
  }, [socket]);

  useEffect(() => {
    messageRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages?.messages]);

  useEffect(() => {
    const fetchConversations = async () => {
      const res = await fetch(
        `http://localhost:4444/api/collaborate/conversation/get/conversation/${loggedInUser}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const resData = await res.json();
      setConversations(resData);
    };
    fetchConversations();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(
        `http://localhost:4444/api/collaborate/user/get/all/users`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const resData = await res.json();
      console.log(resData);
      setUsers(resData.users);
    };
    fetchUsers();
  }, []);

  const fetchMessages = async (conversationId, receiver) => {
    console.log("cccccc", receiver);
    console.log("aaaaa", conversationId);
    const res = await fetch(
      `http://localhost:4444/api/collaborate/message/get/all/messages/byid/${conversationId}?senderId=${loggedInUser}&&receiverId=${receiver?._id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const resData = await res.json();
    setMessages({ messages: resData, receiver, conversationId });
  };

  const sendMessage = async (e) => {
    setMessage("");
    console.log(messages);
    socket?.emit("sendMessage", {
      senderId: loggedInUser,
      receiverId: messages?.receiver?._id,
      message,
      conversationId: messages?.conversationId,
    });
    const res = await fetch(
      `http://localhost:4444/api/collaborate/message/send/message`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversationId: messages?.conversationId,
          senderId: loggedInUser,
          message,
          receiverId: messages?.receiver?._id,
        }),
      }
    );
  };
  const getInitials = (firstName, lastName) => {
    return `${firstName?.charAt(0) || ""}${
      lastName?.charAt(0) || ""
    }`.toUpperCase();
  };

  return (
    <div className="w-screen flex bg-black text-white">
      <div className="w-[25%] h-screen bg-secondary overflow-y-auto">
        <div className="flex items-center my-8 mx-14">
          <div>
            {loggedInUserData && loggedInUserData.firstName && (
              <div className="w-[60px] h-[60px] flex items-center justify-center bg-gray-500 text-white rounded-full text-lg font-bold">
                {getInitials(
                  loggedInUserData.firstName,
                  loggedInUserData.lastName
                )}
              </div>
            )}
          </div>
          <div className="ml-8">
            {loggedInUserData && loggedInUserData.firstName && (
              <h3 className="text-2xl">
                {loggedInUserData?.firstName + " " + loggedInUserData.lastName}
              </h3>
            )}
            <p className="text-lg font-light">My Account</p>
          </div>
        </div>
        <hr />
        <div className="mx-14 mt-10">
          <div className="text-primary text-lg">Messages</div>
          <div>
            {conversations.length > 0 ? (
              conversations.map(({ conversationId, user }) => {
                return (
                  <div className="flex items-center py-8 border-b border-b-gray-300">
                    <div
                      className="cursor-pointer flex items-center"
                      onClick={() => fetchMessages(conversationId, user)}
                    >
                      <div>
                        <div className="w-[60px] h-[60px] flex items-center justify-center bg-gray-500 text-white rounded-full text-lg font-bold">
                          {getInitials(user.firstName, user.lastName)}
                        </div>
                      </div>
                      <div className="ml-6">
                        <h3 className="text-lg font-semibold">
                          {user?.firstName + " " + user?.lastName}
                        </h3>
                        <p className="text-sm font-light text-gray-600">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center text-lg font-semibold mt-24">
                No Conversations
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-[50%] h-screen bg-black text-white flex flex-col items-center">
        {messages?.receiver?.firstName && (
          <div
            className="w-[75%] bg-secondary h-[80px] my-14 rounded-full flex items-center px-14 py-2"
            style={{ willChange: "transform", scrollBehavior: "smooth" }}
          >
            <div className="cursor-pointer">
              <div className="w-[60px] h-[60px] flex items-center justify-center bg-gray-500 text-white rounded-full text-lg font-bold">
                {getInitials(
                  messages?.receiver?.firstName,
                  messages?.receiver?.lastName
                )}
              </div>
            </div>
            <div className="ml-6 mr-auto">
              <h3 className="text-lg">
                {messages?.receiver?.firstName +
                  " " +
                  messages?.receiver?.lastName}
              </h3>
              <p className="text-sm font-light text-gray-600">
                {messages?.receiver?.email}
              </p>
            </div>
            {/* <div className="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-phone-outgoing"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="black"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                <line x1="15" y1="9" x2="20" y2="4" />
                <polyline points="16 4 20 4 20 8" />
              </svg>
            </div> */}
          </div>
        )}
        <div className="h-[75%] w-full overflow-scroll shadow-sm">
          <div className="p-14">
            {messages?.messages?.length > 0 ? (
              messages.messages.map(({ message, user: { id } = {} }) => {
                return (
                  <>
                    <div
                      className={`max-w-[40%] rounded-b-xl p-4 mb-6 ${
                        id === loggedInUser
                          ? "bg-primary text-black bg-green-400 rounded-tl-xl ml-auto"
                          : "bg-secondary rounded-tr-xl text-black bg-green-400"
                      } `}
                    >
                      {message}
                    </div>
                    <div ref={messageRef}></div>
                  </>
                );
              })
            ) : (
              <div className="text-center text-lg font-semibold mt-24">
                No Messages or No Conversation Selected
              </div>
            )}
          </div>
        </div>
        {messages?.receiver && (
          <div className="p-14 w-full flex items-center">
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-[75%]"
              inputClassName="p-4 border-0 shadow-md rounded-full bg-light focus:ring-0 focus:border-0 outline-none"
            />
            <div
              className={`ml-4 p-2 cursor-pointer bg-light rounded-full ${
                !message && "pointer-events-none"
              }`}
              onClick={() => sendMessage()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-send"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#2c3e50"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="10" y1="14" x2="21" y2="3" />
                <path d="M21 3l-6.5 18a0.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a0.55 .55 0 0 1 0 -1l18 -6.5" />
              </svg>
            </div>
            <div
              className={`ml-4 p-2 cursor-pointer bg-light rounded-full ${
                !message && "pointer-events-none"
              }`}
            ></div>
          </div>
        )}
      </div>
      <div
        className="w-[25%] h-screen bg-light px-8 py-16 overflow-y-auto"
        style={{ willChange: "transform", scrollBehavior: "smooth" }}
      >
        <div className="text-primary text-lg">People</div>
        <div className="h-screen overflow-auto">
          {users.length > 0 ? (
            users.map((user) => {
              return (
                <div className="flex items-center py-8 border-b border-b-gray-300">
                  <div
                    className="cursor-pointer flex items-center"
                    onClick={() => fetchMessages("new", user)}
                  >
                    <div>
                      <div className="w-[60px] h-[60px] flex items-center justify-center bg-gray-500 text-white rounded-full text-lg font-bold">
                        {getInitials(user.firstName, user.lastName)}
                      </div>
                    </div>
                    <div className="ml-6">
                      <h3 className="text-lg font-semibold">
                        {user.firstName + " " + user.lastName}
                      </h3>
                      <p className="text-sm font-light text-gray-600">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center text-lg font-semibold mt-24">
              No Conversations
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
