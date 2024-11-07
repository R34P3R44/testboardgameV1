import React, { useState } from 'react';
import { useAbly } from '../../app/lib/useAbly'
import './chat.css';


type ChatProps = {
  channelName: string;
};

const Chat: React.FC<ChatProps> = ({ channelName }) => {
  const { messages, sendMessage } = useAbly(channelName);
  const [name, setName] = useState('');
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim()) {
      sendMessage(name || 'Anonymous', text);
      setText('');
    }
  };

  return (
    <div className='chatRoomStyle'>
      <div style={{ borderBottom: '1px solid #ccc', margin: '5px', width: '14vw', paddingLeft: '10px', color: 'white', fontSize: '20px' }}>
        <h2>Chat Room</h2>
      </div>
      <div style={{ maxHeight: 'auto', overflowY: 'auto', margin: '1rem' }}>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.name}:</strong> {message.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{width: '14vw', margin: '10px', borderRadius: '5px', padding: '2px' }}
      />
      <input
        type="text"
        placeholder="Enter your message"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        style={{width: '14vw', margin: '10px', borderRadius: '5px', padding: '2px', }}
      />
      <button style={{width: '14vw', margin: '10px', backgroundColor: '#4FC08D', borderRadius: '5px', padding: '5px' }} onClick={handleSend}>Send</button>
    </div>
  );
};

export default Chat;
