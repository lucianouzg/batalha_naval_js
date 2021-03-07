import "./Chat.css";
import { io } from "socket.io-client";
import React from "react";
import { connect } from "react-redux";

export const socket = io("http://localhost:3000/");

class Chat extends React.Component {
  messagesElement;
  inputUsernameElement;
  inputMessageElement;

  constructor() {
    super();

    // this.handleSubmit = this.handleSubmit.bind(this);

    // this.state = {
    //   node: "ReactDOM.findDOMNode(this),",
    // };
    socket.on("receivedMessage", (message) => {
      this.renderMessage(message, this.messagesElement);
    });

    socket.on("previousMessages", (messages) => {
      for (var message of messages) {
        this.renderMessage(message, this.messagesElement);
      }
    });
  }

  renderMessage(message, node) {
    if (node instanceof HTMLElement) {
      node.innerHTML +=
        '<div class="message"><strong>' +
        message.author +
        "</strong>: " +
        message.message +
        "</div>";
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    var author = this.inputUsernameElement.value;
    var message = this.inputMessageElement.value;

    if (author.length && message.length) {
      var messageObject = {
        author: author,
        message: message,
      };

      this.renderMessage(messageObject, this.messagesElement);

      socket.emit("sendMessage", messageObject);
    }
  };

  render() {
    return (
      <form id="chat">
        <input
          type="text"
          disabled={true}
          name="username"
          value={this.props.user.nome}
          ref={(c) => (this.inputUsernameElement = c)}
          placeholder="digite seu usuário"
        />
        <div className="messages" ref={(c) => (this.messagesElement = c)}></div>
        <input
          type="text"
          name="message"
          ref={(c) => (this.inputMessageElement = c)}
          placeholder="Digite sua mensagem"
        />
        <button type="button" onClick={this.handleSubmit.bind(this)}>
          Enviar
        </button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(Chat);
