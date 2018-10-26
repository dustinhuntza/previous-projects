//necessary imports for the page
import React, { Component } from 'react';
import { Widget, addLinkSnippet, addUserMessage } from 'react-chat-widget';
//import css styles for widget
import 'react-chat-widget/lib/styles.css';

class Support extends Component {
  //recieves input from user
  handleNewUserMessage = (newMessage) => {
    console.log(`New message incomig! ${newMessage}`);
    // Now send the message throught the backend API
  }

  render() {
    return (
      <div className="App">
        {/*call the widget component*/}
        <Widget          
          handleNewUserMessage={this.handleNewUserMessage}
          title="Support"
          subtitle="What can we help you with?"
        />
      </div>
    );
  }
}
//export component
export default Support;
