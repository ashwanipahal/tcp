import React from 'react';
import PropTypes from 'prop-types';
import { RichText, Button, Col, Row } from '../../../../../../common/atoms';
import ExistingPLCCUserStyle from './style/ExistingPLCCUser.view.style';
import { getLabelValue } from '../../../../../../../utils';
import { redirectToBag, redirectToHome } from '../../../utils/utility';
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
}) => {
  const bagItems = getCartItemCount();
  return (
    <ExistingPLCCUserStyle isPLCCModalFlow={isPLCCModalFlow}>
      <div className="header-image" />
      <RichText richTextHtml={existingCustomerDetails} className="existing_account_info" />
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
              {getLabelValue(labels, 'lbl_PLCCForm_ctcButton')}
            </Button>
          </Col>
        </Row>
      ) : null}
      <Row fullBleed className="submit_buttons_set">
        <Col
          ignoreGutter={{ small: true }}
          colSize={{ large: 3, medium: 4, small: 12 }}
          className="existing_continue_button"
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
    </ExistingPLCCUserStyle>
  );
};

ExistingPLCCUserView.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  existingCustomerDetails: PropTypes.string.isRequired,
  isPLCCModalFlow: PropTypes.bool.isRequired,
  resetPLCCResponse: PropTypes.func.isRequired,
};

export default ExistingPLCCUserView;
