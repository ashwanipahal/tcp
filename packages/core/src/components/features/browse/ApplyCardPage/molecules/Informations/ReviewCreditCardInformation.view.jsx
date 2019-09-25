import React from 'react';
import { BodyCopy, Col, RichText } from '@tcp/core/src/components/common/atoms';
import PropTypes from 'prop-types';
import ReviewCCInformationWrapper from './styles/RewardsCreditCardInformation.style';

/**
 * @const ReviewCreditCardInformation
 *
 * @param - creditCardHeader
 * @description - credit card informations.
 */
const ReviewCreditCardInformation = ({ isPLCCModalFlow = false, creditCardHeader = '' }) => {
  return (
    <ReviewCCInformationWrapper isPLCCModalFlow={isPLCCModalFlow}>
      <Col
        className="rewards_card_logo"
        key="container_header_image"
        isPLCCModalFlow={isPLCCModalFlow}
        colSize={{ large: isPLCCModalFlow ? 4 : 3, medium: isPLCCModalFlow ? 3 : 4, small: 6 }}
      >
        <BodyCopy
          component="div"
          className="header-image"
          tabIndex="0"
          isPLCCModalFlow={isPLCCModalFlow}
        />
      </Col>
      <Col
        className="rewards_card_instruction"
        key="container_header_text_plcc"
        colSize={{ large: 8, medium: 6, small: 6 }}
      >
        <RichText richTextHtml={creditCardHeader} dataLocator="creditCardHeader" />
      </Col>
    </ReviewCCInformationWrapper>
  );
};

ReviewCreditCardInformation.propTypes = {
  creditCardHeader: PropTypes.string.isRequired,
  isPLCCModalFlow: PropTypes.bool.isRequired,
};

export default ReviewCreditCardInformation;
