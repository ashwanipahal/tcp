import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ApplyCardLayoutView from '../views/ApplyCardLayout.View';
import { fetchModuleX, submitInstantCardApplication } from './ApplyCard.actions';
import { isPlccUser } from '../../../account/User/container/User.selectors';
import { getUserProfileData } from './ApplyCard.selectors';
import { routerPush } from '../../../../../utils';
import AddressVerification from '../../../../common/organisms/AddressVerification/container/AddressVerification.container';
import { verifyAddress } from '../../../../common/organisms/AddressVerification/container/AddressVerification.actions';

class ApplyCardLayoutContainer extends React.Component {
  static propTypes = {
    plccData: PropTypes.shape({}).isRequired,
    labels: PropTypes.shape({}).isRequired,
    fetchModuleXContent: PropTypes.func.isRequired,
    isPLCCModalFlow: PropTypes.bool.isRequired,
    submitApplication: PropTypes.func.isRequired,
    applicationStatus: PropTypes.string.isRequired,
    plccUser: PropTypes.bool.isRequired,
    profileInfo: PropTypes.shape({}).isRequired,
    verifyAddressAction: PropTypes.func.isRequired,
  };
  /**
   *  @state - formatPayload
   *
   *  @member - showAddEditAddressForm - state member that decides whether to show or hide th do verify contact window.
   */

  state = {
    showAddEditAddressForm: false,
  };

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
    const { verifyAddressAction } = this.props;
    const formattedFormPayload = Object.assign({}, formData);
    const formattedPayload = this.formatPayload(formattedFormPayload);
    if (Object.keys(formattedFormPayload).length) {
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
    const { submitApplication } = this.props;
    const { formData } = this.state;
    this.setState({ showAddEditAddressForm: false });
    submitApplication(formData);
  };

  render() {
    const {
      applicationStatus,
      isPLCCModalFlow,
      plccData,
      labels,
      plccUser,
      profileInfo,
    } = this.props;
    const { showAddEditAddressForm } = this.state;
    if (plccUser) {
      routerPush('/', '/place-card');
    }
    return (
      <React.Fragment>
        <ApplyCardLayoutView
          applicationStatus={applicationStatus}
          labels={labels}
          plccData={plccData}
          submitPLCCForm={this.submitPLCCForm}
          plccUser={plccUser}
          profileInfo={profileInfo}
          isPLCCModalFlow={isPLCCModalFlow}
        />
        {showAddEditAddressForm ? <AddressVerification onSuccess={this.submitForm} /> : null}
      </React.Fragment>
    );
  }
}

export const mapStateToProps = state => {
  const { ApplyCardPage, Labels } = state;
  return {
    applicationStatus: ApplyCardPage.applicationStatus,
    plccData: ApplyCardPage.plccData,
    plccUser: isPlccUser(state),
    profileInfo: getUserProfileData(state),
    labels: Labels && Labels.PLCC && Labels.PLCC.plccForm,
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
    verifyAddressAction: payload => {
      dispatch(verifyAddress(payload));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ApplyCardLayoutContainer);
