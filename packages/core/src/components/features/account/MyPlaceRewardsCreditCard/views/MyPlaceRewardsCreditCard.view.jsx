import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { getLabelValue, getLocator } from '@tcp/core/src/utils/utils';
import FormPageHeading from '../../common/molecule/FormPageHeading';
import { Row, Col, BodyCopy, Button, Anchor } from '../../../../common/atoms';
import styles from '../styles/MyPlaceRewardsCreditCard.style';
import withStyles from '../../../../common/hoc/withStyles';
import ApplyNowPLCCModal from '../../../../common/molecules/ApplyNowPLCCModal/molecules/ApplyNowPLCCModal/views';

export class MyPlaceRewardsCreditCard extends PureComponent {
  openManageCreditCardLink = e => {
    e.preventDefault();
    const { labels } = this.props;
    window.open(getLabelValue(labels, 'lbl_PLCCModal_applyAcceptOfferLink'), '_blank');
  };

  render() {
    const { labels, className, isPLCCModalOpen, openPLCCModal, closePLCCModal } = this.props;
    return (
      <div className={className}>
        <FormPageHeading
          heading={getLabelValue(labels, 'lbl_PLCCForm_rewardsCardHeading')}
          data-locator=""
        />

        <div className="Modal__Content__Wrapper">
          <Row fullBleed>
            <Col ignoreGutter={{ small: true }} colSize={{ large: 12, medium: 8, small: 6 }}>
              <Row fullBleed centered className="Benefit_Heading_Suffix">
                <BodyCopy
                  fontFamily="primary"
                  fontSize="fs48"
                  fontWeight="black"
                  textAlign="center"
                  className="Benefit_Heading"
                >
                  {getLabelValue(labels, 'lbl_PLCCModal_applyNowHeaderText')}
                </BodyCopy>
                <BodyCopy
                  fontFamily="primary"
                  fontSize="fs12"
                  fontWeight="black"
                  textAlign="center"
                  component="span"
                >
                  {getLabelValue(labels, 'lbl_PLCCModal_applyNowHeaderTextSuffix')}
                </BodyCopy>
              </Row>

              <div className="header-image" />
            </Col>
          </Row>
          <Row fullBleed>
            <Col ignoreGutter={{ small: true }} colSize={{ large: 12, medium: 8, small: 6 }}>
              <BodyCopy
                component="div"
                color="gray.900"
                fontFamily="secondary"
                fontSize="fs22"
                textAlign="center"
                className="apply-now-subtext"
                data-locator={getLocator('ship_to_text_2')}
              >
                {getLabelValue(labels, 'lbl_PLCCModal_applyNowSubText')}
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
                fontWeight="semibold"
                data-locator={getLocator('plcc_apply_btn')}
              >
                {getLabelValue(labels, 'lbl_PLCCModal_applyNowCTA')}
              </Button>
            </Col>
            <Col ignoreGutter={{ small: true }} colSize={{ large: 12, medium: 8, small: 6 }}>
              <Button
                buttonVariation="fixed-width"
                fill="WHITE"
                type="submit"
                className="ApplyNow__link blackFontColor"
                onClick={this.openManageCreditCardLink}
                fontWeight="semibold"
                data-locator={getLocator('plcc_apply_btn')}
              >
                {getLabelValue(labels, 'lbl_PLCCForm_manageCreditCardAccount')}
              </Button>
            </Col>
          </Row>
          <BodyCopy
            fontFamily="primary"
            fontSize="fs48"
            fontWeight="black"
            textAlign="center"
            color="text.secondary"
            className="benefits-text elem-mt-XL"
          >
            {getLabelValue(labels, 'lbl_PLCCModal_benefitsText')}
          </BodyCopy>
          <Row fullBleed>
            <Col ignoreGutter={{ small: true }} colSize={{ large: 12, medium: 8, small: 6 }}>
              <BodyCopy
                component="div"
                color="gray.900"
                fontFamily="secondary"
                fontSize="fs22"
                textAlign="center"
                data-locator={getLocator('ship_to_text_2')}
                className="withMyPlaceRewardText"
              >
                {getLabelValue(labels, 'lbl_PLCCForm_withMyPlaceRewardsCard')}
              </BodyCopy>
            </Col>
          </Row>
          <div
            className="offer_info_icon elem-mt-LRG"
            data-locator="plcc_modal_logo"
            offerType={getLabelValue(labels, 'lbl_PLCCModal_oneEqualsTwoPoints')}
          />
        </div>

        <Row fullBleed>
          <Col ignoreGutter={{ small: true }} colSize={{ large: 12, medium: 8, small: 6 }}>
            <div className="table-image" />
          </Col>
        </Row>

        <div className="footerLinks">
          <BodyCopy component="span" fontSize="fs12" fontFamily="secondary">
            {getLabelValue(labels, 'lbl_PLCCModal_linksTextPrefix')}
          </BodyCopy>
          <Anchor
            className="linkIconSeperator"
            url={getLabelValue(labels, 'lbl_PLCCModal_detailsLink')}
            target="_blank"
            fontSizeVariation="large"
            anchorVariation="primary"
            underline
          >
            {getLabelValue(labels, 'lbl_PLCCForm_details')}
          </Anchor>
          <Anchor
            className="footerLink"
            url={getLabelValue(labels, 'lbl_PLCCModal_faqLink')}
            target="_blank"
            data-locator="plcc_faq"
            fontSizeVariation="large"
            anchorVariation="primary"
            underline
          >
            {getLabelValue(labels, 'lbl_PLCCModal_faqText')}
          </Anchor>
          <Anchor
            className="footerLink"
            url={getLabelValue(labels, 'lbl_PLCCModal_rewardsProgramLink')}
            target="_blank"
            data-locator="plcc_rewards_terms"
            fontSizeVariation="large"
            anchorVariation="primary"
            underline
          >
            {getLabelValue(labels, 'lbl_PLCCModal_rewardsProgramText')}
          </Anchor>
        </div>
        {isPLCCModalOpen && (
          <ApplyNowPLCCModal isPLCCModalOpen={isPLCCModalOpen} closePLCCModal={closePLCCModal} />
        )}
      </div>
    );
  }
}

MyPlaceRewardsCreditCard.propTypes = {
  labels: PropTypes.shape({}),
  className: PropTypes.string.isRequired,
  isPLCCModalOpen: PropTypes.bool,
  closePLCCModal: PropTypes.func.isRequired,
  openPLCCModal: PropTypes.func.isRequired,
};

MyPlaceRewardsCreditCard.defaultProps = {
  labels: {},
  isPLCCModalOpen: false,
};

export default withStyles(MyPlaceRewardsCreditCard, styles);
