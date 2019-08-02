import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddedToBagViewPoints from '../views/AddedToBagViewPoints.view';
import { getCartOrderDetails } from '../../CartItemTile/container/CartItemTile.selectors';
import {
  getAddedToBagData,
  getPointsSummary,
} from '../../AddedToBag/container/AddedToBag.selectors';

export class AddedToBagViewPointsContainer extends React.Component {
  componentDidMount = () => {};

  render() {
    const { getOrderPointsSummary, labels, lastAddedToBag } = this.props;
    const pointsSummary = getPointsSummary(getOrderPointsSummary, lastAddedToBag);
    return <AddedToBagViewPoints labels={labels} pointsSummary={pointsSummary} />;
  }
}

function mapStateToProps(state) {
  return {
    getOrderPointsSummary: getCartOrderDetails(state),
    lastAddedToBag: getAddedToBagData(state),
  };
}

AddedToBagViewPointsContainer.propTypes = {
  getOrderPointsSummary: PropTypes.shape,
  labels: PropTypes.shape,
  lastAddedToBag: PropTypes.shape,
};

AddedToBagViewPointsContainer.defaultProps = {
  getOrderPointsSummary: {},
  labels: {},
  lastAddedToBag: {},
};

export default connect(mapStateToProps)(AddedToBagViewPointsContainer);
