import React, {Component} from 'react';
import MessageList from "./MessageList.jsx";
import ChatBar from "./ChatBar.jsx";


let data = {
  currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
  messages: [
    {
      id: 1,
      username: "Bob",
      content: "Has anyone seen my marbles?",
    },
    {
      id: 2,
      username: "Anonymous",
      content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
    }
  ]
};


class App extends Component {
  constructor(props) {
    super(props);
    this.state = data;
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:4000");
    this.socket.onopen = () => {
      this.socket.send(JSON.stringify(data));

      //Set state connected = true
    }

    this.socket.onmessage = (message) => {
      console.log(message);
      const data = JSON.parse(message.data);
      console.log('Message for ws:', data);
    }
  }

  componentWillUnmount()
  {
    this.socket.close();
  }

  addMessage(message) {
    let content = message;
    let username = this.state.currentUser.name;
    let id = Math.floor( Math.random() * 1000 );

    // make a new message object
    let newMessage = {id, username, content};
    let newMessages = this.state.messages.concat(newMessage);

    // make the new state ( because it needs to include the new message )
    // apparently we can update partial state, so `this.setState({messages: newMessages})` also works
    let newState = {
      ... data,
      messages: newMessages
    };

    this.setState( newState );
    this.socket.send(JSON.stringify(newMessage));

  }

  render() {
    return (
      <div className="wrapper">
        <nav>
          <h1>Chatty</h1>
        </nav>

        <MessageList
          messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser} addMessage={this.addMessage.bind(this)}/>
      </div>
    );
  }

}
export default App;


