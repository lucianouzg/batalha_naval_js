import "./Chat.css";
import { io } from "socket.io-client";
import React from "react";
import { withRouter } from "react-router-dom";
import { selectUser } from "../actions/index";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

export const socket = io("http://localhost:3000/");

class paginaInicial extends React.Component {
  inputElement;
  handleSubmit = () => {
    this.props.dispatchUser({
      nome: this.inputElement.value,
      uuid: 123,
    });
    this.props.history.push("/app");
    // if (new String(this.inputElement.value).trim().length > 0) {
    // history.push("/app");
    // }
  };

  render() {
    return (
      <form id="login">
        <input
          required
          ref={(c) => (this.inputElement = c)}
          type="text"
          name="username"
          placeholder="digite seu usuário"
        />

        {/* <Link to="/app"> */}
        <button onClick={this.handleSubmit} type="button">
          Entrar no chat!
        </button>
        {/* </Link> */}
      </form>
    );
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({ dispatchUser: selectUser }, dispatch);
}

export default compose(
  withRouter,
  connect(null, matchDispatchToProps)
)(paginaInicial);

// const withRouterComponent = withRouter(paginaInicial);
// export default connect(matchDispatchToProps)(withRouterComponent);
