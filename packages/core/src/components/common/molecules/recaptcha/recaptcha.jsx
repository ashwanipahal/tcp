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

  handleVerify = response => {
    const { verifyCallback } = this.props;
    if (verifyCallback) verifyCallback(response);
  };

  handleExpired = () => {
    // TODO: need to show an error on top of recaptcha
    this.reset();
    const { expiredCallback } = this.props;
    if (expiredCallback) expiredCallback();
  };

  attachToRef = refToContainer => {
    this.refToContainer = refToContainer;
    const { widget } = this.state;

    if (refToContainer !== null && !widget) {
      requireNamedOnlineModule('recaptcha').then(this.checkReady);
    }
  };

  reset = () => {
    const { ready, widget } = this.state;
    if (ready) {
      window.grecaptcha.reset(widget);
    }
  };

  renderGrecaptcha = () => {
    const { sitekey, onloadCallback } = this.props;
    const widget = window.grecaptcha.render(this.refToContainer, {
      sitekey: [sitekey],
      callback: this.handleVerify,
      'expired-callback': this.handleExpired,
    });
    this.setState({ widget });
    if (onloadCallback) onloadCallback();
  };

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
