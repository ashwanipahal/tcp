import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { getLabelValue, getLocator } from '@tcp/core/src/utils/utils';
import ClickTracker from '@tcp/web/src/components/common/atoms/ClickTracker';
import FormPageHeading from '../../common/molecule/FormPageHeading';
import { BodyCopy, Button, Anchor, Row, Col } from '../../../../common/atoms';
import styles from '../styles/MyPlaceRewardsCreditCard.style';
import withStyles from '../../../../common/hoc/withStyles';
import ApplyNowPLCCModal from '../../../../common/molecules/ApplyNowPLCCModal';
import { openWindow } from '../../../../../utils/utils.web';

export class MyPlaceRewardsCreditCard extends PureComponent {
  openManageCreditCardLink = e => {
    e.preventDefault();
    const { labels } = this.props;
    openWindow(getLabelValue(labels, 'lbl_PLCCModal_applyAcceptOfferLink'), '_blank', 'noopener');
  };

  render() {
    const { labels, className, isPLCCModalOpen, openPLCCModal } = this.props;
    return (
      <div className={className}>
        <FormPageHeading
          heading={getLabelValue(labels, 'lbl_PLCCForm_rewardsCardHeading')}
          data-locator="mprcc-header"
        />
        <Row fullBleed>
          <Col
            colSize={{
              small: 6,
              medium: 8,
              large: 8,
            }}
            offsetLeft={{
              large: 2,
            }}
          >
            <div>
              <BodyCopy
                fontFamily="primary"
                fontSize="fs36"
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

              <div className="header-image" data-locator="mprcc-tcpgymimage" />

              <BodyCopy
                component="div"
                color="gray.900"
                fontFamily="secondary"
                fontSize="fs18"
                textAlign="center"
                className="apply-now-subtext"
                data-locator={getLocator('ship_to_text_2')}
              >
                {getLabelValue(labels, 'lbl_PLCCModal_applyNowSubText')}
              </BodyCopy>
              <BodyCopy component="div" className="button_wrapper elem-mt-XL elem-mb-XL">
                <ClickTracker
                  clickData={{
                    eventName: 'loyaltyclick',
                    pageType: 'myplace',
                    pageSection: 'myplace',
                    pageSubSection: 'myplace',
                    pageName: 'myplace:rewardscreditcard',
                    customEvents: ['event112'],
                  }}
                >
                  <Button
                    buttonVariation="fixed-width"
                    fill="BLUE"
                    type="submit"
                    fontSize="fs14"
                    onClick={openPLCCModal}
                    fontWeight="semibold"
                    data-locator="mprcc-applyCTA"
                  >
                    {getLabelValue(labels, 'lbl_PLCCModal_applyNowCTA')}
                  </Button>
                </ClickTracker>

                <ClickTracker
                  clickData={{
                    eventName: 'loyaltyclick',
                    pageName: 'myplace:rewardscreditcard',
                    pageType: 'myplace',
                    pageSection: 'myplace',
                    pageSubSection: 'myplace',
                    customEvents: ['event113'],
                  }}
                >
                  <Button
                    buttonVariation="fixed-width"
                    fill="WHITE"
                    type="submit"
                    fontSize="fs14"
                    className="elem-mt-MED"
                    onClick={this.openManageCreditCardLink}
                    fontWeight="semibold"
                    data-locator="mprcc-managecreditcardCTA"
                  >
                    {getLabelValue(labels, 'lbl_PLCCForm_manageCreditCardAccount')}
                  </Button>
                </ClickTracker>
              </BodyCopy>
              <BodyCopy
                fontFamily="primary"
                fontSize="fs32"
                fontWeight="black"
                textAlign="center"
                color="text.secondary"
                className="benefits-text"
              >
                {getLabelValue(labels, 'lbl_PLCCModal_benefitsText')}
              </BodyCopy>
              <BodyCopy
                component="div"
                color="gray.900"
                fontFamily="secondary"
                fontSize="fs18"
                textAlign="center"
                data-locator={getLocator('ship_to_text_2')}
                className="withMyPlaceRewardText elem-mt-XS"
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
                className="elem-ml-SM"
                url={getLabelValue(labels, 'lbl_PLCCModal_detailsLink')}
                target="_blank"
                fontSizeVariation="large"
                anchorVariation="primary"
                underline
                data-locator="mprcc-detailslnk"
              >
                {getLabelValue(labels, 'lbl_PLCCForm_details')}
              </Anchor>
              <Anchor
                className="elem-ml-XL"
                url={getLabelValue(labels, 'lbl_PLCCModal_faqLink')}
                target="_blank"
                data-locator="mprcc-FAQlnk"
                fontSizeVariation="large"
                anchorVariation="primary"
                underline
              >
                {getLabelValue(labels, 'lbl_PLCCModal_faqText')}
              </Anchor>
              <Anchor
                className="elem-ml-XL"
                url={getLabelValue(labels, 'lbl_PLCCModal_rewardsProgramLink')}
                target="_blank"
                data-locator="mprcc-rewardteemlnk"
                fontSizeVariation="large"
                anchorVariation="primary"
                underline
              >
                {getLabelValue(labels, 'lbl_PLCCModal_rewardsProgramText')}
              </Anchor>
            </div>
            {isPLCCModalOpen && <ApplyNowPLCCModal isPLCCModalOpen={isPLCCModalOpen} />}
          </Col>
        </Row>
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
