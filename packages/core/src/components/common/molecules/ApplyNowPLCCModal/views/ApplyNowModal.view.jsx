import React from 'react';
import PropTypes from 'prop-types';
import { Anchor, BodyCopy, Button, Row, Col } from '@tcp/core/src/components/common/atoms';
import { Modal } from '@tcp/core/src/components/common/molecules';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import { getLocator } from '@tcp/core/src/utils';

import styles, { modalStyles } from '../styles/ApplyNowModal.style';

/**
 * @class ApplyNowModal - Opens a Modal containing modal to open apply plcc modal.
 */
class StyledApplyNowModal extends React.Component {
  /**
   * @description - renderBenefitsList - function to return list of benefits
   */

  renderBenefitsList = labels => {
    return (
      <ul className="rewards__benefits">
        <li>
          <BodyCopy
            fontFamily="primary"
            fontSize="fs14"
            component="span"
            fontWeight="semibold"
            textAlign="center"
            color="text.primary"
          >
            {labels.apply_now_double}
          </BodyCopy>
          {labels.apply_now_double_subtext}
        </li>
        <li>
          <BodyCopy
            fontFamily="primary"
            fontSize="fs14"
            component="span"
            fontWeight="semibold"
            textAlign="center"
            color="text.primary"
          >
            {labels.apply_now_discount_30}
          </BodyCopy>
          {labels.apply_now_discount_30_subtext}
        </li>
        <li>
          <BodyCopy
            fontFamily="primary"
            fontSize="fs14"
            component="span"
            fontWeight="semibold"
            textAlign="center"
            color="text.primary"
          >
            {labels.apply_now_discount_25}
          </BodyCopy>
          {labels.apply_now_discount_25_subtext}
        </li>
        <li>
          <BodyCopy
            fontFamily="primary"
            fontSize="fs14"
            component="span"
            fontWeight="semibold"
            textAlign="center"
            color="text.primary"
          >
            {labels.apply_now_discount_20}
          </BodyCopy>
          {labels.apply_now_discount_20_subtext}
        </li>
        <li>
          <BodyCopy
            fontFamily="primary"
            fontSize="fs14"
            component="span"
            fontWeight="semibold"
            textAlign="center"
            color="text.primary"
          >
            {labels.apply_now_discount_standard}
          </BodyCopy>
          {labels.apply_now_discount_standard_subtext}
        </li>
      </ul>
    );
  };

  render() {
    const { className, isModalOpen, closeModal, labels } = this.props;
    return (
      <Modal
        fixedWidth
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        heading={labels.apply_now_header}
        overlayClassName="TCPModal__Overlay"
        className={`${className} TCPModal__Content`}
        dataLocator={getLocator('plcc_apply_now_modal')}
        dataLocatorHeader={getLocator('plcc_apply_now_close_btn')}
        maxWidth="458px"
        minHeight="788px"
        inheritedStyles={modalStyles}
        shouldCloseOnOverlayClick={false}
      >
        <div className="Modal__Content__Wrapper">
          <Row fullBleed className="submit_plcc_form">
            <Col
              ignoreGutter={{ small: true }}
              colSize={{ large: 12, medium: 8, small: 6 }}
              className="submit_button_plcc_form_container"
            >
              <div className="header-image" />
            </Col>
          </Row>
          <Row fullBleed className="submit_plcc_form">
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
                className="header__greeting"
              >
                {labels.apply_now_subheader}
              </BodyCopy>
            </Col>
          </Row>

          <Row fullBleed className="ApplyNow__link__Wrapper">
            <Col ignoreGutter={{ small: true }} colSize={{ large: 12, medium: 8, small: 6 }}>
              <Button
                buttonVariation="fixed-width"
                fill="BLUE"
                type="submit"
                className="ApplyNow__link"
                data-locator={getLocator('plcc_apply_btn')}
              >
                {labels.applynow_cta}
              </Button>
            </Col>
          </Row>
          <Row className="learn_more_link_wrapper">
            <Col
              ignoreGutter={{ small: true }}
              colSize={{ large: 10, medium: 8, small: 6 }}
              aria-label="learn_more_link"
              className="learn_more_link"
            >
              <Anchor url={labels.learn_more_link}>{labels.apply_now_learn_more}</Anchor>
            </Col>
          </Row>
          <div className="offer_info_icon" />
          <BodyCopy
            fontFamily="primary"
            fontSize="fs28"
            fontWeight="black"
            textAlign="center"
            color="text.secondary"
          >
            {labels.apply_now_benefits_header}
          </BodyCopy>
          {this.renderBenefitsList(labels)}
          <div className="footerLinks">
            <BodyCopy component="span" fontSize="fs12" fontFamily="secondary">
              {labels.apply_now_links_text}
            </BodyCopy>
            <Anchor className="linkIconSeperator" url={labels.details_link}>
              {labels.apply_now_details}
            </Anchor>
            <Anchor className="footerLink" url={labels.faq_link}>
              {labels.apply_now_faq}
            </Anchor>
            <Anchor className="footerLink" url={labels.rewards_program_link}>
              {labels.apply_now_rewardTerms}
            </Anchor>
          </div>
        </div>
      </Modal>
    );
  }
}

StyledApplyNowModal.propTypes = {
  className: PropTypes.string.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  labels: PropTypes.shape({
    apply_now_header: PropTypes.string.isRequired,
    apply_now_subheader: PropTypes.string.isRequired,
    applynow_cta: PropTypes.string.isRequired,
    learn_more_link: PropTypes.string.isRequired,
    apply_now_learn_more: PropTypes.string.isRequired,
    apply_now_benefits_header: PropTypes.string.isRequired,
    apply_now_links_text: PropTypes.string.isRequired,
    details_link: PropTypes.string.isRequired,
    apply_now_details: PropTypes.string.isRequired,
    faq_link: PropTypes.string.isRequired,
    apply_now_faq: PropTypes.string.isRequired,
    rewards_program_link: PropTypes.string.isRequired,
    apply_now_rewardTerms: PropTypes.string.isRequired,
  }).isRequired,
};

export default withStyles(StyledApplyNowModal, styles);
export { StyledApplyNowModal as StyledApplyNowModalVanilla };
