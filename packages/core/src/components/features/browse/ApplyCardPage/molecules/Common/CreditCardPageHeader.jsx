import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-unresolved
import Router from 'next/router';
import { Anchor, BodyCopy, Col, Row } from '../../../../../common/atoms';
import CreditCardPageHeaderWrapper from './styles/CreditCardPageHeader.style';
import { getLabelValue } from '../../../../../../utils';

const CreditCardPageHeader = ({ labels, isPLCCModalFlow }) => {
  return !isPLCCModalFlow ? (
    <CreditCardPageHeaderWrapper>
      <Row fullBleed>
        <Col
          className="back_button_container"
          key={getLabelValue(labels, 'lbl_PLCCForm_backButton')}
          colSize={{ large: 12, medium: 8, small: 6 }}
        >
          <Anchor data-locator="plcc_back_btn" onClick={() => Router.back()}>
            <span className="left-arrow"> </span>
            <BodyCopy component="span" className="back_button">
              {getLabelValue(labels, 'lbl_PLCCForm_backButton')}
            </BodyCopy>
          </Anchor>
        </Col>
      </Row>
      <Row fullBleed>
        <Col
          className="apply_Card_Header_Text"
          key={getLabelValue(labels, 'lbl_PLCCForm_rewardsCardHeading')}
          aria-label={getLabelValue(labels, 'lbl_PLCCForm_rewardsCardHeading')}
          colSize={{ large: 12, medium: 8, small: 6 }}
        >
          <BodyCopy
            component="h2"
            fontWeight="extrabold"
            className="credit_card_heading"
            data-locator={getLabelValue(labels, 'lbl_PLCCForm_rewardsCardHeading')}
          >
            {getLabelValue(labels, 'lbl_PLCCForm_rewardsCardHeading')}
          </BodyCopy>
        </Col>
      </Row>
    </CreditCardPageHeaderWrapper>
  ) : null;
};

CreditCardPageHeader.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  isPLCCModalFlow: PropTypes.bool.isRequired,
};

export default CreditCardPageHeader;
