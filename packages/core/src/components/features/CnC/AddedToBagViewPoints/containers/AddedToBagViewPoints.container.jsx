import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getOrderDetails } from '../../Cart/containers/Cart.actions';
import AddedToBagViewPoints from '../views/AddedToBagViewPoints.view';
import getCartOrderList from '../../Cart/containers/Cart.selectors';
import getPointsSummary from '../../Cart/util/utility';

class AddedToBagViewPointsContainer extends React.Component {
  componentDidMount = () => {
    const { getOrderDetailsAction } = this.props;
    getOrderDetailsAction();
  };

  render() {
    const { getOrderPointsSummary } = this.props;
    const pointsSummary = getPointsSummary(getOrderPointsSummary);
    return <AddedToBagViewPoints pointsSummary={pointsSummary} />;
  }
}
function mapDispatchToProps(dispatch) {
  return {
    getOrderDetailsAction: () => {
      dispatch(getOrderDetails());
    },
  };
}

function mapStateToProps(state) {
  return {
    getOrderPointsSummary: getCartOrderList(state),
  };
}

AddedToBagViewPointsContainer.propTypes = {
  getOrderDetailsAction: PropTypes.func.isRequired,
  getOrderPointsSummary: PropTypes.shape,
};

AddedToBagViewPointsContainer.defaultProps = {
  getOrderPointsSummary: {},
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddedToBagViewPointsContainer);
