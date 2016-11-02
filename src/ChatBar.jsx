import React, {Component} from 'react';

class ChatBar extends Component {
  handleKeyUp(event) {
    if (event.key === 'Enter') {
      console.log(event.target.value);
    }
   
  }

  render() {
    this.props.addMessage("Hello");
    return (
      <footer>
        <input id="username" type="text" placeholder={this.props.currentUser.name} />
        <input id="new-message" type="text" placeholder="Type a message and hit ENTER" onKeyUp={this.handleKeyUp} />
      </footer>
    );
  }
}
export default ChatBar;