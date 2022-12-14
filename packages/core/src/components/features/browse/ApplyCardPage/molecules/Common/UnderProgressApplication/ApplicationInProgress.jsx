import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy, Button, Col, Row } from '../../../../../../common/atoms';
import ApplicationInProgressWrapper from './style/ApplicationInProgress.style';
import { getLabelValue } from '../../../../../../../utils';
import { redirectToBag, redirectToHome, getFooterButtonSize } from '../../../utils/utility';
import { getCartItemCount } from '../../../../../../../utils/cookie.util';

/**
 * @const ApplicationInProgress
 *
 * @param - labels
 * @description - showcases application in progress screen.
 */

const ApplicationInProgress = ({
  isPLCCModalFlow,
  labels,
  resetPLCCResponse,
  isRtpsFlow,
  togglePLCCModal,
  closePLCCModal,
}) => {
  const bagItems = getCartItemCount();
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
            colSize={{ large: getFooterButtonSize(isPLCCModalFlow), medium: 4, small: 12 }}
            className="underprogress_checkout_button"
          >
            <Button
              buttonVariation="fixed-width"
              fill="BLUE"
              type="submit"
              className="underprogress_checkout_button"
              data-locator="submit-plcc-btn"
              onClick={() =>
                isRtpsFlow
                  ? togglePLCCModal({ isPLCCModalOpen: false, status: null })
                  : redirectToBag(resetPLCCResponse)
              }
            >
              {getLabelValue(labels, 'lbl_PLCCForm_ctcButton')}
            </Button>
          </Col>
        </Row>
      ) : null}
      {!isRtpsFlow && (
        <Row fullBleed className="submit_plcc_form">
          <Col
            ignoreGutter={{ small: true }}
            colSize={{ large: getFooterButtonSize(isPLCCModalFlow), medium: 4, small: 12 }}
            className="underprogress_continue_button"
          >
            <Button
              onClick={() => redirectToHome(isPLCCModalFlow, closePLCCModal, resetPLCCResponse)}
              buttonVariation="fixed-width"
              type="submit"
              fill={!bagItems ? 'BLUE' : 'WHITE'}
              centered
              className="existing_continue_button"
            >
              {getLabelValue(labels, 'lbl_PLCCForm_continueShopping')}
            </Button>
          </Col>
        </Row>
      )}
    </ApplicationInProgressWrapper>
  );
};

ApplicationInProgress.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  isPLCCModalFlow: PropTypes.bool.isRequired,
  resetPLCCResponse: PropTypes.func.isRequired,
  isRtpsFlow: PropTypes.bool.isRequired,
  togglePLCCModal: PropTypes.func.isRequired,
  closePLCCModal: PropTypes.func.isRequired,
};

export default ApplicationInProgress;
