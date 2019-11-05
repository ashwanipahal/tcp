import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { getLabelValue, getLocator } from '@tcp/core/src/utils/utils';
import FormPageHeading from '../../common/molecule/FormPageHeading';
import { BodyCopy, Button, Anchor } from '../../../../common/atoms';
import styles from '../styles/MyPlaceRewardsCreditCard.style';
import withStyles from '../../../../common/hoc/withStyles';
import ApplyNowPLCCModal from '../../../../common/molecules/ApplyNowPLCCModal';

export class MyPlaceRewardsCreditCard extends PureComponent {
  openManageCreditCardLink = e => {
    e.preventDefault();
    const { labels } = this.props;
    window.open(getLabelValue(labels, 'lbl_PLCCModal_applyAcceptOfferLink'), '_blank');
  };

  render() {
    const { labels, className, isPLCCModalOpen, openPLCCModal } = this.props;
    return (
      <div className={className}>
        <FormPageHeading
          heading={getLabelValue(labels, 'lbl_PLCCForm_rewardsCardHeading')}
          data-locator=""
        />

        <div className="Content_Wrapper">
          <BodyCopy
            fontFamily="primary"
            fontSize="fs48"
            fontWeight="black"
            textAlign="center"
            className="Benefit_Heading"
          >
            {getLabelValue(labels, 'lbl_PLCCModal_applyNowHeaderText')}
            <BodyCopy
              fontFamily="primary"
              fontSize="fs12"
              fontWeight="black"
              textAlign="center"
              component="sup"
              className="Benefit_Heading_Suffix"
            >
              {getLabelValue(labels, 'lbl_PLCCModal_applyNowHeaderTextSuffix')}
            </BodyCopy>
          </BodyCopy>

          <div className="header-image" />

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
          <BodyCopy component="div" className="button_wrapper">
            <Button
              buttonVariation="fixed-width"
              fill="BLUE"
              type="submit"
              fontSize="fs14"
              onClick={openPLCCModal}
              fontWeight="semibold"
              data-locator={getLocator('plcc_apply_btn')}
            >
              {getLabelValue(labels, 'lbl_PLCCModal_applyNowCTA')}
            </Button>
            <Button
              buttonVariation="fixed-width"
              fill="WHITE"
              type="submit"
              fontSize="fs14"
              className="elem-mt-MED"
              onClick={this.openManageCreditCardLink}
              fontWeight="semibold"
              data-locator={getLocator('plcc_apply_btn')}
            >
              {getLabelValue(labels, 'lbl_PLCCForm_manageCreditCardAccount')}
            </Button>
          </BodyCopy>
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
          <div
            className="offer_info_icon elem-mt-LRG"
            data-locator="plcc_modal_logo"
            offerType={getLabelValue(labels, 'lbl_PLCCModal_oneEqualsTwoPoints')}
          />
        </div>

        <div className="table-image" />

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
        {isPLCCModalOpen && <ApplyNowPLCCModal isPLCCModalOpen={isPLCCModalOpen} />}
      </div>
    );
  }
}

MyPlaceRewardsCreditCard.propTypes = {
  labels: PropTypes.shape({}),
  className: PropTypes.string.isRequired,
  isPLCCModalOpen: PropTypes.bool,
  openPLCCModal: PropTypes.func.isRequired,
};

MyPlaceRewardsCreditCard.defaultProps = {
  labels: {},
  isPLCCModalOpen: false,
};

export default withStyles(MyPlaceRewardsCreditCard, styles);
