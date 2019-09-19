import React from 'react';
import PropTypes from 'prop-types';
import { BodyCopy, Button, Row, Col } from '../../../../../common/atoms';
import Modal from '../../../../../common/molecules/Modal';
import withStyles from '../../../../../common/hoc/withStyles';
import { getLocator, getLabelValue } from '../../../../../../utils';
import styles, { modalStyles } from './styles/PLCCTimeOutModal.style';
import StyledPLCCTimeOutModal from './PLCCTimedOutModal';

/**
 * @constant StyledPLCCTimeoutInterimModal - Opens a Modal containing information about application closure.
 */
class StyledPLCCTimeoutInterimModal extends React.Component {
  static propTypes = {
    className: PropTypes.string.isRequired,
    isModalOpen: PropTypes.bool.isRequired,
    bagItems: PropTypes.bool.isRequired,
    isPLCCModalFlow: PropTypes.func.isRequired,
    isTimedOutModalActive: PropTypes.bool.isRequired,
    handleFormReset: PropTypes.func.isRequired,
    time: PropTypes.number.isRequired,
    unregisterIdleVerfication: PropTypes.func.isRequired,
    handleContinueApplication: PropTypes.func.isRequired,
    labels: PropTypes.shape({
      plcc_restart_application: PropTypes.string.isRequired,
      plcc_application_closure_subheader: PropTypes.string.isRequired,
      plcc_application_closure: PropTypes.string.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      currentTime: props.time,
    };
  }

  componentDidMount() {
    const { unregisterIdleVerfication } = this.props;
    unregisterIdleVerfication();
    this.interval = setInterval(() => {
      const { currentTime } = this.state;
      const newTime = currentTime - 1;

      this.setState({
        currentTime: newTime,
      });

      if (newTime === 0) {
        clearInterval(this.interval);
        this.interval = null;
      }
    }, 1000);
  }

  handleCloseClick = () => {
    const { handleContinueApplication } = this.props;
    clearInterval(this.interval);
    this.interval = null;
    handleContinueApplication();
  };

  render() {
    const {
      className,
      isModalOpen,
      labels,
      handleContinueApplication,
      isPLCCModalFlow,
      bagItems,
      handleFormReset,
      isTimedOutModalActive,
    } = this.props;
    const { currentTime } = this.state;
    let modalBody;
    if (currentTime > 0) {
      modalBody = (
        <Modal
          fixedWidth
          isOpen={isModalOpen}
          onRequestClose={this.handleCloseClick}
          overlayClassName="TCPModal__Overlay"
          className={`${className} TCPModal__Content`}
          dataLocatorHeader={getLocator('plcc_time_out_modal_2_close_btn')}
          maxWidth="458px"
          minHeight="387px"
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
                <div
                  data-locator={getLocator('plcc_time_out_modal_logo')}
                  className="header-image"
                />
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
                  {getLabelValue(labels, 'plcc_timeout_stillThere')}
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
                  {labels && labels.plcc_timout_interim_text.replace('XX', currentTime)}
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
                  data-locator={getLocator('plcc_time_out_modal_continue')}
                  onClick={handleContinueApplication}
                >
                  {getLabelValue(labels, 'plcc_timeout_continue_application')}
                </Button>
              </Col>
            </Row>
          </div>
        </Modal>
      );
    } else {
      modalBody = (
        <StyledPLCCTimeOutModal
          isPLCCModalFlow={isPLCCModalFlow}
          isModalOpen={currentTime === 0 && !isTimedOutModalActive}
          labels={labels}
          handleFormReset={handleFormReset}
          bagItems={bagItems}
        />
      );
    }
    return modalBody;
  }
}

export default withStyles(StyledPLCCTimeoutInterimModal, styles);
export { StyledPLCCTimeoutInterimModal as StyledPLCCTimeoutInterimModalVanilla };
