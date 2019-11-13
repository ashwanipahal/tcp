import React from 'react';
import PropTypes from 'prop-types';
import RouteTracker from '@tcp/web/src/components/common/atoms/RouteTracker';
import BagPageUtils from '@tcp/core/src/components/features/CnC/BagPage/views/Bagpage.utils';

class PickupAnalytics extends React.PureComponent {
  constructor(props) {
    super(props);
    this.analyticsFired = false;
  }

  componentDidUpdate() {
    const { setClickAnalyticsDataCheckout, cartOrderItems } = this.props;
    if (!this.analyticsFired && cartOrderItems) {
      const productsData = BagPageUtils.formatBagProductsData(cartOrderItems);
      setClickAnalyticsDataCheckout({
        customEvents: ['scCheckout', 'event86', 'event69'],
        products: productsData,
      });
      this.analyticsFired = true;
    }
  }

  render() {
    const { isBagLoaded } = this.props;
    return (
      <React.Fragment>{process.env.ANALYTICS && isBagLoaded && <RouteTracker />}</React.Fragment>
    );
  }
}

PickupAnalytics.propTypes = {
  setClickAnalyticsDataCheckout: PropTypes.func.isRequired,
  cartOrderItems: PropTypes.shape([]).isRequired,
  isBagLoaded: PropTypes.bool.isRequired,
};

export default PickupAnalytics;
