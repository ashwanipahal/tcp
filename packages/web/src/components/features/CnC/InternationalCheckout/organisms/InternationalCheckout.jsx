import React from 'react';
import { PropTypes } from 'prop-types';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { requireUrlScript } from '@tcp/core/src/utils/resourceLoader';
import styles from '../styles/InternationalCheckoutPage.style';

class InternationalCheckout extends React.PureComponent {
  static propTypes = {
    /** url of the js file controlling communication between iframe and outside */
    apiUrl: PropTypes.string.isRequired,

    /** url of the communication iframe */
    communicationUrl: PropTypes.string.isRequired,

    /** international checkout iframe url */
    iframeUrl: PropTypes.string.isRequired,

    className: PropTypes.string.isRequired,
  };

  componentDidMount() {
    // create form and submit
    const { apiUrl } = this.props;
    requireUrlScript(apiUrl);
  }

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
          scrolling="no"
        />
      </div>
    );
  }
}

export default withStyles(InternationalCheckout, styles);
export { InternationalCheckout as InternationalCheckoutVanilla };
