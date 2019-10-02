import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ApplyCardLayoutView from '../views';
import { fetchModuleX, resetPLCCResponse, submitInstantCardApplication } from './ApplyCard.actions';
import { isPlccUser } from '../../../account/User/container/User.selectors';
import { getUserProfileData, getUserId, getBagItemsSize, isGuest } from './ApplyCard.selectors';
import AddressVerification from '../../../../common/organisms/AddressVerification/container/AddressVerification.container';
import { verifyAddress } from '../../../../common/organisms/AddressVerification/container/AddressVerification.actions';
import BAG_PAGE_ACTIONS from '../../../CnC/BagPage/container/BagPage.actions';

class ApplyCardLayoutContainer extends React.Component {
  static propTypes = {
    plccData: PropTypes.shape({}).isRequired,
    labels: PropTypes.shape({}).isRequired,
    fetchModuleXContent: PropTypes.func.isRequired,
    isPLCCModalFlow: PropTypes.bool.isRequired,
    submitApplication: PropTypes.func.isRequired,
    applicationStatus: PropTypes.string.isRequired,
    plccUser: PropTypes.bool.isRequired,
    bagItems: PropTypes.number.isRequired,
    profileInfo: PropTypes.shape({}).isRequired,
    verifyAddressAction: PropTypes.func.isRequired,
    fetchBagItems: PropTypes.func.isRequired,
    approvedPLCCData: PropTypes.shape({}).isRequired,
    isGuestUser: PropTypes.bool.isRequired,
    userId: PropTypes.string.isRequired,
    applyCard: PropTypes.bool.isRequired,
    toggleModal: PropTypes.shape({}).isRequired,
    resetPLCCApplicationStatus: PropTypes.func.isRequired,
  };
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
    const { plccData, fetchModuleXContent, fetchBagItems, labels } = this.props;
    fetchBagItems();
    if (!plccData && labels && labels.referred) {
      fetchModuleXContent(labels && labels.referred);
    }
    window.scrollTo(0, 0);
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

  render() {
    const {
      applicationStatus,
      approvedPLCCData,
      isPLCCModalFlow,
      plccData,
      isGuestUser,
      bagItems,
      labels,
      plccUser,
      profileInfo,
      applyCard,
      toggleModal,
      resetPLCCApplicationStatus,
    } = this.props;
    const { showAddEditAddressForm } = this.state;
    return (
      <React.Fragment>
        <ApplyCardLayoutView
          applicationStatus={applicationStatus}
          labels={labels}
          plccData={plccData}
          bagItems={bagItems}
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
        />
        {showAddEditAddressForm ? <AddressVerification onSuccess={this.submitForm} /> : null}
      </React.Fragment>
    );
  }
}

export const mapStateToProps = state => {
  const { ApplyCardPage, Labels } = state;
  return {
    applicationStatus: ApplyCardPage && ApplyCardPage.applicationStatus,
    approvedPLCCData: ApplyCardPage && ApplyCardPage.approvedPLCCData,
    plccData: ApplyCardPage && ApplyCardPage.plccData,
    plccUser: isPlccUser(state),
    bagItems: getBagItemsSize(state),
    isGuestUser: isGuest(state),
    profileInfo: getUserProfileData(state),
    labels: Labels && Labels.global && Labels.global.plccForm,
    userId: getUserId(state),
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
    fetchBagItems: () => {
      dispatch(BAG_PAGE_ACTIONS.getOrderDetails());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplyCardLayoutContainer);
