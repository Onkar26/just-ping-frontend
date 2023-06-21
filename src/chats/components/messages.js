import { useState, useEffect } from "react";
import axios from "axios";

function MessagesContainer(props) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [click, setClick] = useState(0);

  const messageBox = {
    backgroundColor: "#f0f0f0",
    border: "1px solid #ccc",
    padding: "10px",
    borderRadius: "5px",
    width: "300px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
    fontSize: "14px",
    color: "#333",
    visibility: messages ? "visible" : "hidden",
    textAlign: "center",
  };

  useEffect(() => {
    console.log(props);

    getSelectedUserMessages();
  }, [props.to_user_id, click]);

  const getSelectedUserMessages = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_ROOT}/messages`, {
        headers: {
          "From-User-Id": props.from_user_id,
          "To-User-Id": props.to_user_id,
        },
      });

      setMessages(res.data); // api call from props.to_user_id, props.user_id
    } catch (error) {
      console.log(error);
    }
  };

  const sendMessage = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_ROOT}/messages/send_message?from_user_id=${props.from_user_id}&to_user_id=${props.to_user_id}&message=${message}`
      );

      console.log(res);

      setClick(res.data.id);
      setMessage("");

      console.log(click);
    } catch (error) {
      alert(error);

      alert("message not sent!!!");
    }
  };

  return (
    <div
      style={{
        width: "75%",
        height: "500px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        {messages.map((m, idx) => (
          <div align={m.from_user_id == props.from_user_id ? "left" : "right"}>
            <div>
              <h4
                style={{
                  ...messageBox,
                  color: m.from_user_id == props.from_user_id ? "green" : "black",
                  width: "fit-content",
                  display: "inline-block",
                }}
              >
                {m.message +
                  " " +
                  m.from_user_id +
                  " " +
                  props.from_user_id +
                  " " +
                  props.to_user_id}
              </h4>
            </div>
          </div>
        ))}
      </div>

      <div style={messageBox}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={{ visibility: messages ? "visible" : "hidden" }}
        />
        <button
          onClick={sendMessage}
          style={{ visibility: messages ? "visible" : "hidden" }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default MessagesContainer;
