import React, { useState, useEffect, Fragment } from 'react';
import useWebSocket from 'react-use-websocket';
import { useParams } from 'react-router-dom';
import { GetCurrentUser, GetTokenUser } from '../../redux/selectors/userSelectors';
import { Button, TextField, Paper, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { Landscape } from '@mui/icons-material';
import './chat.css'



const ChatWindow = ({ projectId }) => {
  const { id } = useParams();
  const tokenUser = GetTokenUser();
  const user = GetCurrentUser()
  console.log(user)
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [wsConnected, setWsConnected] = useState(false)
  
  const { sendJsonMessage, lastJsonMessage } = useWebSocket(
      `ws://127.0.0.1:8000/chat/project/${id}/room/?authorization=${tokenUser}`, 
    {   
        share: false,
        shouldReconnect: () => true,
    }
  );

  useEffect(() => {
    console.log(lastJsonMessage)
    if (!wsConnected){
      sendJsonMessage({ action: 'subscribe_to_messages_in_room', request_id: new Date().getTime(), project_id: id }); 
      sendJsonMessage({ action: 'get_messages_room', request_id: new Date().getTime(), project_id: id });
      setWsConnected(true)
    }

  }, [sendJsonMessage]);
  
  useEffect(() => {
    console.log(lastJsonMessage);
    if (lastJsonMessage !== null && lastJsonMessage['messages']) {
      setMessages(lastJsonMessage['messages']);
    } else if (lastJsonMessage !== null) {
     
      setMessages(prevMessages => {
        const updatedMessages = [...prevMessages, lastJsonMessage];
        return updatedMessages;}) // Ret
    }
  }, [lastJsonMessage]);
  
  


  const sendRequest = () => {
    const messageToSend = {
      action: 'create_message',
      request_id: new Date().getTime(),
      message : {
        text: newMessage
        
      }
     
    };
    sendJsonMessage(messageToSend);
    setNewMessage('');
  };
  const handleToggleChat = () => {
    setIsChatOpen((prevState) => !prevState);
  };

  const toggleChat = () => {
    setIsChatOpen(prevState => !prevState);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log(newMessage)
    if (newMessage.trim() !== '') {
      sendRequest();
    }
  };

  
  return (
    <div style={{maxHeight: '90px'}} className="chat-wrapper">
      <Button variant="contained" style={{left:'50px'}}  id='button-chat' onClick={handleToggleChat}> 
    

        {isChatOpen ? 'Fermer le chat' : 'Ouvrir le chat'}
      </Button>
      {isChatOpen && (
       <div   className="chat-paper">
        <Paper elevation={3} className="chat-window">
          <div className="chat-content">
            <div className="message-container" style={{marginBottom: '100px'}}>
              {messages.map((message, index) => (
                <div key={index} className="message">
                  {message.user === user.email ?    
                    (
                      <div className='message-user'>
                        <div className="message-text">{message.user}</div>
                        <div  className="message-sender">{message.text}</div>
                        <div className="message-timestamp">{message.created_at}</div>
                      </div>
                    ) :
                    (
                      <div className='message-other' >
                        <div className="message-text">{message.user}</div>
                        <div  className="message-sender">{message.text}</div>
                        <div  className="message-timestamp">{message.created_at}</div>
                      </div>
                    )
                  }
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="input-container">
              <TextField 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                variant="outlined"
                placeholder="Tapez votre message..."
                fullWidth
              />
              <Button type="submit"  variant="contained" endIcon={<SendIcon />}>
                Envoyer
              </Button>
            </form>
          </div>
        </Paper>
        </div>
      )}
    </div>
  );
                }
export default ChatWindow