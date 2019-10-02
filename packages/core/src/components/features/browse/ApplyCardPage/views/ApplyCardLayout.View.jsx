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
  renderViewInfo = {}
) => {
  if (applicationStatus === constants.APPLICATION_STATE_EXISTING) {
    return (
      <ExistingPLCCUserView
        bagItems={bagItems}
        labels={labels}
        existingCustomerDetails={plccData && plccData.plcc_existing_customer_details}
        isPLCCModalFlow={isPLCCModalFlow}
        resetPLCCResponse={renderViewInfo.resetPLCCApplicationStatus}
      />
    );
  }
  if (applicationStatus === constants.APPLICATION_STATE_PENDING && !renderViewInfo.plccUser) {
    return (
      <ApplicationInProgress
        bagItems={bagItems}
        labels={labels}
        isPLCCModalFlow={isPLCCModalFlow}
        resetPLCCResponse={renderViewInfo.resetPLCCApplicationStatus}
      />
    );
  }
  if (applicationStatus === constants.APPLICATION_STATE_APPROVED) {
    return (
      <ApprovedPLCCApplicationView
        bagItems={bagItems}
        isGuest={renderViewInfo.isGuest}
        labels={labels}
        plccData={plccData}
        isPLCCModalFlow={isPLCCModalFlow}
        approvedPLCCData={renderViewInfo.approvedPLCCData}
        resetPLCCResponse={renderViewInfo.resetPLCCApplicationStatus}
      />
    );
  }
  return (
    <PLCCForm
      plccData={plccData}
      labels={labels}
      bagItems={bagItems}
      isPLCCModalFlow={isPLCCModalFlow}
      onSubmit={submitPLCCForm}
      initialValues={renderViewInfo.profileInfo}
      applicationStatus={applicationStatus}
    />
  );
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
  resetPLCCApplicationStatus,
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
        {
          isGuest,
          plccUser,
          profileInfo,
          approvedPLCCData,
          resetPLCCApplicationStatus,
        }
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
  resetPLCCApplicationStatus: PropTypes.func.isRequired,
};

export default ApplyCardLayoutView;
