import React from 'react';
import PropTypes from 'prop-types';
import { Anchor, BodyCopy, RichText, Button, Col, Row } from '../../../../../../common/atoms';
import ApprovedPLCCApplicationViewStyled from './style/ApprovedPLCCApplication.style';
import { getLabelValue, scrollPage } from '../../../../../../../utils';
import { redirectToBag, redirectToHome, getModalSizeForApprovedPLCC } from '../../../utils/utility';
import { getCartItemCount } from '../../../../../../../utils/cookie.util';

const CopyToClipboard = e => {
  e.preventDefault();
  if (document.selection) {
    const range = document.body.createTextRange();
    range.moveToElementText(document.getElementById('couponCode'));
    range.select().createTextRange();
    document.execCommand('copy');
  } else if (window.getSelection) {
    const range = document.createRange();
    range.selectNode(document.getElementById('couponCode'));
    window.getSelection().addRange(range);
    document.execCommand('copy');
  }
};

/**
 * @description return coupon code container
 *
 * @param {contains successfully registered plcc data} approvedPLCCData
 * @param {set of labels to be displayed} labels
 * @param {moduleX content} plccData
 */
const getCouponCodeBody = (approvedPLCCData, labels = {}, plccData = {}, isPLCCModalFlow) => {
  scrollPage();
  return approvedPLCCData && approvedPLCCData.couponCode ? (
    <React.Fragment>
      <Row fullBleed className="centered">
        <Col
          ignoreGutter={{ small: true }}
          colSize={{ large: getModalSizeForApprovedPLCC(isPLCCModalFlow), medium: 8, small: 12 }}
        >
          <Row>
            <Col
              ignoreGutter={{ small: true }}
              colSize={{ large: 6, medium: 4, small: 12 }}
              className="promo_offer_section"
            >
              <BodyCopy
                fontWeight="black"
                fontSize="fs22"
                fontFamily="secondary"
                className="credit_limit_heading"
                aria-label={getLabelValue(labels, 'lbl_PLCCForm_rewardsCardHeading')}
                textAlign="center"
                id="couponCode"
              >
                {getLabelValue(labels, 'lbl_PLCCForm_welcomeOffer')}
              </BodyCopy>
              <BodyCopy
                component="div"
                fontWeight="black"
                fontSize="fs22"
                fontFamily="secondary"
                className="promo_code"
                tabIndex="0"
                textAlign="center"
              >
                {approvedPLCCData && approvedPLCCData.couponCode}
              </BodyCopy>
              <Anchor onClick={CopyToClipboard} asPath="/bag" underline>
                {getLabelValue(labels, 'lbl_PLCCForm_copyToClipboard')}
              </Anchor>
            </Col>
            <Col
              ignoreGutter={{ small: true }}
              colSize={{ large: 6, medium: 4, small: 12 }}
              className="promo-image-container "
            >
              <div className="promo-image" />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row fullBleed className="centered">
        <Col
          ignoreGutter={{ small: true }}
          colSize={{ large: getModalSizeForApprovedPLCC(isPLCCModalFlow), medium: 8, small: 12 }}
        >
          <RichText richTextHtml={plccData && plccData.plcc_approved_ps} />
        </Col>
      </Row>
      <Row fullBleed className="centered">
        <Col
          ignoreGutter={{ small: true }}
          colSize={{ large: getModalSizeForApprovedPLCC(isPLCCModalFlow), medium: 8, small: 12 }}
        >
          <hr className="horizontal_divider" />
        </Col>
      </Row>
    </React.Fragment>
  ) : null;
};

/**
 *
 * @description - return taotal saving and button footer set.
 *
 * @param {contains successfully registered plcc data} approvedPLCCData
 * @param {set of labels to be displayed} labels
 * @param {moduleX content} plccData
 * @param {} bagItems
 */
const totalSavingsFooterContainer = (
  approvedPLCCData = {},
  plccData = {},
  labels = {},
  bagItems,
  resetPLCCResponse
) => {
  return (
    <React.Fragment>
      {approvedPLCCData && approvedPLCCData.savingAmount > 0 ? (
        <Row fullBleed className="submit_plcc_form">
          <Col ignoreGutter={{ small: true }} colSize={{ large: 6, medium: 8, small: 12 }}>
            <RichText
              richTextHtml={
                plccData &&
                plccData.total_savings_amount.replace('amount', `$${approvedPLCCData.savingAmount}`)
              }
            />
          </Col>
        </Row>
      ) : null}
      {bagItems ? (
        <Row fullBleed className="submit_plcc_form">
          <Col
            ignoreGutter={{ small: true }}
            colSize={{ large: 3, medium: 4, small: 12 }}
            className="existing_checkout_button"
          >
            <Button
              buttonVariation="fixed-width"
              fill="BLUE"
              type="submit"
              className="existing_checkout_button"
              onClick={() => redirectToBag(resetPLCCResponse)}
            >
              {getLabelValue(labels, 'lbl_PLCCForm_checkout')}
            </Button>
          </Col>
        </Row>
      ) : null}
      <Row fullBleed className="submit_buttons_set">
        <Col
          className={`${
            !bagItems
              ? 'no_bag_items_continue existing_checkout_button'
              : 'existing_checkout_button'
          }`}
          ignoreGutter={{ small: true }}
          colSize={{ large: 3, medium: 4, small: 12 }}
        >
          <Button
            buttonVariation="fixed-width"
            fill={!bagItems ? 'BLUE' : 'WHITE'}
            type="submit"
            className="existing_continue_button"
            onClick={() => redirectToHome(resetPLCCResponse)}
          >
            {getLabelValue(labels, 'lbl_PLCCForm_continueShopping')}
          </Button>
        </Col>
      </Row>
    </React.Fragment>
  );
};

/**
 * @const ApprovedPLCCApplicationView
 *
 * @param - labels
 * @param - plccData - comprehensive plcc data for forming view of approved plcc customer.
 * @description - showcases user already holds a plcc card.
 */

const ApprovedPLCCApplicationView = ({
  plccData,
  labels,
  isPLCCModalFlow,
  approvedPLCCData,
  isGuest,
  resetPLCCResponse,
}) => {
  const bagItems = getCartItemCount();
  return (
    <ApprovedPLCCApplicationViewStyled isPLCCModalFlow={isPLCCModalFlow}>
      <div className="header-image" />
      <Row fullBleed className="submit_plcc_form">
        <Col
          ignoreGutter={{ small: true }}
          colSize={{ large: getModalSizeForApprovedPLCC(isPLCCModalFlow), medium: 8, small: 12 }}
          className="congratulations_header"
        >
          <BodyCopy
            fontWeight="bold"
            fontSize="fs22"
            fontFamily="secondary"
            className="credit_card_heading"
            aria-label={getLabelValue(labels, 'lbl_PLCCForm_rewardsCardHeading')}
            tabIndex="0"
            textAlign="center"
          >
            {`${getLabelValue(labels, 'lbl_PLCCForm_congratulations')} ${approvedPLCCData &&
              approvedPLCCData.address.firstName}!`}
          </BodyCopy>
        </Col>
      </Row>
      <Row fullBleed className="centered">
        <Col
          ignoreGutter={{ small: true }}
          colSize={{ large: getModalSizeForApprovedPLCC(isPLCCModalFlow), medium: 8, small: 12 }}
        >
          <BodyCopy
            fontWeight="bold"
            fontSize="fs22"
            fontFamily="secondary"
            className="credit_card_heading"
            aria-label={getLabelValue(labels, 'lbl_PLCCForm_rewardsCardHeading')}
            tabIndex="0"
            textAlign="center"
          >
            <RichText richTextHtml={plccData && plccData.rewards_card_welcome} />
          </BodyCopy>
        </Col>
      </Row>
      <Row fullBleed className="centered">
        <Col
          ignoreGutter={{ small: true }}
          colSize={{ large: getModalSizeForApprovedPLCC(isPLCCModalFlow), medium: 8, small: 12 }}
        >
          <BodyCopy
            fontWeight="extrabold"
            fontSize="fs22"
            fontFamily="secondary"
            className="credit_limit_heading"
            tabIndex="0"
            textAlign="center"
          >
            {getLabelValue(labels, 'lbl_PLCCForm_creditLimit')}
            {`$${approvedPLCCData && approvedPLCCData.creditLimit}`}
          </BodyCopy>
        </Col>
      </Row>
      <Row fullBleed className="centered">
        <Col
          ignoreGutter={{ small: true }}
          colSize={{ large: getModalSizeForApprovedPLCC(isPLCCModalFlow), medium: 8, small: 12 }}
        >
          {!isGuest ? (
            <RichText richTextHtml={plccData && plccData.plcc_shipping_info} />
          ) : (
            <RichText richTextHtml={plccData && plccData.guest_shipping_info} />
          )}
        </Col>
      </Row>
      <Row fullBleed className="centered">
        <Col
          ignoreGutter={{ small: true }}
          colSize={{ large: getModalSizeForApprovedPLCC(isPLCCModalFlow), medium: 8, small: 12 }}
        >
          <hr className="horizontal_divider" />
        </Col>
      </Row>
      {getCouponCodeBody(approvedPLCCData, labels, plccData, isPLCCModalFlow)}
      {totalSavingsFooterContainer(approvedPLCCData, plccData, labels, bagItems, resetPLCCResponse)}
      <Row fullBleed className="centered">
        <Col
          ignoreGutter={{ small: true }}
          colSize={{ large: 3, medium: 3, small: 12 }}
          className="footer_links"
        >
          <BodyCopy component="span" fontSize="fs12" fontFamily="secondary">
            {getLabelValue(labels, 'lbl_PLCCModal_linksTextPrefix')}
          </BodyCopy>
          <Anchor
            url={getLabelValue(labels, 'lbl_PLCCForm_detailsLink')}
            target="_blank"
            fontSizeVariation="large"
            anchorVariation="primary"
            className="linkIconSeperator"
            underline
          >
            {getLabelValue(labels, 'lbl_PLCCForm_details')}
          </Anchor>
        </Col>
      </Row>
    </ApprovedPLCCApplicationViewStyled>
  );
};

ApprovedPLCCApplicationView.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  isPLCCModalFlow: PropTypes.bool.isRequired,
  approvedPLCCData: PropTypes.shape({}).isRequired,
  isGuest: PropTypes.bool.isRequired,
  plccData: PropTypes.shape({}).isRequired,
  resetPLCCResponse: PropTypes.func.isRequired,
};

export default ApprovedPLCCApplicationView;
