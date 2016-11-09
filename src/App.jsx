import React, {Component} from 'react';
import MessageList from "./MessageList.jsx";
import ChatBar from "./ChatBar.jsx";

// Rules for dealing with `this`:
// If it's not an event handler, e.g. onClick, onChange, etc...
// It's likely 99% going to point to the instance of the class
// If it is inside an event handler - `this` points to originator, so use .bind to deal with it


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
    this.socket = new WebSocket(`ws://${location.hostname}:4000`);
    this.socket.onopen = () => {

    }

    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      switch(message.type)
      {
        case "userCount":
          this.setState({ usersOnline: message.usersOnline });
          break;
        case "postMessage":
        case "postNotification":
          this.setState({
            messages: this.state.messages.concat(message)
          });
          break;
      }

      // When we call setState the component can choose to re-render if any of the data it uses has changed
      // https://facebook.github.io/react/docs/react-component.html#shouldcomponentupdate
      // This method is called and can be overridden in your own components
      //
      // Once the component renders - it will cause all child components to render passing them new props
      // This cascades through the entire hierarchy of the components, top-down
    }
  }

  changeUser(name)
  {
    var prevName = this.state.currentUser.name;
    this.setState({
      currentUser: { name }
    });
    this.post('postNotification', {
      content: `User changed name from ${prevName} to: ${name}`
    });
  }

  post(type, data)
  {
    this.socket.send(
      JSON.stringify(
        Object.assign({}, { type }, data)
      )
    );
  }


  componentWillUnmount() {
    this.socket.close();
  }

  addMessage(content) {
    this.post("postMessage", {
      username: this.state.currentUser.name,
      content
    });
  }

  render() {
    return (
      <div className="wrapper">
        <nav>
          <h1>ChattyKarl</h1>
          <h3>usersOnline={this.state.usersOnline}</h3>
        </nav>

        <MessageList
          messages={this.state.messages}/>
        <ChatBar currentUser={this.state.currentUser} addMessage={this.addMessage.bind(this)} changeUser={this.changeUser.bind(this)} />
      </div>
    );
  }

}
export default App;


