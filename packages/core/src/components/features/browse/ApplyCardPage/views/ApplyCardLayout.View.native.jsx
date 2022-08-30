import React from 'react';
import { ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
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
          isRtpsFlow={renderViewArgs.isRtpsFlow}
          togglePLCCModal={renderViewArgs.togglePLCCModal}
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
          isRtpsFlow={renderViewArgs.isRtpsFlow}
          togglePLCCModal={renderViewArgs.togglePLCCModal}
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
          isRtpsFlow={renderViewArgs.isRtpsFlow}
          togglePLCCModal={renderViewArgs.togglePLCCModal}
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
        isRtpsFlow={renderViewArgs.isRtpsFlow}
      />
    );
  };

  onCloseCallBack = (resetPLCCApplicationStatus, closeAddressVerificationModal) => {
    resetPLCCApplicationStatus({ status: null });
    closeAddressVerificationModal();
  };

  render() {
    const {
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
      closePLCCModal,
      isRtpsFlow,
      togglePLCCModal,
    } = this.props;
    return (
      <ScrollView>
        {!showAddEditAddressForm
          ? this.renderPLCCView(labels, onSubmit, applicationStatus, bagItems, plccData, {
              approvedPLCCData,
              plccUser,
              navigation,
              toggleModal: closePLCCModal,
              profileInfo,
              isRtpsFlow,
              togglePLCCModal,
            })
          : null}
        {showAddEditAddressForm ? (
          <AddressVerification
            onSuccess={submitForm}
            plccOnClose={() =>
              this.onCloseCallBack(resetPLCCApplicationStatus, closeAddressVerificationModal)
            }
          />
        ) : null}
      </ScrollView>
    );
  }
}

ApplyCardLayoutView.propTypes = {
  plccData: PropTypes.shape({}).isRequired,
  labels: PropTypes.shape({}).isRequired,
  closePLCCModal: PropTypes.func.isRequired,
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
  togglePLCCModal: PropTypes.func.isRequired,
  isRtpsFlow: PropTypes.bool.isRequired,
};

export default withNavigation(ApplyCardLayoutView);
export { ApplyCardLayoutView as ApplyCardLayoutViewVanilla };
