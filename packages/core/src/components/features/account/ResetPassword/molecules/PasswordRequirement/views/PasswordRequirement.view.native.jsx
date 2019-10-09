import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import { BodyCopyWithSpacing } from '../../../../../../common/atoms/styledWrapper';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import toolTipStyle from '../styles/PasswordRequirement.style.native';

class PasswordRequirement extends PureComponent<Props> {
  getPasswordRequirementLabels = labels => {
    return Object.keys(labels).filter(labelKey =>
      /lbl_resetPassword_requirementTips/.test(labelKey)
    );
  };

  keysLabelsMap = labels => {
    const passwordRequirementLabelKeys = this.getPasswordRequirementLabels(labels);
    return passwordRequirementLabelKeys.map(labelKey => (
      <BodyCopy
        textAlign="start"
        style={toolTipStyle}
        key={labelKey}
        text={`-${labels[labelKey]}`}
      />
    ));
  };

  render() {
    const { labels } = this.props;
    return (
      <>
        <BodyCopyWithSpacing
          textAlign="left"
          fontFamily="secondary"
          fontSize="fs14"
          fontWeight="regular"
          text={getLabelValue(labels, 'lbl_resetPassword_requirementHeading')}
          spacingStyles="margin-top-SM margin-bottom-SM"
        />

        {this.keysLabelsMap(labels)}
        <BodyCopyWithSpacing
          textAlign="start"
          style={toolTipStyle}
          text={getLabelValue(labels, 'lbl_resetPassword_requirementNote')}
          spacingStyles="margin-top-SM"
        />
      </>
    );
  }
}

PasswordRequirement.propTypes = {
  labels: PropTypes.shape({}).isRequired,
};

export default PasswordRequirement;
