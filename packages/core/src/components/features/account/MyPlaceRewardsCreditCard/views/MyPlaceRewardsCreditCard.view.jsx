import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { getLabelValue, getIconPath, getLocator } from '@tcp/core/src/utils/utils';
import FormPageHeading from '../../common/molecule/FormPageHeading';
import { Row, Col, BodyCopy, Image, Button, Anchor, RichText } from '../../../../common/atoms';
import styles from '../styles/MyPlaceRewardsCreditCard.style';
import ApplyNowModalWrapper from '../../../../common/molecules/ApplyNowPLCCModal';
import withStyles from '../../../../common/hoc/withStyles';

export class MyPlaceRewardsCreditCard extends PureComponent {

  render() {
    const { labels, className } = this.props;
    return (
      <div className={className}>
        <FormPageHeading
          className="elem-mb-XL myAccountRightView"
          heading={getLabelValue(labels, 'lbl_PLCCForm_rewardsCardHeading')}
          data-locator=""
        />

        <div className="Modal__Content__Wrapper">
          <Row fullBleed>
            <Col
              ignoreGutter={{ small: true }}
              colSize={{ large: 12, medium: 8, small: 6 }}
            >
              <BodyCopy
                fontFamily="primary"
                fontSize="fs48"
                fontWeight="black"
                textAlign="center"
                className="elem-mt-XL"
              >
                {getLabelValue(labels, 'lbl_PLCCModal_applyNowHeaderText')}
              </BodyCopy>
              <div className="header-image" />
            </Col>
          </Row>
          <Row fullBleed>
            <Col
              ignoreGutter={{ small: true }}
              colSize={{ large: 12, medium: 8, small: 6 }}
            >
              <BodyCopy
                component="div"
                color="gray.900"
                fontFamily="secondary"
                fontSize="fs22"
                textAlign="center"
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
                // onClick={openPLCCModal}
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
                className="ApplyNow__link"
                // onClick={openPLCCModal}
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
            className="elem-mt-XL"
          >
            {getLabelValue(labels, 'lbl_PLCCModal_benefitsText')}
          </BodyCopy>
          <Row fullBleed>
            <Col
              ignoreGutter={{ small: true }}
              colSize={{ large: 12, medium: 8, small: 6 }}
            >
              <BodyCopy
                component="div"
                color="gray.900"
                fontFamily="secondary"
                fontSize="fs22"
                textAlign="center"
                data-locator={getLocator('ship_to_text_2')}
                className="elem-mt-XS elem-mb-LRG"
              >
                {getLabelValue(labels, 'lbl_PLCCForm_withMyPlaceRewardsCard')}
              </BodyCopy>
            </Col>
          </Row>
          <div
            className="offer_info_icon"
            data-locator="plcc_modal_logo"
            offerType={getLabelValue(labels, 'lbl_PLCCModal_oneEqualsTwoPoints')}
          />
        </div>
        <ApplyNowModalWrapper />
      </div>
    );
  }
}

MyPlaceRewardsCreditCard.propTypes = {
  labels: PropTypes.shape({}),
  className: PropTypes.string.isRequired,
}

MyPlaceRewardsCreditCard.defaultProps = {
  labels: {}
}

export default withStyles(MyPlaceRewardsCreditCard, styles);
