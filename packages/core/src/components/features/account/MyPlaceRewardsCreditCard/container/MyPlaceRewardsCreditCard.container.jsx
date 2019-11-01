import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MyPlaceRewardsCreditCard from '../views';
import gelLabels from './MyPlaceRewardsCreditCard.selectors';
import { getIsPLCCModalOpen } from '../../../../common/molecules/ApplyNowPLCCModal/container/ApplyNowModal.selectors';
import { toggleApplyNowModal } from '../../../../common/molecules/ApplyNowPLCCModal/container/ApplyNowModal.actions';
import { resetPLCCResponse } from '../../../browse/ApplyCardPage/container/ApplyCard.actions';

export class MyPlaceRewardsCreditCardContainer extends PureComponent {
  componentDidMount() {
    const { resetPLCCApplicationStatus } = this.props;
    resetPLCCApplicationStatus({ status: null });
  }

  openPLCCModal = e => {
    e.preventDefault();
    const { toggleModal } = this.props;
    toggleModal({ isModalOpen: false, isPLCCModalOpen: true });
  };

  closePLCCModal = () => {
    const { toggleModal, resetPLCCApplicationStatus } = this.props;
    toggleModal({ isPLCCModalOpen: false });
    resetPLCCApplicationStatus({ status: null });
  };

  render() {
    const { labels, isPLCCModalOpen } = this.props;
    return (
      <MyPlaceRewardsCreditCard
        labels={labels}
        isPLCCModalOpen={isPLCCModalOpen}
        openPLCCModal={this.openPLCCModal}
        closePLCCModal={this.closePLCCModal}
      />
    );
  }
}

MyPlaceRewardsCreditCardContainer.propTypes = {
  labels: PropTypes.shape({}),
  isPLCCModalOpen: PropTypes.bool,
  toggleModal: PropTypes.func.isRequired,
  resetPLCCApplicationStatus: PropTypes.func.isRequired,
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
    resetPLCCApplicationStatus: payload => {
      dispatch(resetPLCCResponse(payload));
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
