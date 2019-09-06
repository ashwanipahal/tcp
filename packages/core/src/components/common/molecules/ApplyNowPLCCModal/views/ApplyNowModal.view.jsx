import React from 'react';
import PropTypes from 'prop-types';
import { Anchor, BodyCopy, Button, Row, Col } from '../../../atoms';
import Modal from '../../Modal';
import withStyles from '../../../hoc/withStyles';
import { getLocator } from '../../../../../utils';
import styles, { modalStyles } from '../styles/ApplyNowModal.style';

/**
 * @description - getBenefitsListItems - renders per list item.
 */
export const getBenefitsListItems = (text, subtext) => {
  return (
    <li>
      <BodyCopy
        fontFamily="primary"
        fontSize="fs14"
        component="span"
        fontWeight="semibold"
        textAlign="center"
        color="text.primary"
      >
        {text}
      </BodyCopy>
      {subtext}
    </li>
  );
};

/**
 * @description - renderBenefitsList - function to return list of benefits
 */
export const renderBenefitsList = labels => {
  return (
    <ul className="rewards__benefits">
      {getBenefitsListItems(labels.apply_now_double, labels.apply_now_double_subtext)}
      {getBenefitsListItems(labels.apply_now_discount_30, labels.apply_now_discount_30_subtext)}
      {getBenefitsListItems(labels.apply_now_discount_25, labels.apply_now_discount_25_subtext)}
      {getBenefitsListItems(labels.apply_now_discount_20, labels.apply_now_discount_20_subtext)}
      {getBenefitsListItems(
        labels.apply_now_discount_standard,
        labels.apply_now_discount_standard_subtext
      )}
    </ul>
  );
};

/**
 * @constant ApplyNowModal - Opens a Modal containing modal to open apply plcc modal.
 */
const StyledApplyNowModal = ({ className, isModalOpen, closeModal, labels }) => {
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
      minHeight="746px"
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
            data-locator="plcc_modal_learn_more_link"
            aria-label="learn_more_link"
            className="learn_more_link"
          >
            <Anchor
              url={labels.learn_more_link}
              fontSizeVariation="large"
              anchorVariation="secondary"
              underline
              target="_blank"
            >
              {labels.apply_now_learn_more}
            </Anchor>
          </Col>
        </Row>
        <div
          className="offer_info_icon"
          data-locator="plcc_modal_logo"
          offerType={labels.oneequalstwopointsoffer}
        />
        <BodyCopy
          fontFamily="primary"
          fontSize="fs28"
          fontWeight="black"
          textAlign="center"
          color="text.secondary"
        >
          {labels.apply_now_benefits_header}
        </BodyCopy>
        {renderBenefitsList(labels)}
        <div className="footerLinks">
          <BodyCopy component="span" fontSize="fs12" fontFamily="secondary">
            {labels.apply_now_links_text}
          </BodyCopy>
          <Anchor
            className="linkIconSeperator"
            url={labels.details_link}
            target="_blank"
            fontSizeVariation="large"
            anchorVariation="primary"
            underline
          >
            {labels.apply_now_details}
          </Anchor>
          <Anchor
            className="footerLink"
            url={labels.faq_link}
            target="_blank"
            data-locator="plcc_faq"
            fontSizeVariation="large"
            anchorVariation="primary"
            underline
          >
            {labels.apply_now_faq}
          </Anchor>
          <Anchor
            className="footerLink"
            url={labels.rewards_program_link}
            target="_blank"
            data-locator="plcc_rewards_terms"
            fontSizeVariation="large"
            anchorVariation="primary"
            underline
          >
            {labels.apply_now_rewardTerms}
          </Anchor>
        </div>
      </div>
    </Modal>
  );
};

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
    oneequalstwopointsoffer: PropTypes.bool.isRequired,
  }).isRequired,
};

export default withStyles(StyledApplyNowModal, styles);
export { StyledApplyNowModal as StyledApplyNowModalVanilla };
