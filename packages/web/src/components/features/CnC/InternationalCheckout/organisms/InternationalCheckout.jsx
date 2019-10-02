import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { requireUrlScript } from '@tcp/core/src/utils/resourceLoader';
import styles from '../styles/InternationalCheckoutPage.style';

/**
 *
 *
 * @class InternationalCheckout
 * @extends {PureComponent}
 * @description view component to render iframe for international checkout.
 */
class InternationalCheckout extends PureComponent {
  static propTypes = {
    /** url of the js file controlling communication between iframe and outside */
    apiUrl: PropTypes.string.isRequired,

    /** url of the communication iframe */
    communicationUrl: PropTypes.string.isRequired,

    /** international checkout iframe url */
    iframeUrl: PropTypes.string.isRequired,

    className: PropTypes.string.isRequired,
  };

  /**
   * @function componentDidMount
   * @memberof InternationalCheckout
   * @description method to be called on mount of component
   */
  componentDidMount() {
    // create form and submit
    const { apiUrl } = this.props;
    requireUrlScript(apiUrl);
  }

  /**
   * @function render
   * @description render method to be called of component
   */
  render() {
    const { iframeUrl, communicationUrl, className } = this.props;

    return (
      <div className={className}>
        <iframe
          title="internationalCheckout"
          className="__frame"
          width="0"
          height="0"
          frameBorder="0"
          src={communicationUrl}
        />
        <iframe
          title="internationalCheckout"
          name="envoy"
          className="envoyId"
          src={iframeUrl}
          frameBorder="0"
          scrolling="yes"
        />
      </div>
    );
  }
}

export default withStyles(InternationalCheckout, styles);
export { InternationalCheckout as InternationalCheckoutVanilla };
