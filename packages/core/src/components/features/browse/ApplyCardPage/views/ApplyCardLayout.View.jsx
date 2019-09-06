import React from 'react';
import PropTypes from 'prop-types';
import ApplyRewardsCreditCardStyle from '../styles/ApplyCardPage.style';
import PLCCForm from '../molecules/Form/PLCCForm';
import { ApplicationInProgress } from '../molecules';
import constants from '../RewardsCard.constants';

const ApplyCardLayoutView = ({
  applicationStatus,
  plccData,
  labels,
  submitPLCCForm,
  plccUser,
  profileInfo,
}) => {
  return (
    <ApplyRewardsCreditCardStyle>
      {applicationStatus === constants.APPLICATION_STATE_PENDING && !plccUser ? (
        <ApplicationInProgress labels={labels} />
      ) : (
        <PLCCForm
          plccData={plccData}
          labels={labels}
          onSubmit={submitPLCCForm}
          initialValues={profileInfo}
        />
      )}
    </ApplyRewardsCreditCardStyle>
  );
};

ApplyCardLayoutView.propTypes = {
  plccData: PropTypes.shape({}).isRequired,
  submitPLCCForm: PropTypes.func.isRequired,
  applicationStatus: PropTypes.string.isRequired,
  labels: PropTypes.shape({}).isRequired,
  plccUser: PropTypes.bool.isRequired,
  profileInfo: PropTypes.shape({}).isRequired,
};

export default ApplyCardLayoutView;
