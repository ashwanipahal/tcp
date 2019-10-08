import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopyWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
import BodyCopy from '../../../../../../common/atoms/BodyCopy';
import {
  ItemContainer,
  ItemContainerWrapper,
} from '../styles/ConfirmationItemDisplay.styles.native';

/**
 * @function ConfirmationItemDisplay
 * @description renders the order tile description component.
 */
const ConfirmationItemDisplay = ({ title, children, boldFont, isLink }) => {
  return (
    <ItemContainer>
      <BodyCopyWithSpacing
        mobilefontFamily="secondary"
        fontSize="fs14"
        fontWeight="extrabold"
        textAlign="center"
        text={title}
        spacingStyles="margin-bottom-XXS"
      />

      {!isLink ? (
        <BodyCopy
          mobilefontFamily="secondary"
          fontSize="fs16"
          fontWeight={boldFont ? 'extrabold' : 'regular'}
          textAlign="center"
          text={children}
        />
      ) : (
        <ItemContainerWrapper>{children}</ItemContainerWrapper>
      )}
    </ItemContainer>
  );
};
ConfirmationItemDisplay.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  boldFont: PropTypes.bool,
  isLink: PropTypes.bool,
};
ConfirmationItemDisplay.defaultProps = {
  title: '',
  children: null,
  boldFont: false,
  isLink: false,
};

export default ConfirmationItemDisplay;
