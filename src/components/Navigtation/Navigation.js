import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import config from '../../config';
import { IndexLink, Link } from 'react-router';
import { Header, HeaderRow, Spacer, Navigation, Button, Drawer} from 'react-mdl';

@connect((state) => state, {})
export default class TopNavigation extends Component {
  static propTypes = {
    user: PropTypes.object,
    navstyles: PropTypes.object
  };

  render () {
    const navstyles = this.props.navstyles;
    const localstyles = require('./Navigation.scss');
    const styles = Object.assign({}, navstyles, localstyles);
    const user = this.props.user;

    const title = (
      <IndexLink to="/" className={styles['brand-link']} activeStyle={{color: '#33e0ff'}}>
        <div className={styles['brand-link__brand']}/>
        <span className={styles['brand-link__brand-text']}>{config.app.title}</span>
      </IndexLink>
    );

    const children = [
      <div key="widgets-button"><Button to="/widgets">
        Widgets
      </Button></div>,
      <div key="survey-button"><Button to="/survey">
        Survey
      </Button></div>,
      <div key="about-button"><Button>
        <Link to="/about">
        About Us</Link>
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
        <div key="userid" className={styles.loggedInMessage + ' navbar-text'}>Logged in as
          <strong>{user.name}</strong>.</div>);
      children.push(
        <div key="github-button"><Button target="_blank" title="View on Github"
                                         href="https://github.com/erikras/react-redux-universal-hot-example">
          <i className="fa fa-github"/>
        </Button></div>);
    } else {
      children.push(
        <div key="login-button"><Button to="/login">
          Login
        </Button></div>);
    }

    return (
      <Header>
        <HeaderRow title={title}>
          <Spacer />
          <Navigation>
            {children}
          </Navigation>
        </HeaderRow>
        <Drawer>
          {children}
        </Drawer>
      </Header>
    );
  }
}

/**
 <div class="demo-layout-waterfall mdl-layout mdl-js-layout">
 <header class="mdl-layout__header mdl-layout__header--waterfall">
 <!-- Top row, always visible -->
 <div class="mdl-layout__header-row">
 <!-- Title -->
 <span class="mdl-layout-title">Title</span>
 <div class="mdl-layout-spacer"></div>
 <div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable
 mdl-textfield--floating-label mdl-textfield--align-right">
 <label class="mdl-button mdl-js-button mdl-button--icon"
 for="waterfall-exp">
 <i class="material-icons">search</i>
 </label>
 <div class="mdl-textfield__expandable-holder">
 <input class="mdl-textfield__input" type="text" name="sample"
 id="waterfall-exp">
 </div>
 </div>
 </div>
 <!-- Bottom row, not visible on scroll -->
 <div class="mdl-layout__header-row">
 <div class="mdl-layout-spacer"></div>
 <!-- Navigation -->
 <nav class="mdl-navigation">
 <a class="mdl-navigation__link" href="">Link</a>
 <a class="mdl-navigation__link" href="">Link</a>
 <a class="mdl-navigation__link" href="">Link</a>
 <a class="mdl-navigation__link" href="">Link</a>
 </nav>
 </div>
 </header>
 <div class="mdl-layout__drawer">
 <span class="mdl-layout-title">Title</span>
 <nav class="mdl-navigation">
 <a class="mdl-navigation__link" href="">Link</a>
 <a class="mdl-navigation__link" href="">Link</a>
 <a class="mdl-navigation__link" href="">Link</a>
 <a class="mdl-navigation__link" href="">Link</a>
 </nav>
 </div>
 <main class="mdl-layout__content">
 <div class="page-content"><!-- Your content goes here --></div>
 </main>
 </div>
 **/
