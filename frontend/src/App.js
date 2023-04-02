import { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';

let wsURL = "";
let url = '/hello/';
if (window.location.origin.includes("localhost:3006")) {
  url = "http://localhost:3000/hello/"
  wsURL = "http://localhost:3000";
}



const socket = io.connect(wsURL, {path: '/chat/' ,transports: ["websocket"]});
const usr = Math.random().toString(36).slice(2, 7);
let id = 0;

function App() {
  const [message , setMessage]= useState([]);
  const [input , setInput] = useState('');
  const [helloMsg , setHelloMsg] = useState('');


  useEffect(() => {
    fetch(url, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setHelloMsg(data.hello);
        socket.on('message', (msg, user)=> setMessage(msgs => [...msgs, { msg, user}]));
    })
  .catch((error) => {
    console.error("Error:", error);
  });
  }, []);

  const handleChange = (e)=> {
    const {target: { value } } = e
    setInput(value);
  }

  const handleSubmit = (e)=> {
    e.preventDefault()
    if(input) {
      socket.emit('message', input, usr);
      setInput('');
    } else {
      alert('No messege to be sent!');
    }
  }

  return (
    <div className='container'>
      <div className='chat-box'>
          <div id="msgs-container">
            <div>{ helloMsg } </div>
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
