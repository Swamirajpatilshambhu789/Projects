import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Chatapp = ({ 
  messages = [], 
  username, 
  onSendMessage, 
  onSendDirectMessage,
  currentRoom, 
  onRoomChange, 
  onlineUsers,
  directMessages 
}) => {
  const { register, handleSubmit, reset } = useForm();
  const [selectedUser, setSelectedUser] = useState(null);

  const onSubmit = (data) => {
    if (data.message.trim()) {
      if (selectedUser) {
        // Send direct message
        onSendDirectMessage(selectedUser, data.message);
      } else {
        // Send room message
        onSendMessage(data.message);
      }
      reset();
    }
  };

  const handleUserClick = (user) => {
    if (user !== username) {
      setSelectedUser(user);
      onRoomChange(null); // Clear room selection
    }
  };
  
  return (
    <div className="chatapp">
      <div className="leftcolumn">
        <div className="rooms">
          {["General", "Memes", "Gaming", "jokes"].map((room) => (
            <div
              key={room}
              className={`room ${room === currentRoom ? 'active' : ''}`}
              onClick={() => {
                setSelectedUser(null);
                onRoomChange(room);
              }}
            >
              {room}
            </div>
          ))}
        </div>
        <div className="onlineusers">
          <h3>Online Users</h3>
          {Array.isArray(onlineUsers) && onlineUsers.map((user, index) => (
            <div 
              key={index} 
              className={`user ${user === selectedUser ? 'active' : ''}`}
              onClick={() => handleUserClick(user)}
            >
              <div className="user-info">
                <div className="userno">{index + 1}</div>
                <span className="username">{user}</span>
                <span className="online-status">●</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="main">
        <div className="chats">
          <div className="messages-container">
            {selectedUser ? (
              // Show direct messages
              directMessages[[username, selectedUser].sort().join('_')]?.map((msg, index) => (
                <div 
                  key={msg.messageId || index} 
                  className={`msg ${msg.from === username ? "msgbyuser" : "msgbyothers"}`}
                >
                  <div className="message-header">
                    <span className="username">{msg.from}</span>
                  </div>
                  <div className="message-content">{msg.msg}</div>
                </div>
              ))
            ) : (
              // Show room messages
              Array.isArray(messages) && messages.map((msg, index) => (
                <div 
                  key={msg.messageId || index} 
                  className={`msg ${msg.username === username ? "msgbyuser" : "msgbyothers"}`}
                >
                  <div className="message-header">
                    <div className="username">{msg.username}</div>
                  </div>
                  <div className="message-content">{msg.msg}</div>
                </div>
              ))
            )}
          </div>
          <div className="msgsender">
            <form
              className="formformsgsender"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                type="text"
                placeholder={selectedUser ? `Message ${selectedUser}` : "Type a message"}
                className="msginput"
                {...register("message", { required: true })}
              />
              <button className="submitbtnformsgsender" type="submit">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatapp;
