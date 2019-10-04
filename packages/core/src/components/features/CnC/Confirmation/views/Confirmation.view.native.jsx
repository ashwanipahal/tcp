import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopyWithSpacing } from '../../../../common/atoms/styledWrapper';
import CnCTemplate from '../../common/organism/CnCTemplate';
import { Wrapper, SMSWrapper, ThankYouWrapper } from '../styles/Confirmation.styles.native';

/** The hard coded values are just to show the template. these will be removed once the components are are in place */
/**
 * @function ConfirmationView
 * @description component to render confirmation component.
 */
const ConfirmationView = ({ isGuest }) => {
  return (
    <Wrapper>
      <SMSWrapper>
        <BodyCopyWithSpacing
          textAlign="center"
          fontSize="fs16"
          mobileFontFamily="secondary"
          spacingStyles="margin-top-LRG margin-bottom-LRG"
          text="SMS SIGN UP"
        />
      </SMSWrapper>
      <ThankYouWrapper>
        <BodyCopyWithSpacing
          textAlign="center"
          fontSize="fs16"
          mobileFontFamily="secondary"
          spacingStyles="margin-top-LRG margin-bottom-LRG"
          text="THANK YOU COMPONENT"
        />
      </ThankYouWrapper>
      <CnCTemplate isConfirmationPage isGuest={isGuest} />
    </Wrapper>
  );
};
ConfirmationView.propTypes = {
  /** Flag indicates whether the user is a guest */
  isGuest: PropTypes.bool,
};
ConfirmationView.defaultProps = {
  isGuest: true,
};
export default ConfirmationView;
