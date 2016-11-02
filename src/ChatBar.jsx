import React, {Component} from 'react';


class ChatBar extends Component {

  handleKeyUp(event) {
    if (event.key === 'Enter') {
      // sends message to parent
      this.props.addMessage(event.target.value);

      // reset the input field to blank
        // insert awesome code here
    }
  }

  render() {
    // WHY DO WE HAVE TO BIND THIS TO HANDLEKEYUP WHYYYYYYY ( probably because ES6 classes )
  //React.createClass automatically binds "this" for you. WHY?! HOW?!
    //why does render have it... but handleKeyUp does not? "this" was null before the bind.
    return (
      <footer>
        <input id="username" type="text" placeholder={this.props.currentUser.name} />
        <input id="new-message" type="text" placeholder="Type a message and hit ENTER" onKeyUp={this.handleKeyUp.bind(this)} />
      </footer>
    );
  }

}
export default ChatBar;

