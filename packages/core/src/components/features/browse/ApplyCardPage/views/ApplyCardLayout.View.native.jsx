/* eslint-disable max-params */
/* eslint-disable no-else-return */
import React from 'react';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import ModalNative from '../../../../common/molecules/Modal';
import PLCCForm from '../molecules/Form/PLCCForm/PLCCForm';
import constants from '../RewardsCard.constants';
import ApplicationInProgress from '../molecules/Common/UnderProgressApplication/ApplicationInProgress.native';
import ExistingPLCCUserView from '../molecules/Common/ExistingPLCCUser/ExistingPLCCUser.view.native';
import ApprovedPLCCApplicationView from '../molecules/Common/ApprovedPLCCApplication/ApprovedPLCCApplication.native';

class ApplyCardLayoutView extends React.PureComponent {
  renderPLCCView = (
    labels,
    onSubmit,
    applicationStatus,
    bagItems,
    plccData,
    approvedPLCCData,
    plccUser,
    navigation,
    toggleModal
  ) => {
    if (applicationStatus === constants.APPLICATION_STATE_PENDING) {
      return (
        <ApplicationInProgress
          labels={labels}
          bagItems={bagItems}
          navigation={navigation}
          toggleModal={toggleModal}
        />
      );
    } else if (applicationStatus === constants.APPLICATION_STATE_EXISTING && !plccUser) {
      return (
        <ExistingPLCCUserView
          bagItems={bagItems}
          labels={labels}
          existingCustomerDetails={plccData && plccData.plcc_existing_customer_details}
          navigation={navigation}
          toggleModal={toggleModal}
        />
      );
    } else if (applicationStatus === constants.APPLICATION_STATE_APPROVED) {
      return (
        <ApprovedPLCCApplicationView
          bagItems={bagItems}
          labels={labels}
          plccData={plccData}
          approvedPLCCData={approvedPLCCData}
          navigation={navigation}
          toggleModal={toggleModal}
        />
      );
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
      approvedPLCCData,
      plccUser,
      navigation,
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
        {this.renderPLCCView(
          labels,
          onSubmit,
          applicationStatus,
          bagItems,
          plccData,
          approvedPLCCData,
          plccUser,
          navigation,
          toggleModal
        )}
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
  approvedPLCCData: PropTypes.shape({}).isRequired,
  navigation: PropTypes.func.isRequired,
  plccUser: PropTypes.bool.isRequired,
};

export default withNavigation(ApplyCardLayoutView);
