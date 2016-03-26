import React, {Component, PropTypes} from 'react';
import {connect  } from 'react-redux';
import NavInner from  '../NavInner/NavInner';
import { Header} from 'react-mdl';
import Title from '../Title/Title';

@connect((state) => state, {})
export default class TopNavigation extends Component {
    static propTypes = {
        user: PropTypes.object,
        navstyles: PropTypes.object,
        pushState: PropTypes.func.isRequired
    };

    render() {
        return (
          <Header title={<Title />}>
              <NavInner user={this.props.user} className="mdl-layout--large-screen-only" pushState={this.props.pushState} />
          </Header>
        );
    }
}
