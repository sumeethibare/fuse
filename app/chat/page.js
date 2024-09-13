"use client";
import { useState } from 'react';
import { getServerSession } from "next-auth";
import ChatWindow from './ChatWindow';
import Dropdown from './Dropdown'

// Server-side session fetching
export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res);
  
  if (!session || !session.user) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }
  
  return {
    props: { session },
  };
}

export default function Home({ session }) {
  const [chats, setChats] = useState([
    { id: 1, name: 'Shrinivas' },
    { id: 2, name: 'Vivek' },
    { id: 2, name: 'Arun' },
    { id: 2, name: 'Jay' },
  ]);

  const [currentChatId, setCurrentChatId] = useState(1);

  const [messages, setMessages] = useState({
    1: [{ text: 'Hey Shrinivas', sender: 'Shrinivas' }],
    2: [{ text: 'Hello Vivek', sender: 'Vivek' }],
    3: [{ text: 'Namaskar Arun', sender: 'Arun' }],
    4: [{ text: 'Hello Jay', sender: 'Jay' }],
  });

  const [isTyping, setIsTyping] = useState(false);

  // Handle chat selection
  const handleChatClick = (id) => {
    setCurrentChatId(id);
  };

  // Handle sending new message
  const handleSendMessage = (chatId, newMessage) => {
    if (newMessage.trim() !== '') {
      setMessages({
        ...messages,
        [chatId]: [
          ...(messages[chatId] || []),
          { text: newMessage, sender: 'You' },
        ],
      });
    }
  };


  const handleAddNewChat = (newUserName) => {
    const newChatId = chats.length + 1;
    const newChat = { id: newChatId, name: newUserName };

    setChats([...chats, newChat]);
    setMessages({ ...messages, [newChatId]: [] });
    setCurrentChatId(newChatId);
  };

  return (
    <div className="flex h-screen">
      <Dropdown
        chats={chats}
        onChatClick={handleChatClick}
        onAddNewChat={handleAddNewChat}
      />

      <ChatWindow
        chatId={currentChatId}
        messages={messages[currentChatId] || []}
        isTyping={isTyping}
        onSendMessage={handleSendMessage}
        setIsTyping={setIsTyping}
        
      />
    </div>
  );
}
