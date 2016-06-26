import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import * as authActions from 'redux/modules/auth';
import {Button } from 'react-mdl';
@connect(
  state => ({user: state.auth.user}),
  authActions)
export default class Login extends Component {
  static propTypes = {
    user: PropTypes.object,
    login: PropTypes.func,
    logout: PropTypes.func
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const input = this.refs.username;
    this.props.login(input.value);
    input.value = '';
  };

  logIn () {
    document.location.href = '/api/login/twitter';
  }

  render () {
    const {user, logout} = this.props;
    const styles = require('./Login.scss');
    return (
      <div className={styles.loginPage + ' container'}>
        <Helmet title="Login"/>
        {!user &&
        <div>
          <h1>Log In to EatYourFriends.club</h1>
          <Button raised primary onClick={this.logIn.bind(this)}>Log In using Twitter</Button>
        </div>
        }
        {user &&
        <div>
          <h1>Welcome to EatYourFriends.club</h1>
          <p>You are currently logged in as {user.displayName}.</p>

          <div>
            <button className="btn btn-danger" onClick={logout}><i className="fa fa-sign-out"/>{' '}Log
              Out
            </button>
          </div>
        </div>
        }
      </div>
    );
  }
}
/*

 <form className="login-form form-inline" onSubmit={this.handleSubmit}>
 <div className="form-group">
 <input type="text" ref="username" placeholder="Enter a username"
 className="form-control"/>
 </div>
 <button className="btn btn-success" onClick={this.handleSubmit}><i
 className="fa fa-sign-in"/>{' '}Log In
 </button>
 </form>
 <p>This will "log you in" as this user, storing the username in the session of the API
 server.</p>

 */
