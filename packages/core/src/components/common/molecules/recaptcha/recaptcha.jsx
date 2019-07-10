import React from 'react';
import { requireNamedOnlineModule } from '../../atoms/GoogleAutoSuggest/resourceLoader';

// @flow

type Props = {
  className: string,
  verifyCallback: any,
  expiredCallback: any,
  sitekey?: any,
  onloadCallback: any,
};

export default class Recaptcha extends React.Component<Props> {
  constructor(props) {
    super(props);
    this.renderGrecaptcha = this.renderGrecaptcha.bind(this);

    this.checkReady = this.checkReady.bind(this); // recaptcha base includes other js we need to wait before initializing anything

    this.handleExpired = this.handleExpired.bind(this);
    this.handleVerify = this.handleVerify.bind(this);
    this.attachToRef = this.attachToRef.bind(this);
    this.reset = this.reset.bind(this);

    this.state = {
      ready: false,
      widget: null,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { ready, widget } = this.state;
    if (ready && !prevState.ready && !widget) {
      this.renderGrecaptcha();
    }
  }

  checkReady = () => {
    if (window.grecaptcha && window.grecaptcha.render) {
      this.setState({
        ready: true,
      });
    } else {
      setTimeout(this.checkReady, 100);
    }
  };

  attachToRef(refToContainer) {
    this.refToContainer = refToContainer;
    const { widget } = this.state;

    if (refToContainer !== null && !widget) {
      // can be null for example when React unmounts this components
      requireNamedOnlineModule('recaptcha').then(this.checkReady);
    }
  }

  handleVerify(response) {
    const { verifyCallback } = this.props;
    if (verifyCallback) verifyCallback(response);
  }

  handleExpired() {
    // TODO: need to show an error on top of recaptcha
    this.reset();
    const { expiredCallback } = this.props;
    if (expiredCallback) expiredCallback();
  }

  reset() {
    const { widget } = this.state;
    window.grecaptcha.reset(widget);
  }

  renderGrecaptcha() {
    const { sitekey, onloadCallback } = this.props;
    this.state.widget = window.grecaptcha.render(this.refToContainer, {
      sitekey: [sitekey], // eslint object-shorthand
      callback: this.handleVerify,

      'expired-callback': this.handleExpired,
    });
    if (onloadCallback) onloadCallback();
  }

  render() {
    const { className, sitekey } = this.props;

    return (
      <div className="recaptcha">
        <div className={className} ref={this.attachToRef} data-sitekey={sitekey} />
      </div>
    );
  }
}

Recaptcha.defaultProps = {
  sitekey: '6LdYiRsTAAAAAHF4Yntsq8mPdWgHaTTFHsk8rax8',
};
