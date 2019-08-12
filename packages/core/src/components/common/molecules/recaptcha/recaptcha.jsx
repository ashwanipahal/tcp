import React from 'react';
import { requireNamedOnlineModule } from '../../../../utils/resourceLoader';

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
    /* istanbul ignore else */
    if (verifyCallback) verifyCallback(response);
  };

  handleExpired = () => {
    // TODO: need to show an error on top of recaptcha
    this.reset();
    const { expiredCallback } = this.props;
    /* istanbul ignore else */
    if (expiredCallback) expiredCallback();
  };

  attachToRef = refToContainer => {
    this.refToContainer = refToContainer;
    const { widget } = this.state;
    /* istanbul ignore else */
    if (refToContainer !== null && !widget) {
      requireNamedOnlineModule('recaptcha').then(this.checkReady);
    }
  };

  reset = () => {
    const { ready, widget } = this.state;
    /* istanbul ignore else */
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
    /* istanbul ignore else */
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
