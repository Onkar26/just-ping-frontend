import { useState, useEffect } from 'react'
import axios from 'axios';

function UsersContainer (props) {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const res = await axios.get(`${process.env.REACT_APP_ROOT}/users`);

    setUsers(res.data);
  }

  useEffect(() => { getUsers(); }, []);
  
  return (
    <div style={{display:'flex', flexDirection: 'column', width: '25%', justifyContent: "center", backgroundColor: "greenyellow", fontSize: "2.5px"}}>
      {users.map((user) => {
          return (
            <div id={user.id} onClick={(e) => {console.log(e.target.parentElement.id); props.onUserChange(e.target.parentElement.id)}}>
              <h3>{user.name} { user.id == props.user_id ? "(you)" : ""}</h3> 
            </div>
          )
      })}
    </div>
  );
}

export default UsersContainer;

export {};