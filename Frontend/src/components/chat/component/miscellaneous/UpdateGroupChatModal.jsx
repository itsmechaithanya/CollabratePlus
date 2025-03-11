import { EditIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  Input,
  useToast,
  Box,
  IconButton,
  Spinner,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import UserBadgeItem from "../userAvatar/UserBadgeItem";
import UserListItem from "../userAvatar/UserListItem";
import { ChatState } from "./ChatProvider";
import { AuthContext } from "../../../auth/Auth-context";

const UpdateGroupChatModal = ({ fetchMessages, fetchAgain, setFetchAgain }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameloading, setRenameLoading] = useState(false);
  const toast = useToast();
  const { selectedChat, setSelectedChat, user } = ChatState();
  const [groupChatName, setGroupChatName] = useState(selectedChat.chatName);
  const auth = useContext(AuthContext);

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
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
      setSearchResult(data.users);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const handleRename = async () => {
    if (!groupChatName) return;

    try {
      setRenameLoading(true);
      const response = await fetch(
        `${import.meta.env.REACT_APP_BACKEND_URL}/api/erp/chat/rename/group`,
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + auth.token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chatName: groupChatName,
            chatId: selectedChat._id,
          }),
        }
      );

      if (!response.ok) {
        // Handle the error response
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to rename the chat");
      }
      const data = await response.json();

      // setSelectedChat("");
      setSelectedChat(data.updatedChat);
      setRenameLoading(false);
      setFetchAgain(!fetchAgain);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setRenameLoading(false);
    }
    setGroupChatName("");
  };

  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      toast({
        title: "User Already in group!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (selectedChat.groupAdmin._id !== user._id) {
      toast({
        title: "Only admins can add someone!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.REACT_APP_BACKEND_URL}/api/erp/chat/add/togroup`,
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + auth.token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chatId: selectedChat._id,
            userId: user1._id,
            requesterId: auth.userId,
          }),
        }
      );

      const data = await response.json();

      setSelectedChat(data);
      setLoading(false);
      setFetchAgain(!fetchAgain);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
    setGroupChatName("");
  };

  const handleRemove = async (user1) => {
    if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
      toast({
        title: "Only admins can remove someone!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `${
          import.meta.env.REACT_APP_BACKEND_URL
        }/api/erp/chat/remove/fromgroup`,
        {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + auth.token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chatId: selectedChat._id,
            userId: user1._id,
            requesterId: auth.userId,
          }),
        }
      );
      if (!response.ok) {
        // Handle the error response
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to rename the chat");
      }

      const data = await response.json();

      user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
      setLoading(false);
      fetchMessages();
      setFetchAgain(!fetchAgain);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
    setGroupChatName("");
  };

  return (
    <>
      <IconButton
        display={{ base: "flex" }}
        icon={<EditIcon />}
        onClick={onOpen}
      />

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="35px"
            fontFamily="Work sans"
            display="flex"
            justifyContent="center"
            marginLeft={2}
          >
            {selectedChat.chatName}
          </ModalHeader>

          <ModalCloseButton />
          <ModalBody displayd="flex" flexDir="column" alignItems="center">
            <Box w="100%" display="flex" flexWrap="wrap" pb={3}>
              {selectedChat.users.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  admin={selectedChat.groupAdmin}
                  handleFunction={() => handleRemove(u)}
                />
              ))}
            </Box>
            <FormControl display="flex">
              <Input
                placeholder="Group Name"
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant="solid"
                colorScheme="gray"
                ml={1}
                isLoading={renameloading}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add User to group"
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>

            {loading ? (
              <Spinner size="lg" />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleAddUser(user)}
                />
              ))
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => handleRemove(user)} colorScheme="red">
              Leave Group
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateGroupChatModal;
