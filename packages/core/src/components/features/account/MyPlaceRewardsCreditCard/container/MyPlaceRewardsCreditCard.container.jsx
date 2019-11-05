import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MyPlaceRewardsCreditCard from '../views';
import gelLabels from './MyPlaceRewardsCreditCard.selectors';
import { getIsPLCCModalOpen } from '../../../../common/molecules/ApplyNowPLCCModal/container/ApplyNowModal.selectors';
import { toggleApplyNowModal } from '../../../../common/molecules/ApplyNowPLCCModal/container/ApplyNowModal.actions';

export class MyPlaceRewardsCreditCardContainer extends PureComponent {
  openPLCCModal = e => {
    e.preventDefault();
    const { toggleModal } = this.props;
    toggleModal({ isModalOpen: false, isPLCCModalOpen: true });
  };

  render() {
    const { labels, isPLCCModalOpen } = this.props;
    return (
      <MyPlaceRewardsCreditCard
        labels={labels}
        isPLCCModalOpen={isPLCCModalOpen}
        openPLCCModal={this.openPLCCModal}
      />
    );
  }
}

MyPlaceRewardsCreditCardContainer.propTypes = {
  labels: PropTypes.shape({}),
  isPLCCModalOpen: PropTypes.bool,
  toggleModal: PropTypes.func.isRequired,
};

MyPlaceRewardsCreditCardContainer.defaultProps = {
  labels: {},
  isPLCCModalOpen: false,
};

const mapDispatchToProps = dispatch => {
  return {
    toggleModal: payload => {
      dispatch(toggleApplyNowModal(payload));
    },
  };
};
const mapStateToProps = state => {
  return {
    labels: gelLabels(state),
    isPLCCModalOpen: getIsPLCCModalOpen(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPlaceRewardsCreditCardContainer);
