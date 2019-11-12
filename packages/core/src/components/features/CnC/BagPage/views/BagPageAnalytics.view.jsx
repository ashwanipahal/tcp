import React from 'react';
import PropTypes from 'prop-types';
import RouteTracker from '@tcp/web/src/components/common/atoms/RouteTracker';
import BagPageUtils from './Bagpage.utils';

class BagPageAnalytics extends React.PureComponent {
  constructor(props) {
    super(props);
    this.analyticsFired = false;
  }

  componentDidUpdate() {
    const { setClickAnalyticsDataBag, cartOrderItems } = this.props;
    if (!this.analyticsFired && cartOrderItems) {
      BagPageUtils.setBagPageAnalyticsData(setClickAnalyticsDataBag, cartOrderItems);
      this.analyticsFired = true;
    }
  }

  render() {
    const { isCartLoaded } = this.props;
    return (
      <React.Fragment>{process.env.ANALYTICS && isCartLoaded && <RouteTracker />}</React.Fragment>
    );
  }
}

BagPageAnalytics.propTypes = {
  setClickAnalyticsDataBag: PropTypes.func.isRequired,
  cartOrderItems: PropTypes.shape([]).isRequired,
  isCartLoaded: PropTypes.bool.isRequired,
};

export default BagPageAnalytics;
