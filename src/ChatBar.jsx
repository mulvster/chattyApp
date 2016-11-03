import React, {Component} from 'react';


class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {message: " ", user: " "};
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleMessageChange = this.handleMessageChange.bind(this);
  }
  handleMessageChange(event) {
    if (event.key === 'Enter') {
      this.props.addMessage({message: this.state.message, user: this.state.user});
    }else {
      this.setState({message: event.target.value});
      // sends message to parent
      // this.props.addMessage(event.target.value);

      // reset the input field to blank
        // insert awesome code here
    }
  }
handleNameChange(event) {
  this.setState({user: event.target.value});
}
  render() {
    // WHY DO WE HAVE TO BIND THIS TO HANDLEKEYUP WHYYYYYYY ( probably because ES6 classes )
  //React.createClass automatically binds "this" for you. WHY?! HOW?!
    //why does render have it... but handleKeyUp does not? "this" was null before the bind.
    return (
      <footer>
        <input id="username" type="text" placeholder={this.props.currentUser.name} onKeyUp={this.handleNameChange}  />
        <input id="new-message" type="text" placeholder="Type a message and hit ENTER" onKeyUp={this.handleMessageChange} />
      </footer>
    );
  }

}
export default ChatBar;

