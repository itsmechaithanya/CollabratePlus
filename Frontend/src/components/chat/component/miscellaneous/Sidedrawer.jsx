import React, { useContext, useState, useEffect } from "react";
import { Box, Text, Button, Avatar, Tooltip, useToast } from "@chakra-ui/react";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";

import ChatLoading from "../ChatLoading";
import UserListItem from "../userAvatar/UserListItem";
import { Card, CardHeader, Typography } from "@material-tailwind/react";
import { getSender } from "../ChatLogic";

import { AuthContext } from "../../../auth/Auth-context";
import { Input } from "antd";
import { ChatState } from "./ChatProvider";

function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const auth = useContext(AuthContext);
  const { setSelectedChat, notification, setNotification, chats, setChats } =
    ChatState();

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await fetch(
          `${
            import.meta.env.REACT_APP_BACKEND_URL
          }/api/erp/user/get/user/byid/${auth.userId}`,
          {
            headers: {
              Authorization: "Bearer " + auth.token,
            },
          }
        );
        const userData = await userResponse.json();
        setUser(userData.user);
      } catch (error) {
        toast({
          title: "Error Occurred!",
          description: "Failed to Load User Data",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
      }
    };

    fetchUser();
  }, [auth.token, auth.userId, toast]);

  // Real-time search functionality
  useEffect(() => {
    const handleSearch = async () => {
      if (!search) {
        setSearchResult([]);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(
          `${
            import.meta.env.REACT_APP_BACKEND_URL
          }/api/erp/user/get/all/users/search/${auth.userId}?search=${search}`,
          {
            headers: {
              Authorization: "Bearer " + auth.token,
            },
          }
        );
        const data = await response.json();
        setLoading(false);
        setSearchResult(
          data.users.filter(
            (user) =>
              user.firstName &&
              user.firstName.toLowerCase().includes(search.toLowerCase())
          )
        );
      } catch (error) {
        toast({
          title: "Error Occurred!",
          description: "Failed to Load the Search Results",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        });
      }
    };

    const delayDebounceFn = setTimeout(() => {
      handleSearch();
    }, 300); // Debounce time set to 300ms

    return () => clearTimeout(delayDebounceFn);
  }, [search, auth.token, auth.userId, toast]);

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const response = await fetch(
        `${import.meta.env.REACT_APP_BACKEND_URL}/api/erp/chat/access/chat`,
        {
          method: "POST",
          headers: {
            Authorization: "Bearer " + auth.token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: userId, loggedInUser: auth.userId }),
        }
      );
      const data = await response.json();

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="#beige"
        width="100%"
        padding="5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <i className="fas fa-search"></i>
          </Button>
        </Tooltip>

        <div>
          <Menu>
            <MenuButton p={1}>
              {/* <NotificationBadge
                count={notification.length}
                effect={Effect.SCALE}
              /> */}
              {/* <BellIcon fontSize="2xl" m={1} /> */}
            </MenuButton>
            <MenuList pl={2}>
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <Avatar
              size="sm"
              cursor="pointer"
              name={user.firstName}
              src={
                `${import.meta.env.REACT_APP_BACKEND_URL}/${user.image}` ||
                "https://via.placeholder.com/150"
              }
            />
          </Menu>
        </div>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            {" "}
            <Typography
              variant="small"
              color="blue-gray"
              className="font-semibold"
            >
              Search Users
            </Typography>
          </DrawerHeader>
          <DrawerBody>
            <Box display="flex" pb={2}>
              <Input
                placeholder="Search by name or email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult.map((user, index) => (
                <UserListItem
                  key={index}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <div>Loading chat...</div>}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default SideDrawer;
