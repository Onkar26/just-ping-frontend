import './App.css';
import { useState, useEffect } from 'react';
import ChatsContainer from './chats/index.js';
import axios from "axios";

function App() {
  const [containerType, setContainerType] = useState('chats');

  const [logInStatus, setLogInStatus] = useState(localStorage.getItem('userSession') !== null ? true : false);

  const [addUser, setAddUser] = useState(false);

  const [userName, setUserName] = useState("");

  const [userPassword, setUserPassword] = useState("");

  const [signUserName, setSignUserName] = useState("");

  const [signUserPassword, setSignUserPassword] = useState("");

  useEffect(() => {}, [logInStatus, addUser]);

  const addNewUser = async () => {
    let passwordDigest = btoa(signUserName + signUserPassword);

    try{
      const res = await axios.post(`${process.env.REACT_APP_ROOT}/users/add_user`, { headers: { 'Name': signUserName, 'Password-Digest': passwordDigest } });     
    }catch(error){
      alert(error);
    }

    setAddUser(addUser => !addUser);
    setSignUserName("");
    setSignUserPassword("");
  }

  const validateCredentials = async () => {
    let passwordDigest = btoa(userName + userPassword);
    try{
      const res = await axios.get(`${process.env.REACT_APP_ROOT}/users/validate_user`, { params: { name: userName, password_digest: passwordDigest } }, { withCredentials: true });
      console.log(res.data)

      localStorage.setItem('userSession', JSON.stringify({ name: userName, id: res.data.data.id}));

      setLogInStatus(true);
    }catch(error){
      alert(error.message);
    }
  }

  const container = () => {
    if(containerType === 'chats') {
      return (
        <ChatsContainer user_id ={JSON.parse(localStorage.getItem('userSession')).id} />
      )
    }else if(containerType === 'calls'){
      return (
        <div>

        </div>
      )
    }else{
      return (
        <div>

        </div>
      )
    }
    
  };

  if(logInStatus){
    return (
      <div style={{display: 'flex'}}>
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
          <button onClick={() => setContainerType('chats')}><img src=''/>Chats</button>
          {/* <button onClick={() => setContainerType('calls')}><img src=''/>Calls</button>
          <button onClick={() => setContainerType('stories')}><img src=''/>Stories</button> */}
          <button onClick={() => { setLogInStatus(false); localStorage.clear();}}>Log Out</button>
        </div>
        <div style={{height: '500px', display: 'flex', alignItems: 'center', width: '100%'}}>
          {container()}
        </div>
      </div>
    )
  }

  if(!addUser){
    return (     
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '200px' }}>
        <input value={userName} onChange={(e) => setUserName(e.target.value)}/>
        <input value={userPassword} onChange={(e) => setUserPassword(e.target.value)}/>
        <button onClick={() => { setAddUser(prev => !prev); setUserName(""); setUserPassword(""); }}>Sign Up</button>
        <button onClick={validateCredentials}>Log In</button>  
      </div>  
    )
  }

  return (
    <div>
      <input value={signUserName} onChange={(e) => setSignUserName(e.target.value)}/>
      <input value={signUserPassword} onChange={(e) => setSignUserPassword(e.target.value)}/>
      <button onClick={addNewUser}>Add User</button>
    </div>
  )  
}

export default App;
