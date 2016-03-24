import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { isLoaded as isInfoLoaded, load as loadInfo } from 'redux/modules/info';
import { isLoaded as isAuthLoaded, load as loadAuth, logout } from 'redux/modules/auth';
import { InfoBar } from 'components';
import { routeActions } from 'react-router-redux';
import config from '../../config';
import { asyncConnect } from 'redux-async-connect';
import Navigation from '../../components/Navigation/Navigation';
import NavDrawer from '../../components/NavDrawer/NavDrawer';
import {Layout} from 'react-mdl';

@asyncConnect([{
	promise: ({store: {dispatch, getState}}) => {
		const promises = [];

		if (!isInfoLoaded(getState())) {
			promises.push(dispatch(loadInfo()));
		}
		if (!isAuthLoaded(getState())) {
			promises.push(dispatch(loadAuth()));
		}

		return Promise.all(promises);
	}
}])
@connect(
		state => ({user: state.auth.user}),
		{logout, pushState: routeActions.push})
export default class App extends Component {
	static propTypes = {
		children: PropTypes.object.isRequired,
		user: PropTypes.object,
		logout: PropTypes.func.isRequired,
		pushState: PropTypes.func.isRequired
	};

	static contextTypes = {
		store: PropTypes.object.isRequired
	};

	componentWillReceiveProps (nextProps) {
		if (!this.props.user && nextProps.user) {
			// login
			this.props.pushState('/loginSuccess');
		} else if (this.props.user && !nextProps.user) {
			// logout
			this.props.pushState('/');
		}
	}

	handleLogout = (event) => {
		event.preventDefault();
		this.props.logout();
	};

	render () {
		const styles = require('./App.scss');
		const {user} = this.props;
// <Layout  className={styles.app}
		return (
				<Layout fixedHeader>
					<Navigation pushState={this.props.pushState} user={user} />
                    <NavDrawer pushState={this.props.pushState} user={user} />
                    <Helmet {...config.app.head}/>

					<div className={styles.appContent}>
						{this.props.children}
					</div>
					<InfoBar/>

					<div className="well text-center">
						Have questions? Ask for help <a
							href="https://github.com/erikras/react-redux-universal-hot-example/issues"
							target="_blank">on Github</a> or in the <a
							href="https://discord.gg/0ZcbPKXt5bZZb1Ko" target="_blank">#react-redux-universal</a>
						Discord channel.
					</div>
				</Layout>
		);
	}
}
