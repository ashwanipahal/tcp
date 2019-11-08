import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetPLCCResponse } from '@tcp/core/src/components/features/browse/ApplyCardPage/container/ApplyCard.actions';
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
    const { labels, isPLCCModalOpen, openApplyNowModal, navigation } = this.props;

    return (
      <MyPlaceRewardsCreditCard
        labels={labels}
        isPLCCModalOpen={isPLCCModalOpen}
        openPLCCModal={this.openPLCCModal}
        openApplyNowModal={openApplyNowModal}
        navigation={navigation}
      />
    );
  }
}

MyPlaceRewardsCreditCardContainer.propTypes = {
  labels: PropTypes.shape({}),
  isPLCCModalOpen: PropTypes.bool,
  toggleModal: PropTypes.func.isRequired,
  openApplyNowModal: PropTypes.func.isRequired,
  navigation: PropTypes.func.isRequired,
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
    openApplyNowModal: payload => {
      dispatch(toggleApplyNowModal(payload));
      dispatch(resetPLCCResponse(payload));
    },
  };
};

export const mapStateToProps = state => {
  return {
    labels: gelLabels(state),
    isPLCCModalOpen: getIsPLCCModalOpen(state),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPlaceRewardsCreditCardContainer);

export { MyPlaceRewardsCreditCardContainer as MyPlaceRewardsCreditCardContainerVanilla };
