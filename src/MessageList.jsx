import React, {Component} from 'react';
import Message from "./Message.jsx";

// Rules for dealing with `this`:
// If it's not an event handler, e.g. onClick, onChange, etc...
// It's likely 99% going to point to the instance of the class
// If it is inside an event handler - `this` points to originator, so use .bind to deal with it
class MessageList extends Component {
  render() {

    return (
      <div id="message-list">
        {this.props.messages.map((message) => {
          return <Message
            key={message.id}
            username={message.username}
            content={message.content} />
        })}
      </div>
    );

  }
}
export default MessageList;