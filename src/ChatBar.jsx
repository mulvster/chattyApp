import React, {Component} from 'react';

class ChatBar extends Component {

  handleKeyUp(event) {
    if (event.key === 'Enter') {
      this.props.addMessage(event.target.value);
    }
  }

  render() {
    // WHY DO WE HAVE TO BIND THIS TO HANDLEKEYUP WHYYYYYYY ( probably because ES6 classes )
    return (
      <footer>
        <input id="username" type="text" placeholder={this.props.currentUser.name} />
        <input id="new-message" type="text" placeholder="Type a message and hit ENTER" onKeyUp={(event) => this.handleKeyUp(event)} />
      </footer>
    );
  }

}
export default ChatBar;