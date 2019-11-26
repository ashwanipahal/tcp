import React from 'react';
import PropTypes from 'prop-types';
import ClickTracker from '@tcp/web/src/components/common/atoms/ClickTracker';
import { RichText, Button, Col, Row } from '../../../../../../common/atoms';
import ExistingPLCCUserStyle from './style/ExistingPLCCUser.view.style';
import { getLabelValue } from '../../../../../../../utils';
import { redirectToBag, redirectToHome, getFooterButtonSize } from '../../../utils/utility';
import { getCartItemCount } from '../../../../../../../utils/cookie.util';

/**
 * @const ExistingPLCCUserView
 *
 * @param - labels
 * @param - existingCustomerDetails - existing user information details.
 * @description - showcases user already holds a plcc card.
 */

const ExistingPLCCUserView = ({
  existingCustomerDetails,
  labels,
  isPLCCModalFlow,
  resetPLCCResponse,
  isRtpsFlow,
  togglePLCCModal,
  closePLCCModal,
}) => {
  const bagItems = getCartItemCount();
  const pageAnalyticsData = 'checkout';
  return (
    <ExistingPLCCUserStyle isPLCCModalFlow={isPLCCModalFlow}>
      <div className="header-image" />
      <RichText richTextHtml={existingCustomerDetails} className="existing_account_info" />
      {bagItems ? (
        <Row fullBleed className="submit_plcc_form">
          <Col
            ignoreGutter={{ small: true }}
            colSize={{ large: getFooterButtonSize(isPLCCModalFlow), medium: 4, small: 12 }}
            className="existing_checkout_button"
          >
            <Button
              buttonVariation="fixed-width"
              fill="BLUE"
              type="submit"
              className="existing_checkout_button"
              onClick={() =>
                isRtpsFlow
                  ? togglePLCCModal({ isPLCCModalOpen: false, status: null })
                  : redirectToBag(resetPLCCResponse)
              }
            >
              {getLabelValue(labels, 'lbl_PLCCForm_ctcButton')}
            </Button>
          </Col>
        </Row>
      ) : null}
      {!isRtpsFlow && (
        <Row fullBleed className="submit_buttons_set">
          <Col
            ignoreGutter={{ small: true }}
            colSize={{ large: getFooterButtonSize(isPLCCModalFlow), medium: 4, small: 12 }}
            className="existing_continue_button"
          >
            <Button
              onClick={() => redirectToHome(isPLCCModalFlow, closePLCCModal, resetPLCCResponse)}
              buttonVariation="fixed-width"
              type="submit"
              fill={!bagItems ? 'BLUE' : 'WHITE'}
              centered
              className="existing_continue_button"
            >
              <ClickTracker
                clickData={{
                  pageType: pageAnalyticsData,
                  pageSection: pageAnalyticsData,
                  pageSubSection: pageAnalyticsData,
                  customEvents: ['scCheckout,event86,event69,event114'],
                  pageName: 'checkout:pickup',
                  pageNavigationText: 'header-cart',
                  eVar65: 'checkout:pickup',
                }}
              >
                {getLabelValue(labels, 'lbl_PLCCForm_continueShopping')}
              </ClickTracker>
            </Button>
          </Col>
        </Row>
      )}
    </ExistingPLCCUserStyle>
  );
};

ExistingPLCCUserView.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  existingCustomerDetails: PropTypes.string.isRequired,
  isPLCCModalFlow: PropTypes.bool.isRequired,
  resetPLCCResponse: PropTypes.func.isRequired,
  isRtpsFlow: PropTypes.bool.isRequired,
  togglePLCCModal: PropTypes.func.isRequired,
  closePLCCModal: PropTypes.func.isRequired,
};

export default ExistingPLCCUserView;
