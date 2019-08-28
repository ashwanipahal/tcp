import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-unresolved
import Router from 'next/router';
import { Anchor, BodyCopy, Col, Row } from '../../../../../common/atoms';
import CreditCardPageHeaderWrapper from './styles/CreditCardPageHeader.style';

const CreditCardPageHeader = ({ labels }) => {
  return (
    <CreditCardPageHeaderWrapper>
      <Row fullBleed>
        <Col
          className="back_button_container"
          key={labels.plcc_form_back_button}
          colSize={{ large: 12, medium: 8, small: 6 }}
        >
          <Anchor data-locator="plcc_back_btn" onClick={() => Router.back()}>
            <BodyCopy component="span" className="back_button">
              {labels.plcc_form_back_button}
            </BodyCopy>
          </Anchor>
        </Col>
      </Row>
      <Row fullBleed>
        <Col
          className="apply_Card_Header_Text"
          key={labels.plcc_form_rewardsCardHeading}
          colSize={{ large: 12, medium: 8, small: 6 }}
        >
          <BodyCopy
            component="h2"
            fontWeight="extrabold"
            className="Apply_Card_Header_Text"
            data-locator={labels.plcc_form_rewardsCardHeading}
          >
            {labels.plcc_form_rewardsCardHeading}
          </BodyCopy>
        </Col>
      </Row>
    </CreditCardPageHeaderWrapper>
  );
};

CreditCardPageHeader.propTypes = {
  labels: PropTypes.shape({}).isRequired,
};

export default CreditCardPageHeader;
