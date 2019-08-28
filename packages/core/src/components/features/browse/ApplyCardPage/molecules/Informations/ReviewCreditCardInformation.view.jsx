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
const ReviewCreditCardInformation = ({ creditCardHeader = '' }) => {
  return (
    <ReviewCCInformationWrapper>
      <Col
        className="rewards_card_logo"
        key="container_header_image"
        colSize={{ large: 2, medium: 2, small: 6 }}
      >
        <BodyCopy component="div" className="header-image" />
      </Col>
      <Col
        className="rewards_card_instruction"
        key="container_header_text_plcc"
        colSize={{ large: 8, medium: 5, small: 6 }}
      >
        <RichText richTextHtml={creditCardHeader} dataLocator="creditCardHeader" />
      </Col>
    </ReviewCCInformationWrapper>
  );
};

ReviewCreditCardInformation.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  creditCardHeader: PropTypes.string.isRequired,
};

export default ReviewCreditCardInformation;
