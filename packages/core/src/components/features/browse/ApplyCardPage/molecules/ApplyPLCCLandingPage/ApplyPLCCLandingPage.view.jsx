import React from 'react';
import { Anchor, Button, Col, Row } from '../../../../../common/atoms';
import StyledPLCCLandingPage from '../../style/ApplyCardPage.style';

/**
 * @const PLCCLandingPage
 *
 * @param - labels
 * @description - showcases landing page pLCC
 */

const PLCCLandingPage = () => {
  return (
    <StyledPLCCLandingPage>
      <Row fullBleed className="plcc_button_wrapper">
        <Col
          ignoreGutter={{ small: true }}
          colSize={{ large: 4, medium: 4, small: 6 }}
          className="checkout_button"
        >
          <Anchor asPath="/bag">
            <Button
              buttonVariation="fixed-width"
              fill="BLUE"
              type="submit"
              className="continue_button"
              data-locator="submit-plcc-btn"
            >
              {'Checkout Button'}
            </Button>
          </Anchor>
        </Col>
      </Row>
      <Row fullBleed className="submit_plcc_form">
        <Col
          ignoreGutter={{ small: true }}
          colSize={{ large: 4, medium: 4, small: 6 }}
          className="continue_button"
        >
          <Anchor asPath="/home">
            <Button
              buttonVariation="fixed-width"
              fill="BLUE"
              type="submit"
              className="continue_button"
              data-locator="submit-plcc-btn"
            >
              {'Continue Button'}
            </Button>
          </Anchor>
        </Col>
      </Row>
    </StyledPLCCLandingPage>
  );
};
export default PLCCLandingPage;
