import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  isPlccUser,
  getUserLoggedInState,
} from '@tcp/core/src/components/features/account/User/container/User.selectors';
import BAGPAGE_SELECTORS from '../../BagPage/container/BagPage.selectors';
import AddedToBagViewPoints from '../views/AddedToBagViewPoints.view';
import { getCartOrderDetails } from '../../CartItemTile/container/CartItemTile.selectors';
import {
  getAddedToBagData,
  getPointsSummary,
} from '../../AddedToBag/container/AddedToBag.selectors';
import { getIsInternationalShipping } from '../../../../../reduxStore/selectors/session.selectors';

export class AddedToBagViewPointsContainer extends React.Component {
  componentDidMount = () => {};

  render() {
    const {
      pointsSummary,
      labels,
      isPlcc,
      currencySymbol,
      isInternationalShipping,
      isUserLoggedIn,
      inheritedStyles,
    } = this.props;
    return (
      <AddedToBagViewPoints
        labels={labels}
        pointsSummary={pointsSummary}
        isPlcc={isPlcc}
        isUserLoggedIn={isUserLoggedIn}
        currencySymbol={currencySymbol}
        isInternationalShipping={isInternationalShipping}
        inheritedStyles={inheritedStyles}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    pointsSummary: getPointsSummary(getCartOrderDetails(state), getAddedToBagData(state)),
    isPlcc: isPlccUser(state),
    isUserLoggedIn: getUserLoggedInState(state),
    currencySymbol: BAGPAGE_SELECTORS.getCurrentCurrency(state) || '$',
    isInternationalShipping: getIsInternationalShipping(state),
  };
}

AddedToBagViewPointsContainer.propTypes = {
  pointsSummary: PropTypes.shape,
  labels: PropTypes.shape,
  isPlcc: PropTypes.bool.isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
  inheritedStyles: PropTypes.string,
  currencySymbol: PropTypes.string.isRequired,
  isInternationalShipping: PropTypes.bool,
};

AddedToBagViewPointsContainer.defaultProps = {
  pointsSummary: {},
  labels: {},
  isInternationalShipping: false,
  inheritedStyles: '',
};

export default connect(mapStateToProps)(AddedToBagViewPointsContainer);
