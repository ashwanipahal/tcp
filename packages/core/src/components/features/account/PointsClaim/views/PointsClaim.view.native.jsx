import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import PointsClaimForm from '../molecules/PointsClaimForm';
import RewardsFooter from '../../common/molecule/RewardsFooterLinks/views/RewardsFooterLinks.view.native';

import { PointsClaimWrapper } from '../styles/PointsClaim.view.style.native';

export const PointsClaimView = ({
  labels,
  successMessage,
  errorMessage,
  onSubmit,
  onBack,
  showNotification,
  resetPasswordErrorMessage,
  claimSubmit,
  ...otherprops
}) => {
  let behavior = null;
  let keyboardVerticalOffset = 0;
  if (Platform.OS === 'ios') {
    behavior = 'padding';
    keyboardVerticalOffset = 64;
  }

  return (
    <KeyboardAvoidingView
      behavior={behavior}
      keyboardVerticalOffset={keyboardVerticalOffset}
      enabled
    >
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <PointsClaimWrapper>
          <PointsClaimForm
            labels={labels}
            successMessage={successMessage}
            errorMessage={errorMessage}
            onSubmit={claimSubmit}
            onBack={onBack}
            resetPasswordErrorMessage={resetPasswordErrorMessage}
            showNotification={showNotification}
            {...otherprops}
          />
          <RewardsFooter
            programDetailsCta={getLabelValue(
              labels,
              'lbl_my_rewards_program_details',
              'myPlaceRewards'
            )}
            termsConditionCta={getLabelValue(labels, 'lbl_common_tnc', 'common')}
          />
        </PointsClaimWrapper>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

PointsClaimView.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  successMessage: PropTypes.string,
  errorMessage: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  resetPasswordErrorMessage: PropTypes.string.isRequired,
  showNotification: PropTypes.bool.isRequired,
  claimSubmit: PropTypes.func.isRequired,
};

PointsClaimView.defaultProps = {
  successMessage: '',
  errorMessage: '',
};

export default PointsClaimView;
