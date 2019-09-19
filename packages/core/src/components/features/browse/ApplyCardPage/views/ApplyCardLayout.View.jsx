/* eslint-disable max-params */
/* eslint-disable no-else-return */
import React from 'react';
import PropTypes from 'prop-types';
import ApplyRewardsCreditCardStyle from '../styles/ApplyCardPage.style';
import PLCCForm from '../molecules/Form/PLCCForm';
import {
  ApplicationInProgress,
  ApprovedPLCCApplicationView,
  ExistingPLCCUserView,
} from '../molecules';
import constants from '../RewardsCard.constants';

const getApplyCardLayoutView = (
  applicationStatus,
  plccData,
  labels,
  submitPLCCForm,
  bagItems,
  isPLCCModalFlow,
  isGuest,
  plccUser,
  profileInfo,
  approvedPLCCData,
  handleTimedOutModal
) => {
  if (applicationStatus === constants.APPLICATION_STATE_EXISTING) {
    return (
      <ExistingPLCCUserView
        bagItems={bagItems}
        labels={labels}
        existingCustomerDetails={plccData && plccData.plcc_existing_customer_details}
        isPLCCModalFlow={isPLCCModalFlow}
      />
    );
  } else if (applicationStatus === constants.APPLICATION_STATE_PENDING && !plccUser) {
    return (
      <ApplicationInProgress
        bagItems={bagItems}
        labels={labels}
        isPLCCModalFlow={isPLCCModalFlow}
      />
    );
  } else if (applicationStatus === constants.APPLICATION_STATE_APPROVED) {
    return (
      <ApprovedPLCCApplicationView
        bagItems={bagItems}
        isGuest={isGuest}
        labels={labels}
        plccData={plccData}
        isPLCCModalFlow={isPLCCModalFlow}
        approvedPLCCData={approvedPLCCData}
      />
    );
  } else {
    return (
      <PLCCForm
        plccData={plccData}
        labels={labels}
        bagItems={bagItems}
        isPLCCModalFlow={isPLCCModalFlow}
        onSubmit={submitPLCCForm}
        initialValues={profileInfo}
        handleTimedOutModal={handleTimedOutModal}
      />
    );
  }
};

const ApplyCardLayoutView = ({
  applicationStatus,
  plccData,
  labels,
  submitPLCCForm,
  bagItems,
  isPLCCModalFlow,
  plccUser,
  isGuest,
  profileInfo,
  approvedPLCCData,
  handleTimedOutModal,
}) => {
  return (
    <ApplyRewardsCreditCardStyle isPLCCModalFlow={isPLCCModalFlow}>
      {getApplyCardLayoutView(
        applicationStatus,
        plccData,
        labels,
        submitPLCCForm,
        bagItems,
        isPLCCModalFlow,
        isGuest,
        plccUser,
        profileInfo,
        approvedPLCCData,
        handleTimedOutModal
      )}
    </ApplyRewardsCreditCardStyle>
  );
};

ApplyCardLayoutView.propTypes = {
  plccData: PropTypes.shape({}).isRequired,
  submitPLCCForm: PropTypes.func.isRequired,
  applicationStatus: PropTypes.string.isRequired,
  labels: PropTypes.shape({}).isRequired,
  isPLCCModalFlow: PropTypes.bool.isRequired,
  plccUser: PropTypes.bool.isRequired,
  profileInfo: PropTypes.shape({}).isRequired,
  approvedPLCCData: PropTypes.shape({}).isRequired,
  isGuest: PropTypes.bool.isRequired,
  bagItems: PropTypes.bool.isRequired,
  handleTimedOutModal: PropTypes.func.isRequired,
};

export default ApplyCardLayoutView;
