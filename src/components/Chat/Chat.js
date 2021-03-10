import "./Chat.css";
import { io } from "socket.io-client";
import React from "react";
import { connect } from "react-redux";


class Chat extends React.Component {
  messagesElement;
  inputMessageElement;
  _socket = io("http://localhost:3000/");

  constructor(props) {
    super(props);

    this._socket.on("receivedMessage", (message) => {
      this.renderMessage(message, this.messagesElement);
    });

    this._socket.on("previousMessages", (messages) => {
      for (var message of messages) {
        this.renderMessage(message, this.messagesElement);
      }
    });
  }

  componentWillUnmount() {
    this._socket.close();
  }

  updateInput = inputValue => {
    this.setState({ userNameForChat: inputValue });
  };

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
    var author = this.props.user.nome;
    var message = this.inputMessageElement.value;

    if (author.length && message.length) {
      var messageObject = {
        author: author,
        message: message,
      };

      this.renderMessage(messageObject, this.messagesElement);

      this._socket.emit("sendMessage", messageObject);
    }
  };

  render() {
    return (
      <form id="chat">
        <input
          type="text"
          disabled
          name="username"
          value={this.props.user.nome}
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
    user: state.UserReducer.selectedUser,
  };
}

export default connect(mapStateToProps)(Chat);
