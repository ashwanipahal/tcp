import React from 'react';
import PropTypes from 'prop-types';
import { Anchor, BodyCopy, Button, Row, Col } from '../../../../../common/atoms';
import Modal from '../../../../../common/molecules/Modal';
import withStyles from '../../../../../common/hoc/withStyles';
import { getLocator } from '../../../../../../utils';
import styles, { modalStyles } from './styles/PLCCTimedOutModal.style';

/**
 * @constant PLCCTimedoutModal - Opens a Modal containing information about application closure.
 */
const StyledPLCCTimedoutModal = ({ className, isModalOpen, closeModal, labels }) => {
  return (
    <Modal
      fixedWidth
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      overlayClassName="TCPModal__Overlay"
      className={`${className} TCPModal__Content`}
      dataLocator={getLocator('plcc_apply_now_modal')}
      dataLocatorHeader={getLocator('plcc_apply_now_close_btn')}
      maxWidth="458px"
      minHeight="420px"
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
            <div className="header-image" />
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
              data-locator={getLocator('ship_to_text_2')}
              className="info_text_margin"
            >
              {labels && labels.plcc_application_closure}
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
              data-locator={getLocator('ship_to_text_2')}
              className="info_text_margin"
            >
              {labels && labels.plcc_application_closure_subheader}
            </BodyCopy>
          </Col>
        </Row>
        <Row fullBleed className="modal_content">
          <Col
            ignoreGutter={{ small: true }}
            colSize={{ large: 9, medium: 6, small: 12 }}
            className="restart_application_button"
          >
            <Anchor asPath="/bag">
              <Button
                buttonVariation="fixed-width"
                fill="BLUE"
                type="submit"
                className="restart_application_button"
                data-locator="submit-plcc-btn"
              >
                {labels && labels.plcc_restart_application}
              </Button>
            </Anchor>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

StyledPLCCTimedoutModal.propTypes = {
  className: PropTypes.string.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  labels: PropTypes.shape({
    plcc_restart_application: PropTypes.string.isRequired,
    plcc_application_closure_subheader: PropTypes.string.isRequired,
    plcc_application_closure: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(StyledPLCCTimedoutModal, styles);
export { StyledPLCCTimedoutModal as StyledPLCCTimedoutModalVanilla };
