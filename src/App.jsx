import React, {Component} from 'react';
import MessageList from "./MessageList.jsx";
import ChatBar from "./ChatBar.jsx";

const uuid = require('uuid');


let data = {
  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [],
  usersOnline: 0
};


class App extends Component {
  constructor(props) {
    super(props);
    this.state = data;
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:4000");
    this.socket.onopen = () => {

    }

    this.socket.onmessage = (message) => {
      console.log(message);
      const data = JSON.parse(message.data);
      if(data.type === "userCount") {
        this.setState({usersOnline: data.usersOnline});
      } else {
        data.type = "incoming message";

        const messages = this.state.messages.concat(data);
        console.log(messages);
        this.setState({messages: messages});
      }


    }
  }


  componentWillUnmount() {
    this.socket.close();
  }

  addMessage(message) {
    if (message.user === "") {
      let newMessage = {
        id: uuid.v1(),
        username: this.state.currentUser.name,
        content: message.message,
        type: "postMessage"
      };
      this.socket.send(JSON.stringify(newMessage));

    } else {
      let changeNameNotification = {
        content: "User changed name from " + this.state.currentUser.name + " to: " + message.user,
        type: "postNotification"
      }
      let userMessage = {
        id: uuid.v1(),
        username: message.user,
        content: message.message,
        type: "postMessage"
      };
      this.state.currentUser.name = message.user;
      this.socket.send(JSON.stringify(changeNameNotification));
      this.socket.send(JSON.stringify(userMessage));
    }
  }

  render() {
    return (
      <div className="wrapper">
        <nav>
          <h1>Chatty</h1>
          <h3>usersOnline={this.state.usersOnline}</h3>
        </nav>

        <MessageList
          messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser} addMessage={this.addMessage.bind(this)}/>
      </div>
    );
  }

}
export default App;


