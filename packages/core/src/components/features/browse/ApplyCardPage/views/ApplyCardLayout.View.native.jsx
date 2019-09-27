/* eslint-disable max-params */
/* eslint-disable no-else-return */
import React from 'react';
import PropTypes from 'prop-types';
import ModalNative from '../../../../common/molecules/Modal';
import PLCCForm from '../molecules/Form/PLCCForm/PLCCForm';
import constants from '../RewardsCard.constants';
import ApplicationInProgress from '../molecules/Common/UnderProgressApplication/ApplicationInProgress.native';

class ApplyCardLayoutView extends React.PureComponent {
  renderPLCCView = (labels, onSubmit, applicationStatus, bagItems, plccData) => {
    if (applicationStatus === constants.APPLICATION_STATE_PENDING) {
      return <ApplicationInProgress labels={labels} bagItems={bagItems} />;
    } else {
      return <PLCCForm onSubmit={onSubmit} labels={labels} plccData={plccData} />;
    }
  };

  render() {
    const fullWidth = {
      width: '100%',
    };
    const {
      applyCard,
      toggleModal,
      plccData,
      labels,
      onSubmit,
      applicationStatus,
      bagItems,
    } = this.props;
    return (
      <ModalNative
        onRequestClose={toggleModal}
        horizontalBar={false}
        headingAlign="center"
        headingFontFamily="secondary"
        fontSize="fs22"
        headerStyle={fullWidth}
        isOpen={applyCard}
      >
        {this.renderPLCCView(labels, onSubmit, applicationStatus, bagItems, plccData)}
      </ModalNative>
    );
  }
}

ApplyCardLayoutView.propTypes = {
  plccData: PropTypes.shape({}).isRequired,
  labels: PropTypes.shape({}).isRequired,
  applyCard: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  applicationStatus: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  bagItems: PropTypes.bool.isRequired,
};

export default ApplyCardLayoutView;
