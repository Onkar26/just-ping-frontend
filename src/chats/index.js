import { useState, useEffect } from 'react'
import MessagesContainer from './components/messages';
import UsersContainer from './components/users';


function ChatsContainer (props) {
  const [selectedUser, setSelectedUser] = useState();

  useEffect(() => { console.log('chats', props)}, [])

  const changeUser = (val) => {
    setSelectedUser(parseInt(val))
  }

  return (
    <div className='UserMessage' style={{display: 'flex', flexWrap: 'wrap', width: "100%"}}>
      <UsersContainer user_id={props.user_id} onUserChange={changeUser} />
      <MessagesContainer from_user_id={props.user_id} to_user_id={selectedUser}/>
    </div>
  );
}

export default ChatsContainer;
