import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import ModalNative from '../../../../common/molecules/Modal';
import PLCCForm from '../molecules/Form/PLCCForm/PLCCForm';
import constants from '../RewardsCard.constants';
import ApplicationInProgress from '../molecules/Common/UnderProgressApplication/ApplicationInProgress.native';
import ExistingPLCCUserView from '../molecules/Common/ExistingPLCCUser/ExistingPLCCUser.view.native';
import ApprovedPLCCApplicationView from '../molecules/Common/ApprovedPLCCApplication/ApprovedPLCCApplication.native';
import AddressVerification from '../../../../common/organisms/AddressVerification/container/AddressVerification.container';

class ApplyCardLayoutView extends React.PureComponent {
  renderPLCCView = (
    labels,
    onSubmit,
    applicationStatus,
    bagItems,
    plccData,
    renderViewArgs = {}
  ) => {
    if (applicationStatus === constants.APPLICATION_STATE_PENDING) {
      return (
        <ApplicationInProgress
          labels={labels}
          bagItems={bagItems}
          navigation={renderViewArgs.navigation}
          toggleModal={renderViewArgs.toggleModal}
        />
      );
    }
    if (applicationStatus === constants.APPLICATION_STATE_EXISTING && !renderViewArgs.plccUser) {
      return (
        <ExistingPLCCUserView
          bagItems={bagItems}
          labels={labels}
          existingCustomerDetails={plccData && plccData.plcc_existing_customer_details}
          navigation={renderViewArgs.navigation}
          toggleModal={renderViewArgs.toggleModal}
        />
      );
    }
    if (applicationStatus === constants.APPLICATION_STATE_APPROVED) {
      return (
        <ApprovedPLCCApplicationView
          bagItems={bagItems}
          labels={labels}
          plccData={plccData}
          approvedPLCCData={renderViewArgs.approvedPLCCData}
          navigation={renderViewArgs.navigation}
          toggleModal={renderViewArgs.toggleModal}
        />
      );
    }
    return (
      <PLCCForm
        onSubmit={onSubmit}
        labels={labels}
        plccData={plccData}
        toggleModal={renderViewArgs.toggleModal}
        initialValues={renderViewArgs.profileInfo}
      />
    );
  };

  onCloseCallBack = (resetPLCCApplicationStatus, closeAddressVerificationModal) => {
    resetPLCCApplicationStatus({ status: null });
    closeAddressVerificationModal();
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
      showAddEditAddressForm,
      submitForm,
      resetPLCCApplicationStatus,
      closeAddressVerificationModal,
      profileInfo,
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
        <View>
          {!showAddEditAddressForm
            ? this.renderPLCCView(labels, onSubmit, applicationStatus, bagItems, plccData, {
                approvedPLCCData,
                plccUser,
                navigation,
                toggleModal,
                profileInfo,
              })
            : null}
          {showAddEditAddressForm ? (
            <AddressVerification
              onSuccess={submitForm}
              // plccOnSubmit={this.onSubmitCallBack}
              plccOnClose={() =>
                this.onCloseCallBack(resetPLCCApplicationStatus, closeAddressVerificationModal)
              }
            />
          ) : null}
        </View>
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
  submitForm: PropTypes.func.isRequired,
  showAddEditAddressForm: PropTypes.bool.isRequired,
  profileInfo: PropTypes.shape({}).isRequired,
  resetPLCCApplicationStatus: PropTypes.func.isRequired,
  closeAddressVerificationModal: PropTypes.func.isRequired,
};

export default withNavigation(ApplyCardLayoutView);
