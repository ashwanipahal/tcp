import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import PointsClaimTopSection from '../molecules/PointsClaimTopSection';
import PointsClaimForm from '../molecules/PointsClaimForm';
import RewardsFooterLinks from '../../common/molecule/RewardsFooterLinks';

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
  return (
    <React.Fragment>
      <PointsClaimTopSection labels={labels} onBack={onBack} className="elem-mb-XL" />
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
      <RewardsFooterLinks
        programDetailsCta={getLabelValue(
          labels,
          'lbl_my_rewards_program_details',
          'myPlaceRewards'
        )}
        termsConditionCta={getLabelValue(labels, 'lbl_common_tnc', 'common')}
      />
    </React.Fragment>
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
