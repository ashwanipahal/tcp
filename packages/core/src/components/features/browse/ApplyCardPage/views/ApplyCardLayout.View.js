/* eslint-disable */
import React from 'react';
import ApplyRewardsCreditCardStyle from '../styles/ApplyCardPage.style';
import PLCCForm from '../molecules/Form/PLCCForm';
import PropTypes from 'prop-types';
import { ApplicationInProgress } from '../molecules';
import constants from '../RewardsCard.constants';

export class ApplyCardLayoutView extends React.Component {
  static propTypes = {
    applicationStatus: PropTypes.oneOfType([String, Object]),
    disclaimersData: PropTypes.shape({}).isRequired,
    labels: PropTypes.shape({}).isRequired,
    preScreenCodeLink: PropTypes.string,
  };

  render() {
    const {
      applicationStatus,
      disclaimersData,
      labels,
      preScreenCodeLink,
      submitPLCCForm,
    } = this.props;
    return (
      <ApplyRewardsCreditCardStyle>
        {applicationStatus === constants.APPLICATION_STATE_PENDING ? (
          <ApplicationInProgress labels={labels} />
        ) : (
          <PLCCForm
            disclaimersData={disclaimersData}
            labels={labels}
            preScreenCodeLink={preScreenCodeLink}
            onSubmit={submitPLCCForm}
          />
        )}
      </ApplyRewardsCreditCardStyle>
    );
  }
}
