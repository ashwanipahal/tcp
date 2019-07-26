import { connect } from 'react-redux';
import React from 'react';
import { PropTypes } from 'prop-types';
import { initActions } from '../components/features/content/HomePage/container/HomePage.actions';
/* eslint-disable */
import fetch from 'superagent';

const DOMAIN = '.childrensplace.com';
const TEMP_CART_ITEM_COUNT = 'tempcartItemsCount';

class CookiesTestView extends React.Component {
  constructor(props) {
    super(props);
    console.log('constrcter called');
    this.state = {
      payload: '',
      targetDomain: 'test1.gymboree.com',
      redirectDomain: 'test1.gymboree.com',
      actionurl: 'https://test1.gymboree.com/api/v2/appconfig/navigate',
    };

    this.changeDomain = this.changeDomain.bind(this);
    this.changeRedirectDomain = this.changeRedirectDomain.bind(this);
    this.initCookieTransfer = this.initCookieTransfer.bind(this);
    this.formUpdateCookie = this.formUpdateCookie.bind(this);
    this.updateActionUrl = this.updateActionUrl.bind(this);
    this.readCookieNative = this.readCookieNative.bind(this);
  }

  formUpdateCookie() {
    const values = this.readCookieNative();
    const keys = Object.keys(values);

    const payload = {
      cookie: [
        {
          domain: DOMAIN,
          name: TEMP_CART_ITEM_COUNT,
          path: '/',
          secure: false,
          value: values.cartItemsCount,
        },
      ],
    };

    keys.filter(key => {
      if (key.indexOf('WC_') === 0) {
        payload.cookie.push({
          domain: DOMAIN,
          name: key,
          path: '/',
          secure: false,
          value: encodeURIComponent(values[key]),
        });
        /* eslint-disable */
        return true;
      } else {
        /* eslint-disable */
        return false;
      }
    });

    this.setState({
      payload: JSON.stringify(payload),
    });
  }

  updateActionUrl(e) {
    this.setState({
      actionurl: e.target.value,
    });
  }

  initCookieTransfer() {
    let values = this.readCookieNative();
    let keys = Object.keys(values);

    let payload = {
      cookie: [
        {
          domain: DOMAIN,
          name: TEMP_CART_ITEM_COUNT,
          path: '/',
          secure: false,
          value: values.cartItemsCount,
        },
      ],
    };

    keys.filter(key => {
      if (key.indexOf('WC_') === 0) {
        payload.cookie.push({
          domain: DOMAIN,
          name: key,
          path: '/',
          secure: false,
          value: encodeURIComponent(values[key]),
        });
        return true;
      } else {
        return false;
      }
    });

    this.setState({
      payload: JSON.stringify(payload),
    });

    console.log(
      '== HITTING URL : ',
      'https://' + this.state.targetDomain + '/api/v2/appconfig/navigateXHR'
    );

    const req = fetch.post('https://' + this.state.targetDomain + '/api/v2/appconfig/navigateXHR');
    req
      .set('Content-Type', 'application/json')
      .set(
        'targetDomain',
        this.state.targetDomain.substr(this.state.targetDomain.split('.')[0].length)
      )
      .set('Accept', 'application/json')
      .send(JSON.stringify(payload))
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          console.log(`on XHR Success Nagivation`);
        }
      })
      .catch(err => {
        // err.message, err.response
        console.log(err);
      });
  }

  readCookieNative() {
    let values = document.cookie.split(';');
    let cookies = {};
    values &&
      values.map(function(cookie) {
        cookies[cookie.split('=')[0].trim()] = cookie.split('=')[1].trim();
        return cookies;
      });
    return cookies;
  }

  changeDomain(event) {
    this.setState({ targetDomain: event.target.value });
  }

  changeRedirectDomain(event) {
    this.setState({ redirectDomain: event.target.value });
  }

  render() {
    return (
      <div>
        <span>Target Domain</span>
        <input type="text" value={this.state.targetDomain} onChange={this.changeDomain} />
        <br />
        <span>Redirect Domain</span>
        <input type="text" value={this.state.redirectDomain} onChange={this.changeRedirectDomain} />
        <br />
        <button type="button" onClick={this.initCookieTransfer}>
          GYMBOREE
        </button>
        <button type="button" onClick={this.formUpdateCookie}>
          Populate
        </button>
        <br />
        <br />
        <h2>Form</h2>
        <div>
          Action URL :
          <input
            type="text"
            name="actionurl"
            onChange={this.updateActionUrl}
            value={this.state.actionurl}
          />
        </div>
        <form action={this.state.actionurl} method="POST">
          <span>Payload</span>
          <input type="text" name="payload" value={this.state.payload} />
          <input type="hidden" value=".gymboree.com" id="targetDomain" name="targetDomain" />
          <br />
          <button type="submit">GYMBOREE FORM</button>
        </form>
      </div>
    );
  }
}

CookiesTestView.propTypes = {
  links: PropTypes.arrayOf.isRequired,
};

CookiesTestView.getInitActions = () => initActions;

const mapStateToProps = state => {
  return {
    links: state.HomePage.links,
  };
};

export default connect(mapStateToProps)(CookiesTestView);
