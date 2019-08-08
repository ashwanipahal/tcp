import React from 'react';
import PropTypes from 'prop-types'
import { BodyCopy } from '../../../../../../common/molecules/ModuleK/ModuleK.style.native';

const getPasswordRequirementLabels = labels => {
  return Object.keys(labels).filter(labelKey => /lbl_ResetPassword_requirementTips/.test(labelKey));
}

const ResetPasswordTopSection = ({ labels }) => {
  const passwordRequirementLabelKeys = getPasswordRequirementLabels(labels);

  return (
    <BodyCopy>
      <BodyCopy component="ul">
        {passwordRequirementLabelKeys.map(labelKey => <BodyCopy component="li">{labels[labelKey]}</BodyCopy>)}
      </BodyCopy>
      <BodyCopy>{labels.lbl_ResetPassword_requirementNote}</BodyCopy>
    </BodyCopy>
  );
}

ResetPasswordTopSection.propTypes = {
  labels: PropTypes.shape({}),
}

ResetPasswordTopSection.defaultProps = {
  labels: {},
}

export default ResetPasswordTopSection;
