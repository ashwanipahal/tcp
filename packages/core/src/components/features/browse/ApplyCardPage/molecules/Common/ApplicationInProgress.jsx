import React from 'react';
import PropTypes from 'prop-types';
import { Anchor, BodyCopy, Button, Col, Row } from '../../../../../common/atoms';
import ApplicationInProgressWrapper from './styles/ApplicationInProgress.style';
import { getLabelValue } from '../../../../../../utils';

/**
 * @const ApplicationInProgress
 *
 * @param - labels
 * @description - showcases application in progress screen.
 */

const ApplicationInProgress = ({ bagItems, isPLCCModalFlow, labels }) => {
  return (
    <ApplicationInProgressWrapper isPLCCModalFlow={isPLCCModalFlow}>
      <div className="header-image" />
      <BodyCopy
        fontSize="fs22"
        className="card-InProgress-header"
        fontFamily="secondary"
        fontWeight="semibold"
      >
        {getLabelValue(labels, 'lbl_PLCCForm_underProgress')}
      </BodyCopy>
      <BodyCopy fontSize="fs16" fontFamily="secondary" className="in_progress_status_details">
        {getLabelValue(labels, 'lbl_PLCCForm_underProcessDetails')}
      </BodyCopy>
      {bagItems ? (
        <Row fullBleed className="submit_plcc_form">
          <Col
            ignoreGutter={{ small: true }}
            colSize={{ large: 3, medium: 4, small: 12 }}
            className="underprogress_checkout_button"
          >
            <Anchor asPath="/bag">
              <Button
                buttonVariation="fixed-width"
                fill="BLUE"
                type="submit"
                className="underprogress_checkout_button"
                data-locator="submit-plcc-btn"
              >
                {getLabelValue(labels, 'lbl_PLCCForm_ctcButton')}
              </Button>
            </Anchor>
          </Col>
        </Row>
      ) : null}
      <Row fullBleed className="submit_plcc_form">
        <Col
          ignoreGutter={{ small: true }}
          colSize={{ large: 3, medium: 4, small: 12 }}
          className="underprogress_continue_button"
        >
          <Anchor asPath="/home">
            <Button
              buttonVariation="fixed-width"
              fill={!bagItems ? 'BLUE' : 'WHITE'}
              type="submit"
              className="underprogress_continue_button"
              data-locator="submit-plcc-btn"
            >
              {getLabelValue(labels, 'lbl_PLCCForm_continueShopping')}
            </Button>
          </Anchor>
        </Col>
      </Row>
    </ApplicationInProgressWrapper>
  );
};

ApplicationInProgress.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  isPLCCModalFlow: PropTypes.bool.isRequired,
  bagItems: PropTypes.number.isRequired,
};

export default ApplicationInProgress;
