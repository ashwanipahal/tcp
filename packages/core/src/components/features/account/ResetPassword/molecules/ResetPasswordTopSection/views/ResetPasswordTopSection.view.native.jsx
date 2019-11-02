import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import Anchor from '../../../../../../common/atoms/Anchor';
import PasswordRequirement from '../../PasswordRequirement';
import CustomIcon from '../../../../../../common/atoms/Icon';
import { ICON_NAME } from '../../../../../../common/atoms/Icon/Icon.constants';
import {
  CustomIconWrapper,
  FloatWrapper,
  PasswordDescriptionWrapper,
} from '../styles/ResetPasswordTopSection.style.native';

export const ResetPasswordTopSection = ({ labels, onBackClick }) => {
  return (
    <>
      <FloatWrapper>
        <CustomIconWrapper>
          <CustomIcon
            name={ICON_NAME.chevronLeft}
            size="fs14"
            color="blue.800"
            isButton
            onPress={() => onBackClick()}
          />
        </CustomIconWrapper>
        <Anchor
          fontSizeVariation="xlarge"
          anchorVariation="secondary"
          text={getLabelValue(labels, 'lbl_resetPassword_backLogin')}
          onPress={onBackClick}
          className="floatLt"
        />
      </FloatWrapper>
      <BodyCopy
        textAlign="center"
        fontFamily="secondary"
        fontSize="fs16"
        fontWeight="black"
        text={getLabelValue(labels, 'lbl_resetPassword_heading')}
      />
      <PasswordDescriptionWrapper>
        <PasswordRequirement labels={labels} alignCenter />
      </PasswordDescriptionWrapper>
    </>
  );
};

ResetPasswordTopSection.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  onBackClick: PropTypes.func.isRequired,
};

export default ResetPasswordTopSection;
