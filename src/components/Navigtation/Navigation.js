import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import config from '../../config';
import { IndexLink } from 'react-router';
import { Header, Navigation, Button, Drawer} from 'react-mdl';
import closeDrawer from '../../helpers/closeDrawer';

@connect((state) => state, {})
export default class TopNavigation extends Component {
  static propTypes = {
    user: PropTypes.object,
    navstyles: PropTypes.object,
    pushState: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    drawer: PropTypes.number
  };

  componentDidMount () {
    console.log('this.refs: ', this.refs);
  }

  toWidgets () {
    this.props.pushState('/widgets');
    if (this.props.drawer) closeDrawer.close();
  }

  toSurvey () {
    this.props.pushState('/survey');
    if (this.props.drawer) closeDrawer.close();
  }

  toAbout () {
    this.props.pushState('/about');
    if (this.props.drawer) closeDrawer.close();
  }

  handleLogout = (event) => {
    event.preventDefault();
    this.props.logout();
  };

  toLogin () {
    this.props.pushState('/login');
    if (this.props.drawer) closeDrawer.close();
  }

  render () {
    const navstyles = this.props.navstyles;
    const localstyles = require('./Navigation.scss');
    const styles = Object.assign({}, navstyles, localstyles);
    const user = this.props.user;
    const buttonClass = this.props.drawer ? '' : 'mdl-layout--large-screen-only';
    const title = (
      <IndexLink to="/" className={styles['brand-link']} activeStyle={{color: '#33e0ff'}}>
        <div className={styles['brand-link__brand']}/>
        <span className={styles['brand-link__brand-text']}>{config.app.title}</span>
      </IndexLink>
    );
    const children = [
      <div key="widgets-button" className={buttonClass}>
        <Button onClick={this.toWidgets.bind(this)}>
        Widgets
      </Button>
      </div>,
      <div key="survey-button" className={buttonClass}>
        <Button onClick={this.toSurvey.bind(this)}>
          Survey
        </Button>
      </div>,
      <div key="about-button" href="/about" className={buttonClass}>
        <Button onClick={this.toAbout.bind(this)}>
          About Us
        </Button>
      </div>];

    if (user) {
      children.unshift(<div key="chat-button" className={buttonClass}><Button to="/chat">
        Chat
      </Button></div>);
      children.push(
        <div key="logout-button"><Button to="/logout">
          <div className="logout-link" onClick={this.handleLogout.bind(this)}>
            Logout
          </div>
        </Button></div>);

      children.push(
        <div key="userid" className={buttonClass}>Logged in as
          <strong>{user.name}</strong>.</div>);

      children.push(
        <div key="github-button" className={buttonClass}>
          <Button target="_blank" title="View on Github"
                  href="https://github.com/erikras/react-redux-universal-hot-example">
            <i className="fa fa-github"/>
          </Button></div>);
    } else {
      children.push(
        <div key="login-button" className={buttonClass}>
          <Button onClick={this.toLogin.bind(this)}>
            Log In
          </Button>
        </div>);
    }

    return this.props.drawer ? (
      <Drawer>
        <Navigation>
          {children}
          <p>I am drawer</p>
        </Navigation>
      </Drawer>
    ) : (
      <Header title={title}>
        <Navigation>
               {children}
        </Navigation>
      </Header>
    );
  }
}
