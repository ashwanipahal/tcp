import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';

const getPasswordRequirementLabels = labels => {
  return Object.keys(labels).filter(labelKey => /lbl_resetPassword_requirementTips/.test(labelKey));
};

export const PasswordRequirement = ({ labels }) => {
  const passwordRequirementLabelKeys = getPasswordRequirementLabels(labels);
  return (
    <React.Fragment>
      <BodyCopy
        textAlign="center"
        fontFamily="secondary"
        fontSize="fs14"
        className="elem-mb-MED reset-password-heading"
        fontWeight="black"
      >
        {getLabelValue(labels, 'lbl_resetPassword_requirementHeading')}
      </BodyCopy>
      <BodyCopy
        fontFamily="secondary"
        fontSize="fs14"
        component="ul"
        className="elem-mb-MED reset-password-list"
      >
        {passwordRequirementLabelKeys.map(labelKey => (
          <BodyCopy component="li" textAlign="center" key={labelKey}>
            {labels[labelKey]}
          </BodyCopy>
        ))}
      </BodyCopy>
      <BodyCopy
        fontFamily="secondary"
        fontSize="fs14"
        textAlign="left"
        className="reset-password-note"
      >
        {getLabelValue(labels, 'lbl_resetPassword_requirementNote')}
      </BodyCopy>
    </React.Fragment>
  );
};

PasswordRequirement.propTypes = {
  labels: PropTypes.shape({}).isRequired,
};

export default PasswordRequirement;
