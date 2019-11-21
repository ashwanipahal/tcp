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
    const { alignCenter } = this.props;
    return passwordRequirementLabelKeys.map(labelKey => (
      <BodyCopy
        textAlign={alignCenter ? 'center' : 'start'}
        style={toolTipStyle}
        fontFamily="secondary"
        key={labelKey}
        text={`-${labels[labelKey]}`}
        fontSize={alignCenter ? 'fs10' : 'fs14'}
      />
    ));
  };

  render() {
    const { labels, alignCenter } = this.props;
    return (
      <>
        <BodyCopyWithSpacing
          textAlign={alignCenter ? 'center' : 'left'}
          fontFamily="secondary"
          fontSize={alignCenter ? 'fs12' : 'fs14'}
          fontWeight="regular"
          text={getLabelValue(labels, 'lbl_resetPassword_requirementHeading')}
          spacingStyles="margin-top-SM margin-bottom-SM"
        />
        {this.keysLabelsMap(labels)}
        <BodyCopyWithSpacing
          textAlign={alignCenter ? 'center' : 'start'}
          style={toolTipStyle}
          fontFamily="secondary"
          fontSize={alignCenter ? 'fs10' : 'fs14'}
          text={getLabelValue(labels, 'lbl_resetPassword_requirementNote')}
          spacingStyles="margin-top-SM"
        />
      </>
    );
  }
}

PasswordRequirement.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  alignCenter: PropTypes.bool,
};

PasswordRequirement.defaultProps = {
  alignCenter: false,
};

export default PasswordRequirement;
