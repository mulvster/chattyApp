import React, {Component} from 'react';

// Rules for dealing with `this`:
// If it's not an event handler, e.g. onClick, onChange, etc...
// It's likely 99% going to point to the instance of the class
// If it is inside an event handler - `this` points to originator, so use .bind to deal with it

//deals with actual messages.
class Message extends Component {
  render() {
    return (

      <div className="message">



        <span className="username"> {this.props.username} </span>
        <span className="content">  {this.props.content}</span>
      </div>

    )
  }
}
export default Message;