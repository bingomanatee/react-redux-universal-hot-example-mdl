import React, {Component} from 'react';
import { IndexLink } from 'react-router';
import config from '../../config';

export default class Title extends Component {
    render() {
        const style = require('./Title.scss');
        return (
          <div className={style['brand-link']}>
              <img src="/img/icons/logoBlack.svg" className={style['brand-link__logo']}/>
              <IndexLink to="/">{config.app.title }</IndexLink>
          </div>
        );
    }
}
