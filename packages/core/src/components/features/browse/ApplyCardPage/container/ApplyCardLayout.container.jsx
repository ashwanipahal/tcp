/* eslint-disable extra-rules/no-commented-out-code */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toggleApplyNowModal } from '@tcp/core/src/components/common/molecules/ApplyNowPLCCModal/container/ApplyNowModal.actions';
import ApplyCardLayoutView from '../views';
import { fetchModuleX, resetPLCCResponse, submitInstantCardApplication } from './ApplyCard.actions';
import { isPlccUser } from '../../../account/User/container/User.selectors';
import CheckoutSelectors from '../../../CnC/Checkout/container/Checkout.selector';
import { getUserProfileData, getUserId, isGuest } from './ApplyCard.selectors';
import AddressVerification from '../../../../common/organisms/AddressVerification/container/AddressVerification.container';
import { verifyAddress } from '../../../../common/organisms/AddressVerification/container/AddressVerification.actions';
import { isMobileApp } from '../../../../../utils';

class ApplyCardLayoutContainer extends React.Component {
  /**
   *  @function - constructor
   *
   *  @state - showAddEditAddressForm - state member that decides whether to show or hide th do verify contact window.
   */

  constructor(props) {
    super(props);
    this.state = {
      showAddEditAddressForm: false,
    };
  }

  componentDidMount() {
    const { plccData, fetchModuleXContent, labels } = this.props;
    if (!plccData && labels && labels.referred) {
      fetchModuleXContent(labels && labels.referred);
    }
  }

  /**
   *  @fatarrow - formatPayload
   *  @param - payload - contains payload of plcc form.
   *
   *  @description - deals with form final submission.
   */
  formatPayload = payload => {
    const { addressLine1, addressLine2, noCountryZip, primary, ...otherPayload } = payload;
    return {
      ...otherPayload,
      ...{
        address1: addressLine1,
        address2: addressLine2,
        zip: noCountryZip,
        primary: primary ? 'true' : 'false',
      },
    };
  };

  /**
   *  @fatarrow - submitPLCCForm
   *  @param - formData - contains the data of redux form.
   *
   *  @description - submits for an instant credit card
   */
  submitPLCCForm = formData => {
    const { verifyAddressAction, resetPLCCApplicationStatus } = this.props;
    resetPLCCApplicationStatus({ status: null });
    const payload = Object.assign({}, formData);
    const formattedPayload = this.formatPayload(payload);
    if (Object.keys(formattedPayload).length) {
      verifyAddressAction(formattedPayload);
      this.setState({ showAddEditAddressForm: true, formData });
    }
  };

  /**
   *  @fatarrow - submitForm
   *
   *  @description - deals with form final submission.
   */
  submitForm = () => {
    const { submitApplication, userId } = this.props;
    const { formData } = this.state;
    this.setState({ showAddEditAddressForm: false });
    const userData = Object.assign({}, formData);
    if (userData) {
      userData.userId = userId;
    }
    submitApplication(userData);
  };

  closeAddressVerificationModal = () => {
    this.setState({ showAddEditAddressForm: false });
  };

  render() {
    const {
      applicationStatus,
      approvedPLCCData,
      isPLCCModalFlow,
      plccData,
      isGuestUser,
      labels,
      plccUser,
      profileInfo,
      applyCard,
      toggleModal,
      resetPLCCApplicationStatus,
      closeModal,
      isRtpsFlow,
      togglePLCCModal
    } = this.props;
    const { showAddEditAddressForm } = this.state;

    return (
      <React.Fragment>
        <ApplyCardLayoutView
          applicationStatus={applicationStatus}
          labels={labels}
          plccData={plccData}
          isGuest={isGuestUser}
          submitPLCCForm={this.submitPLCCForm}
          approvedPLCCData={approvedPLCCData}
          plccUser={plccUser}
          profileInfo={profileInfo}
          isPLCCModalFlow={isPLCCModalFlow}
          toggleModal={toggleModal}
          applyCard={applyCard}
          onSubmit={this.submitPLCCForm}
          resetPLCCApplicationStatus={resetPLCCApplicationStatus}
          showAddEditAddressForm={showAddEditAddressForm}
          submitForm={this.submitForm}
          closeAddressVerificationModal={this.closeAddressVerificationModal}
          closeModal={closeModal}
          isRtpsFlow={isRtpsFlow}
          togglePLCCModal={togglePLCCModal}
        />
        {!isMobileApp() && showAddEditAddressForm ? (
          <AddressVerification onSuccess={this.submitForm} />
        ) : null}
      </React.Fragment>
    );
  }
}

ApplyCardLayoutContainer.propTypes = {
  plccData: PropTypes.shape({}).isRequired,
  labels: PropTypes.shape({}).isRequired,
  fetchModuleXContent: PropTypes.func.isRequired,
  isPLCCModalFlow: PropTypes.bool.isRequired,
  submitApplication: PropTypes.func.isRequired,
  applicationStatus: PropTypes.string.isRequired,
  plccUser: PropTypes.bool.isRequired,
  profileInfo: PropTypes.shape({}).isRequired,
  verifyAddressAction: PropTypes.func.isRequired,
  approvedPLCCData: PropTypes.shape({}).isRequired,
  isGuestUser: PropTypes.bool.isRequired,
  userId: PropTypes.string.isRequired,
  applyCard: PropTypes.bool.isRequired,
  toggleModal: PropTypes.shape({}).isRequired,
  resetPLCCApplicationStatus: PropTypes.func.isRequired,
  closeModal: PropTypes.func,
};

ApplyCardLayoutContainer.defaultProps = {
  closeModal: () => { },
};

export const mapStateToProps = state => {
  const { ApplyCardPage, Labels } = state;
  return {
    applicationStatus: ApplyCardPage && ApplyCardPage.applicationStatus,
    approvedPLCCData: ApplyCardPage && ApplyCardPage.approvedPLCCData,
    plccData: ApplyCardPage && ApplyCardPage.plccData,
    plccUser: isPlccUser(state),
    isGuestUser: isGuest(state),
    profileInfo: getUserProfileData(state),
    labels: Labels && Labels.global && Labels.global.plccForm,
    userId: getUserId(state),
    isRtpsFlow: CheckoutSelectors.getIsRtpsFlow(state),
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    submitApplication: payload => {
      dispatch(submitInstantCardApplication(payload));
    },
    fetchModuleXContent: contentId => {
      dispatch(fetchModuleX(contentId));
    },
    resetPLCCApplicationStatus: payload => {
      dispatch(resetPLCCResponse(payload));
    },
    verifyAddressAction: payload => {
      dispatch(verifyAddress(payload));
    },
    togglePLCCModal: payload => {
      dispatch(toggleApplyNowModal(payload));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplyCardLayoutContainer);
