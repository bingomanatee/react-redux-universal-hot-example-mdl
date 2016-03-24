import React, {Component, PropTypes} from 'react';
import {connect  } from 'react-redux';
import NavInner from  '../NavInner/NavInner';
import { Drawer} from 'react-mdl';
import Title from '../Title/Title';

@connect((state) => state, {})
export default class TopNavigation extends Component {
    static propTypes = {
        user: PropTypes.object,
        navstyles: PropTypes.object,
        pushState: PropTypes.func.isRequired
    };

    render() {
        const style = require('./NavDrawer.scss');
        return (
          <Drawer title={<Title />} className={style.drawer}>
              <NavInner user={this.props.user} pushState={this.props.pushState}/>
          </Drawer>
        );
    }
}
