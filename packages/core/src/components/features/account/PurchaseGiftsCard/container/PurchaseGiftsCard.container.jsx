import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PurchaseGiftsCard from '../views';
import { getLabels } from '../../Account/container/Account.selectors';

export class PurchaseGiftsCardContainer extends React.PureComponent {
  render() {
    const { navigation, labels } = this.props;
    return <PurchaseGiftsCard labels={labels} navigation={navigation} />;
  }
}

PurchaseGiftsCardContainer.propTypes = {
  labels: PropTypes.shape({}),
  navigation: PropTypes.func.isRequired,
};

PurchaseGiftsCardContainer.defaultProps = {
  labels: {},
};

const mapStateToProps = state => ({
  labels: getLabels(state),
});

export default connect(
  mapStateToProps,
  null
)(PurchaseGiftsCardContainer);
