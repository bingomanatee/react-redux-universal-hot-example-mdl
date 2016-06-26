import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
// import config from '../../config';
import Helmet from 'react-helmet';
import {Textfield, Icon, List, ListItem, Button} from 'react-mdl'; // Card, CardTitle, CardText, CardActions, Button
const lodash = require('lodash');
import * as twitterActions from 'redux/modules/twitter';

@connect(
    state => ({user: state.auth.user, twitterUsers: state.twitter.users || []}),
    twitterActions)
export default class TastesLIkeChicken extends Component {
    static propTypes = {
        user: PropTypes.object,
        userSearch: PropTypes.func,
        twitterUsers: PropTypes.array
    };

    _updateSearchPhrase(phrase) {
        console.log('API searching for ', phrase);
        this.props.userSearch(phrase);
    }

    render() {
        const styles = require('./TastesLIkeChicken.scss');
        const chooseIconStyle = {
            backgroundImage: 'url(/img/icons/rightForkIcon.svg)'
        };
        const chooseIconOverStyle = {
            backgroundImage: 'url(/img/icons/rightForkIconOver.svg)'
        };

        let content = '';
        const twitterUsers = (this.props && this.props.twitterUsers) ? this.props.twitterUsers : [];
        const userList = twitterUsers.map(user => <ListItem key={user.id}>
            <div className={styles.userListItem}>
                <div className={styles.userListItem__icon}>
                    <img src={user.profile_image_url}/>
                </div>
                <div className={styles.userListItem__body}>
                    <h3> {user.name}</h3>
                    <p> {user.description}</p>
                </div>
                <div className={styles.userListItem__choose}>
                    <div className={styles.userListItemChooseButton}>
                        <Button primary ripple>Eat Them!</Button>
                    </div>
                    <div className={styles.userListItemChoose__icon}>
                        <div className={styles.userListItemChoose__iconInner}
                             style={chooseIconStyle}>&nbsp;</div>
                        <div className={styles.userListItemChoose__iconInnerOver}
                             style={chooseIconOverStyle}>&nbsp;</div>
                    </div>
                </div>
            </div>
        </ListItem>);

        if (this.props.user) {
            content = (
                <div>
                    Lets eat some twitter users!
                </div>
            );
        } else {
            // @TODO: probably unreachable...
            content = (
                <div>
                    <p>
                        <Link to="/login">Log In</Link> to start eating your friends.
                    </p>
                </div>
            );
        }

        const debouncedChange = lodash.debounce((phrase) => {
            this._updateSearchPhrase(phrase);
        }, 1500);

        const searchPhraseChange = (event) => {
            debouncedChange(event.target.value);
        };
        const searchField = (<Textfield
            onChange={searchPhraseChange}
            label="Twitter Username"
            floatingLabel
        />);

        const userListStyle = {
            maxWidth: '60rem'
        };
        return (
            <div>
                <Helmet title="Tastes Like Chicken"/>
                <div className="container">
                    <h1>Tastes Like Chicken!</h1>
                    {content}
                    <div className={styles.tlcSearch}>
                        <div className={styles.tlcSearchPrompt}>Search for twitter users by name:</div>
                        <div className={styles.tlcSearchField}>
                            <div className={styles.tlcSearchFieldField}>
                                {searchField}
                            </div>
                            <div className={styles.tlcSearchFieldIcon}>
                                <Icon name="search"/>
                            </div>
                        </div>
                    </div>
                    <div className={twitterUsers}>
                        <List style={userListStyle}>
                            {userList}
                        </List>
                    </div>
                </div>
            </div>
        );
    }
}
