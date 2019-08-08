import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Anchor from '../../../../../../common/atoms/Anchor';

const getPasswordRequirementLabels = labels => {
  return Object.keys(labels).filter(labelKey => /lbl_ResetPassword_requirementTips/.test(labelKey));
};

export const ResetPasswordTopSection = ({ labels, onBack }) => {
  const passwordRequirementLabelKeys = getPasswordRequirementLabels(labels);

  return (
    <BodyCopy>
      <Anchor
        onClick={onBack}
        fontSizeVariation="xlarge"
        anchorVariation="secondary"
        data-locator="addnewaddress-back"
      >
        {labels.lbl_ResetPassword_backLogin}
      </Anchor>
      <BodyCopy component="ul">
        {passwordRequirementLabelKeys.map(labelKey => (
          <BodyCopy component="li">{labels[labelKey]}</BodyCopy>
        ))}
      </BodyCopy>
      <BodyCopy>{labels.lbl_ResetPassword_requirementNote}</BodyCopy>
    </BodyCopy>
  );
};

ResetPasswordTopSection.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  onBack: PropTypes.func.isRequired,
};

export default ResetPasswordTopSection;
