import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  isPlccUser,
  getUserLoggedInState,
} from '@tcp/core/src/components/features/account/User/container/User.selectors';
import AddedToBagViewPoints from '../views/AddedToBagViewPoints.view';
import { getCartOrderDetails } from '../../CartItemTile/container/CartItemTile.selectors';
import {
  getAddedToBagData,
  getPointsSummary,
} from '../../AddedToBag/container/AddedToBag.selectors';
import { getIsInternationalShipping } from '../../../../../reduxStore/selectors/session.selectors';
import AddedToBagSkeleton from '../../AddedToBag/skeleton/AddedToBagSkeleton.view';

export class AddedToBagViewPointsContainer extends React.Component {
  componentDidMount = () => {};

  render() {
    const {
      pointsSummary,
      labels,
      isPlcc,
      isInternationalShipping,
      isUserLoggedIn,
      inheritedStyles,
    } = this.props;
    return (
      <>
        {pointsSummary && pointsSummary.totalItems > 0 ? (
          <AddedToBagViewPoints
            labels={labels}
            pointsSummary={pointsSummary}
            isPlcc={isPlcc}
            isUserLoggedIn={isUserLoggedIn}
            isInternationalShipping={isInternationalShipping}
            inheritedStyles={inheritedStyles}
          />
        ) : (
          <AddedToBagSkeleton />
        )}
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    pointsSummary: getPointsSummary(getCartOrderDetails(state), getAddedToBagData(state)),
    isPlcc: isPlccUser(state),
    isUserLoggedIn: getUserLoggedInState(state),
    isInternationalShipping: getIsInternationalShipping(state),
  };
}

AddedToBagViewPointsContainer.propTypes = {
  pointsSummary: PropTypes.shape,
  labels: PropTypes.shape,
  isPlcc: PropTypes.bool.isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
  inheritedStyles: PropTypes.string,
  isInternationalShipping: PropTypes.bool,
};

AddedToBagViewPointsContainer.defaultProps = {
  pointsSummary: {},
  labels: {},
  isInternationalShipping: false,
  inheritedStyles: '',
};

export default connect(mapStateToProps)(AddedToBagViewPointsContainer);
