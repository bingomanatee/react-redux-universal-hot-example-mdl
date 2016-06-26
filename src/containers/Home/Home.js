import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
// import config from '../../config';
import Helmet from 'react-helmet';
import {Card, CardTitle, CardText, CardActions, Button} from 'react-mdl';
import { routeActions } from 'react-router-redux';

@connect(state => ({user: state.auth.user}),
    {pushState: routeActions.push}
)
export default class Home extends Component {
    static propTypes = {
        pushState: PropTypes.func.isRequired,
        user: PropTypes.object
    };

    render() {
        let content = '';
        const go = (link) => () => {
            console.log('going to ', link);
            this.props.pushState(link);
        };

        const styles = require('./Home.scss');
        if (this.props.user) {
            const cardTitleStyle = {
                color: '#fff', height: '176px',
                background: 'url(/img/tastesLikeChicken.png) right center  / contain',
                backgroundRepeat: 'no-repeat'
            };
            const cardStyle = {width: '512px', margin: 'auto', backgroundColor: 'blue'};
            const click = {
                onClick: go('/tastesLikeChicken')
            };
            content = (
                <div>
                    <h1>Welcome Back to EatYourFriends.club</h1>
                    <p>Let's eat some friends!</p>
                    <Card shadow={0} style={cardStyle} className="mdl-color--blue-700">
                        <CardTitle style={cardTitleStyle}>Tastes Like Chicken!</CardTitle>
                        <CardText>
                            Let's eat some of your twitter friends and followers...
                        </CardText>
                        <CardActions border>
                            <Button {...click} accent
                                               className="mdl-color-text--deep-orange-200">Eat Twitter Users</Button>
                        </CardActions>
                    </Card>
                </div>
            );
        } else {
            content = (
                <div>
                    <h1>Welcome to EatYourFriends.club</h1>
                    <p>
                        <Link to="/login">Log In</Link> to start eating your friends.
                    </p>
                </div>
            );
        }

        return (
            <div className={styles.home}>
                <Helmet title="Home"/>
                <div className="container">
                    {content}
                </div>
            </div>
        );
    }
}

/*
 <Card shadow={0} style={{width: '512px', margin: 'auto'}}>
 <CardTitle style={cardStyle}>Welcome</CardTitle>
 <CardText>
 Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 Mauris sagittis pellentesque lacus eleifend lacinia...
 </CardText>
 </Card>
 <CardActions border>
 <Button colored>Get Started</Button>
 </CardActions>
 <CardMenu style={{color: '#fff'}}>
 <IconButton name="share" />
 </CardMenu>
 */
