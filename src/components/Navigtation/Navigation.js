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
        const styles = require('./Navigation.scss');
        const user = this.props.user;
        const buttonClass = this.props.drawer ? '' : 'mdl-layout--large-screen-only';
        const title = (
            <IndexLink to="/" className="brand-link" activeStyle={{color: '#33e0ff'}}>
                <div className="brand-link__brand"/>
                <span className="brand-link__brand-text">{config.app.title}</span>
            </IndexLink>
        );

        const go = (link) => () => {
            this.props.pushState(link);
            if (this.props.drawer) {
                closeDrawer.close();
            } else {
                console.log('close not drawer');
            }
        };

        const makeLinkButton = (link, text, comms) => {
            const active = this.context.router.isActive(link);
            let raised = false;
            let accent = false;
            const linkStyle = {};
            if (this.props.drawer) {
                accent = active;
            } else {
                if (active) {
                    linkStyle.color = 'white';
                }
                raised = active;
            }
            return ( <div key={`${link.replace(/^\\/, '')}-button`} className={buttonClass} >
                <Button accent={accent} raised={raised} style={linkStyle} {...comms}>
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
                <div key="userid" className={buttonClass}>
                    <div className="nav-text">Logged in as&nbsp;{user.displayName}.</div></div>);
            children.push(
                makeLinkButton('/logout', 'Log Out', {onClick: this.handleLogout.bind(this)}));
        } else {
            children.push(
                makeLink('/login', 'Log In')
            );
        }

        return this.props.drawer ? (
            <Drawer title={title} className={styles.drawer}>
                <Navigation>
                    {children}
                </Navigation>
            </Drawer>
        ) : (
            <Header title={title} className={styles.navigation}>
                <Navigation>
                    {children}
                </Navigation>
            </Header>
        );
    }
}
