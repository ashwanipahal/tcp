import React from 'react';
import PropTypes from 'prop-types';
import { Anchor, BodyCopy, Button, Col, Row } from '@tcp/core/src/components/common/atoms';

/**
 * @const ApplicationInProgress
 *
 * @param - labels
 * @description - showcases application in progress screen.
 */

const ApplicationInProgress = ({ labels }) => {
  return (
    <BodyCopy
      className="underprogress_application"
      component="div"
      fontSize="fs16"
      fontFamily="secondary"
    >
      <BodyCopy
        fontSize="fs20"
        className="card-InProgress-header"
        fontFamily="secondary"
        fontWeight="semibold"
      >
        {labels.plcc_form_status}
      </BodyCopy>
      <BodyCopy fontSize="fs16" fontFamily="secondary" fontWeight="regular">
        {labels.plcc_form_status_detail}
      </BodyCopy>
      <Row fullBleed className="submit_plcc_form">
        <Col
          ignoreGutter={{ small: true }}
          colSize={{ large: 4, medium: 4, small: 6 }}
          className="underproress_checkout_button"
        >
          <Anchor asPath="/bag">
            <Button
              buttonVariation="fixed-width"
              fill="BLUE"
              type="submit"
              className="underproress_checkout_button"
              data-locator="submit-plcc-btn"
            >
              {labels.plcc_form_ctc_buttom}
            </Button>
          </Anchor>
        </Col>
      </Row>
      <Row fullBleed className="submit_plcc_form">
        <Col
          ignoreGutter={{ small: true }}
          colSize={{ large: 4, medium: 4, small: 6 }}
          className="underproress_continue_button"
        >
          <Anchor asPath="/home">
            <Button
              buttonVariation="fixed-width"
              fill="BLUE"
              type="submit"
              className="underproress_continue_button"
              data-locator="submit-plcc-btn"
            >
              {labels.plcc_form_continue_shopping}
            </Button>
          </Anchor>
        </Col>
      </Row>
    </BodyCopy>
  );
};

ApplicationInProgress.propTypes = {
  labels: PropTypes.shape({}).isRequired,
};

export default ApplicationInProgress;
