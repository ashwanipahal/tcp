import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';

const getPasswordRequirementLabels = labels => {
  return Object.keys(labels).filter(labelKey => /lbl_resetPassword_requirementTips/.test(labelKey));
};

export const PasswordRequirement = ({ labels }) => {
  const passwordRequirementLabelKeys = getPasswordRequirementLabels(labels);
  return (
    <BodyCopy fontFamily="secondary" fontSize="fs12" component="ul" className="elem-mb-MED">
      {passwordRequirementLabelKeys.map(labelKey => (
        <BodyCopy component="li" textAlign="center">
          {labels[labelKey]}
        </BodyCopy>
      ))}
    </BodyCopy>
  );
};

PasswordRequirement.propTypes = {
  labels: PropTypes.shape({}).isRequired,
};

export default PasswordRequirement;
