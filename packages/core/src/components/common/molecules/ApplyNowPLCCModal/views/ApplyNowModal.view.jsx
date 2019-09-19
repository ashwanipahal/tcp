import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';

import { RichText, Anchor, BodyCopy, Button, Row, Col } from '../../../atoms';
import Modal from '../../Modal';
import withStyles from '../../../hoc/withStyles';
import { getLocator } from '../../../../../utils';
import styles, { modalStyles } from '../styles/ApplyNowModal.style';
import ApplyNowPLCCModal from './ApplyNowPLCCModal';

/**
 * @constant ApplyNowModal - Opens a Modal containing modal to open apply plcc modal.
 */
const StyledApplyNowModal = ({
  className,
  isModalOpen,
  closePLCCModal,
  isPLCCModalOpen,
  openPLCCModal,
  closeModal,
  labels,
  plccBenefitsList,
  handleTimedOutModal,
}) => {
  return !isPLCCModalOpen ? (
    <Modal
      fixedWidth
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      heading={getLabelValue(labels, 'apply_now_header')}
      overlayClassName="TCPModal__Overlay"
      className={`${className} TCPModal__Content`}
      dataLocator={getLocator('plcc_apply_now_modal')}
      dataLocatorHeader={getLocator('plcc_apply_now_close_btn')}
      maxWidth="464px"
      minHeight="646px"
      inheritedStyles={modalStyles}
      shouldCloseOnOverlayClick={false}
      innerContentClassName="innerContent"
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
              {getLabelValue(labels, 'apply_now_subheader')}
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
              onClick={openPLCCModal}
              data-locator={getLocator('plcc_apply_btn')}
            >
              {getLabelValue(labels, 'applynow_cta')}
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
              url={getLabelValue(labels, 'learn_more_link')}
              fontSizeVariation="large"
              anchorVariation="secondary"
              underline
              target="_blank"
            >
              {getLabelValue(labels, 'apply_now_learn_more')}
            </Anchor>
          </Col>
        </Row>
        <div
          className="offer_info_icon"
          data-locator="plcc_modal_logo"
          offerType={getLabelValue(labels, 'oneequalstwopointsoffer')}
        />
        <BodyCopy
          fontFamily="primary"
          fontSize="fs28"
          fontWeight="black"
          textAlign="center"
          color="text.secondary"
        >
          {getLabelValue(labels, 'apply_now_benefits_header')}
        </BodyCopy>
        <RichText className="rewards__benefits" richTextHtml={plccBenefitsList} />
        <div className="footerLinks">
          <BodyCopy component="span" fontSize="fs12" fontFamily="secondary">
            {getLabelValue(labels, 'apply_now_links_text')}
          </BodyCopy>
          <Anchor
            className="linkIconSeperator"
            url={getLabelValue(labels, 'details_link')}
            target="_blank"
            fontSizeVariation="large"
            anchorVariation="primary"
            underline
          >
            {getLabelValue(labels, 'apply_now_details')}
          </Anchor>
          <Anchor
            className="footerLink"
            url={getLabelValue(labels, 'faq_link')}
            target="_blank"
            data-locator="plcc_faq"
            fontSizeVariation="large"
            anchorVariation="primary"
            underline
          >
            {getLabelValue(labels, 'apply_now_faq')}
          </Anchor>
          <Anchor
            className="footerLink"
            url={getLabelValue(labels, 'rewards_program_link')}
            target="_blank"
            data-locator="plcc_rewards_terms"
            fontSizeVariation="large"
            anchorVariation="primary"
            underline
          >
            {getLabelValue(labels, 'apply_now_rewardTerms')}
          </Anchor>
        </div>
      </div>
    </Modal>
  ) : (
    <ApplyNowPLCCModal
      className={className}
      isPLCCModalOpen={isPLCCModalOpen}
      closePLCCModal={closePLCCModal}
      handleTimedOutModal={handleTimedOutModal}
    />
  );
};

StyledApplyNowModal.propTypes = {
  className: PropTypes.string.isRequired,
  closePLCCModal: PropTypes.func.isRequired,
  isPLCCModalOpen: PropTypes.bool.isRequired,
  openPLCCModal: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  plccBenefitsList: PropTypes.string.isRequired,
  handleTimedOutModal: PropTypes.func.isRequired,
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
