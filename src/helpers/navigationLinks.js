import { Button} from 'react-mdl';
import React from 'react';

export default (user) => {
  const children = [
    <div key="widgets-button"><Button onClick={this.toWidgets.bind(this)}>
      Widgets
    </Button></div>,
    <div key="survey-button"><Button to="/survey">
      Survey
    </Button></div>,
    <div key="about-button" href="/about"><Button>
      About Us
    </Button></div>];

  if (user) {
    children.unshift(<div key="chat-button"><Button to="/chat">
      Chat
    </Button></div>);

    children.push(
      <div key="logout-button"><Button to="/logout">
        <div className="logout-link" onClick={this.handleLogout}>
          Logout
        </div>
      </Button></div>);

    children.push(
      <div key="userid">Logged in as
        <strong>{user.name}</strong>.</div>);

    children.push(
      <div key="github-button">
        <Button target="_blank" title="View on Github"
                href="https://github.com/erikras/react-redux-universal-hot-example">
          <i className="fa fa-github"/>
        </Button></div>);
  } else {
    children.push(
      <div key="login-button"><Button to="/login">
        Login
      </Button></div>);
  }
  return children;
};
