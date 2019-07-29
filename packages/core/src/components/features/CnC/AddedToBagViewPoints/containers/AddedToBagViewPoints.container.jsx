import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getOrderDetails } from '../../Cart/containers/Cart.actions';
import AddedToBagViewPoints from '../views/AddedToBagViewPoints.view';
import getCartOrderList from '../../Cart/containers/Cart.selectors';
import { getAddedToBagData } from '../../AddedToBag/container/AddedToBag.selectors';
import getPointsSummary from '../../Cart/util/utility';

export class AddedToBagViewPointsContainer extends React.Component {
  componentDidMount = () => {
    // eslint-disable-next-line no-unused-vars
    const { getOrderDetailsAction } = this.props;
    // eslint-disable-next-line extra-rules/no-commented-out-code
    // getOrderDetailsAction();
  };

  render() {
    const { getOrderPointsSummary, labels, lastAddedToBag } = this.props;
    const pointsSummary = getPointsSummary(getOrderPointsSummary, lastAddedToBag);
    return <AddedToBagViewPoints labels={labels} pointsSummary={pointsSummary} />;
  }
}
export const mapDispatchToProps = dispatch => {
  return {
    getOrderDetailsAction: () => {
      dispatch(getOrderDetails());
    },
  };
};

function mapStateToProps(state) {
  return {
    getOrderPointsSummary: getCartOrderList(state),
    lastAddedToBag: getAddedToBagData(state),
  };
}

AddedToBagViewPointsContainer.propTypes = {
  getOrderDetailsAction: PropTypes.func.isRequired,
  getOrderPointsSummary: PropTypes.shape,
  labels: PropTypes.shape,
  lastAddedToBag: PropTypes.shape,
};

AddedToBagViewPointsContainer.defaultProps = {
  getOrderPointsSummary: {},
  labels: {},
  lastAddedToBag: {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddedToBagViewPointsContainer);
