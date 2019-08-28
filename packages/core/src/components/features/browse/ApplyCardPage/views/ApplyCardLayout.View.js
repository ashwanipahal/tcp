/* eslint-disable */
import React from 'react';
import ApplyRewardsCreditCardStyle from '../styles/ApplyCardPage.style';
import PLCCForm from '../molecules/Form/PLCCForm';
import PropTypes from 'prop-types';
import { ApplicationInProgress } from '../molecules';
import constants from '../RewardsCard.constants';

const ApplyCardLayoutView = ({ applicationStatus, plccData, labels, submitPLCCForm }) => {
  return (
    <ApplyRewardsCreditCardStyle>
      {applicationStatus === constants.APPLICATION_STATE_PENDING ? (
        <ApplicationInProgress labels={labels} />
      ) : (
        <PLCCForm plccData={plccData} labels={labels} onSubmit={submitPLCCForm} />
      )}
    </ApplyRewardsCreditCardStyle>
  );
};

export default ApplyCardLayoutView;
