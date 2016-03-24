import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { } from 'react-router';

import {Navigation, Button} from 'react-mdl';

@connect((state) => state, {})
export default class NavInner extends Component {
    static propTypes = {
        user: PropTypes.object,
        pushState: PropTypes.func.isRequired
    };

    render() {
        const user = this.props.user;

        const go = (dest) => () => this.props.pushState(dest);

        const children = [
            <div key="widgets-button">
                <Button onClick={go('/widgets')}>
                    Widgets
                </Button>
            </div>,
            <div key="survey-button">
                <Button onClick={go('/survey')}>
                    Survey
                </Button>
            </div>,
            <div key="about-button">
                <Button onClick={go('/about')}>
                    About Us
                </Button>
            </div>];

        if (user) {
            children.unshift(
              <div key="chat-button">
                  <Button onClick={go('/chat')}>
                      Chat
                  </Button>
              </div>
            );
            children.push(
              <div key="logout-button">
                  <Button onClick={this.handleLogout}>
                      Logout
                  </Button>
              </div>
            );
            children.push(
              <div key="userid">
                  Logged in as <strong>{user.name}</strong>.
              </div>
            );
        } else {
            children.push(
              <div key="login-button">
                  <Button onClick={go('login')}>
                      Login
                  </Button>
              </div>
            );
        }

        children.push(
          <div key="github-button">
              <Button target="_blank" title="View on Github"
                      href="https://github.com/erikras/react-redux-universal-hot-example">
                  <i className="fa fa-github"/> Github
              </Button>
          </div>
        );

        return (
          <Navigation className={this.props.className || ''}>
              {children}
          </Navigation>);
    }
}
