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
    static contextTypes = {
        router: React.PropTypes.object
    }

    componentDidMount() {
        console.log('this.refs: ', this.refs);
    }

    handleLogout = (event) => {
        event.preventDefault();
        this.props.logout();
    };

    toLogin() {
        this.props.pushState('/login');
        if (this.props.drawer) {
            closeDrawer.close();
        }
    }

    render() {
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

        const go = (link) => () => {
            this.props.pushState(link);
            if (this.props.drawer) {
                closeDrawer.close();
            }
        };

        const makeLinkButton = (link, text, comms) => {
            const raised = this.context.router.isActive(link);
            const linkStyle = {};
            if ((!this.props.drawer) && raised) {
                linkStyle.color = 'white';
            }
            return ( <div key={`${link.replace(/^\\/, '')}-button`} className={buttonClass} {...comms}>
                <Button raised={raised} style={linkStyle} onClick={go(link)}>
                    {text}
                </Button>
            </div>);
        };

        const makeLink = (link, text) => {
            return makeLinkButton(link, text, {onClick: go(link)});
        };

        const children = [
            makeLink('/widgets', 'Widgets'),
            makeLink('/survey', 'Survey'),
            makeLink('/about', 'About Us')
        ];

        if (user) {
            children.unshift(
              makeLink('/chat', 'Chat')
            );
            children.push(
              <div key="userid" className={buttonClass}>Logged in as&nbsp;
                  <strong>{user.name}</strong>.</div>);
            children.push(
              makeLinkButton('/logout', 'Log Out', {onClick: this.handleLogout.bind(this)} ));

        } else {
            children.push(
              makeLink('/login', 'Log In')
            );
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
              <Navigation className={styles.navigation}>
                  {children}
              </Navigation>
          </Header>
        );
    }
}
