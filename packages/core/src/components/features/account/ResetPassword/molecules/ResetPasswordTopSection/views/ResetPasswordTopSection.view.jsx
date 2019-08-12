import React from 'react';
import PropTypes from 'prop-types';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Anchor from '../../../../../../common/atoms/Anchor';
import PasswordRequirement from '../../PasswordRequirement';

export const ResetPasswordTopSection = ({ className, labels, onBack }) => {
  return (
    <BodyCopy className={className}>
      <BodyCopy className="elem-mb-LRG">
        <Anchor
          onClick={onBack}
          fontSizeVariation="xlarge"
          anchorVariation="secondary"
          data-locator="addnewaddress-back"
          className="elem-mb-LRG"
        >
          {labels.lbl_resetPassword_backLogin}
        </Anchor>
      </BodyCopy>
      <BodyCopy
        textAlign="center"
        fontFamily="secondary"
        fontSize="fs16"
        fontWeight="black"
        className="elem-mb-XS"
      >
        {labels.lbl_resetPassword_heading}
      </BodyCopy>
      <PasswordRequirement labels={labels} />
    </BodyCopy>
  );
};

ResetPasswordTopSection.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  onBack: PropTypes.func.isRequired,
  className: PropTypes.string,
};

ResetPasswordTopSection.defaultProps = {
  className: '',
};

export default ResetPasswordTopSection;
