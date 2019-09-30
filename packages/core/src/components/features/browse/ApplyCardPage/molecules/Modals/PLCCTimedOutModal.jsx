import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy, Button, Row, Col } from '../../../../../common/atoms';
import Modal from '../../../../../common/molecules/Modal';
import withStyles from '../../../../../common/hoc/withStyles';
import { getLocator, isClient, routerPush, getLabelValue } from '../../../../../../utils';
import styles, { modalStyles } from './styles/PLCCTimeOutModal.style';
import getModalHeight from '../../utils/modalHelper';

/**
 * @class PLCCTimedoutModal - Opens a Modal containing information about application closure.
 */
class StyledPLCCTimedoutModal extends React.PureComponent {
  componentDidMount() {
    const { unregisterIdleVerfication } = this.props;
    unregisterIdleVerfication();
  }

  restartApplication = () => {
    const { handleFormReset, isPLCCModalFlow } = this.props;
    if (isPLCCModalFlow) {
      handleFormReset();
    } else if (isClient()) {
      window.location.reload();
    }
  };

  handleCheckoutClick = () => {
    routerPush(window.location.href, '/bag');
  };

  render() {
    const { className, isModalOpen, labels, isPLCCModalFlow, bagItems } = this.props;
    return (
      <Modal
        fixedWidth
        isOpen={isModalOpen}
        onRequestClose={this.restartApplication}
        overlayClassName="TCPModal__Overlay"
        className={`${className} TCPModal__Content`}
        dataLocatorHeader={getLocator('plcc_time_out_modal_2_close_btn')}
        maxWidth="458px"
        minHeight={getModalHeight(bagItems, isPLCCModalFlow)}
        inheritedStyles={modalStyles}
        shouldCloseOnOverlayClick={false}
      >
        <div className="Modal__Content__Wrapper">
          <Row fullBleed className="modal_content">
            <Col
              ignoreGutter={{ small: true }}
              colSize={{ large: 12, medium: 8, small: 6 }}
              className="submit_button_plcc_form_container"
            >
              <div data-locator={getLocator('plcc_time_out_modal_logo')} className="header-image" />
            </Col>
          </Row>
          <Row fullBleed className="modal_content">
            <Col
              ignoreGutter={{ small: true }}
              colSize={{ large: 12, medium: 8, small: 6 }}
              className="submit_button_plcc_form_container"
            >
              <BodyCopy
                component="div"
                color="black.900"
                fontWeight="black"
                fontFamily="primary"
                fontSize="fs36"
                textAlign="center"
                data-locator={getLocator('plcc_time_out_modal_text')}
                className="info_text_margin"
              >
                {isPLCCModalFlow
                  ? getLabelValue(labels, 'lbl_PLCCTimeoutModal_preacceptance')
                  : getLabelValue(labels, 'lbl_PLCCTimeoutModal_applicationClosure')}
              </BodyCopy>
            </Col>
          </Row>
          <Row fullBleed className="modal_content">
            <Col
              ignoreGutter={{ small: true }}
              colSize={{ large: 12, medium: 8, small: 6 }}
              className="submit_button_plcc_form_container"
            >
              <BodyCopy
                component="div"
                color="gray.900"
                fontFamily="secondary"
                fontSize="fs14"
                textAlign="center"
                className="info_text_margin"
              >
                {getLabelValue(labels, 'lbl_PLCCTimeoutModal_closureSubHeader')}
              </BodyCopy>
            </Col>
          </Row>
          <Row fullBleed className="modal_content">
            <Col
              ignoreGutter={{ small: true }}
              colSize={{ large: 9, medium: 6, small: 12 }}
              className="restart_application_button"
            >
              <Button
                buttonVariation="fixed-width"
                fill="BLUE"
                type="submit"
                className="restart_application_button"
                data-locator={getLocator('plcc_time_out_modal_restart_application')}
                onClick={this.restartApplication}
              >
                {isPLCCModalFlow
                  ? getLabelValue(labels, 'lbl_PLCCTimeoutModal_restartAcceptance')
                  : getLabelValue(labels, 'lbl_PLCCTimeoutModal_restartApplication')}
              </Button>
            </Col>
          </Row>
          {bagItems ? (
            <Row fullBleed className="modal_content">
              <Col
                ignoreGutter={{ small: true }}
                colSize={{ large: 9, medium: 6, small: 12 }}
                className="restart_application_button"
              >
                <Button
                  buttonVariation="fixed-width"
                  fill="WHITE"
                  type="submit"
                  className="returnto_checkout"
                  data-locator={getLocator('plcc_time_out_modal_return_to_checkout')}
                  onClick={this.handleCheckoutClick}
                >
                  {getLabelValue(labels, 'lbl_PLCCTimeoutModal_returnCheckout')}
                </Button>
              </Col>
            </Row>
          ) : null}
        </div>
      </Modal>
    );
  }
}

StyledPLCCTimedoutModal.propTypes = {
  className: PropTypes.string.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  handleFormReset: PropTypes.func.isRequired,
  isPLCCModalFlow: PropTypes.bool.isRequired,
  bagItems: PropTypes.bool.isRequired,
  unregisterIdleVerfication: PropTypes.func.isRequired,
  labels: PropTypes.shape({
    lbl_PLCCTimeoutModal_restartAcceptance: PropTypes.string.isRequired,
    lbl_PLCCTimeoutModal_restartApplication: PropTypes.string.isRequired,
    lbl_PLCCTimeoutModal_returnCheckout: PropTypes.string.isRequired,
    lbl_PLCCTimeoutModal_closureSubHeader: PropTypes.string.isRequired,
    lbl_PLCCTimeoutModal_applicationClosure: PropTypes.string.isRequired,
    lbl_PLCCTimeoutModal_preacceptance: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(StyledPLCCTimedoutModal, styles);
export { StyledPLCCTimedoutModal as StyledPLCCTimedoutModalVanilla };
