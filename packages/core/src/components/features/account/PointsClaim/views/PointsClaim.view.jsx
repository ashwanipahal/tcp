import React from 'react';
import PropTypes from 'prop-types';
import PointsClaimTopSection from '../molecules/PointsClaimTopSection';
import PointsClaimForm from '../molecules/PointsClaimForm';

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
