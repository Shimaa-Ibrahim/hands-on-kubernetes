import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';


const baseURL =  process.env.BACKEND_URL ?? "http://localhost:3000";
const socket = io.connect(baseURL, {transports: ["websocket"]});
const usr = Math.random().toString(36).slice(2, 7);
let id = 0;

function App() {
  const [message , setMessage]= useState([]);
  const [input , setInput] = useState('');

  useEffect(() => {
    socket.on('message', (msg, user)=> setMessage(msgs => [...msgs, { msg, user}]));
  }, []);

  const handleChange = (e)=> {
    const {target: { value } } = e
    setInput(value)
  }

  const handleSubmit = (e)=> {
    e.preventDefault()
    socket.emit('message', input, usr)
    setInput('')
  }

  return (
    <div className='container'>
      <div className='chat-box'>
          <div id="msgs-container">
              {
                message.map(({msg, user}) =>
                <div key={id++} className={(user === usr) ? "me": "user"}>
                      <h1 key ={id++} className="msg-content"> { msg } </h1>
                      <div key ={id++} className="sender">sent by: {user}</div>
                </div>
                )
            }
            </div>
        <form onSubmit={handleSubmit}>
          <div className='chat-box-container'>
          <input
            id="content"
            type="text"
            name="content"
            onChange={handleChange}
            value={input}
            placeholder="message..."
            />
          <button id="submit-btn" type="submit">send</button>
          </div>
        </form>
      </div>
  </div>
  );
}

export default App;
