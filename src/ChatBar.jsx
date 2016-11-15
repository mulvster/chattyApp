import React, {Component} from 'react';
//This page deals with creating and sending the message.
//#1 runs first
class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);

    // The reason we use .bind is because in DOM context all events set `this` to the element that originated the event
    // Fat arrows automatically bind `this` to the current `this` when they are created, and disallow changing with .bind or .call

    // Rules for dealing with `this`:
    // If it's not an event handler, e.g. onClick, onChange, etc...
    // It's likely 99% going to point to the instance of the class
    // If it is inside an event handler - `this` points to originator, so use .bind to deal with it
  }
  handleMessageChange(event) {
    if (event.key === 'Enter') {
      this.props.addMessage(event.target.value);
      event.target.value = '';
    }
  }

  //when bound it will refer to the parent.
  handleNameChange(event) {
    // this.setState({user: event.target.value});
    if(event.key === 'Enter')
      this.props.changeUser(event.target.value);
  }
/// # runs secondly.
  render() {

    return (
      <footer>
        <input id="username" type="text" placeholder="Name" defaultValue={this.props.currentUser.name} onKeyUp={this.handleNameChange}  />
        <input id="new-message" type="text" placeholder="Type a message and hit ENTER" onKeyUp={this.handleMessageChange} />
      </footer>
    );
  }

}
export default ChatBar;

