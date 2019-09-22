import React from 'react';
import PropTypes from 'prop-types';
import { Anchor, RichText, Button, Col, Row } from '../../../../../common/atoms';
import ExistingPLCCUserStyle from './styles/ExistingPLCCUser.view.style';
import { getLabelValue } from '../../../../../../utils';

/**
 * @const ExistingPLCCUserView
 *
 * @param - labels
 * @param - existingCustomerDetails - existing user information details.
 * @description - showcases user already holds a plcc card.
 */

const ExistingPLCCUserView = ({ bagItems, existingCustomerDetails, labels, isPLCCModalFlow }) => {
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
            <Anchor asPath="/bag">
              <Button
                buttonVariation="fixed-width"
                fill="BLUE"
                type="submit"
                className="existing_checkout_button"
              >
                {getLabelValue(labels, 'lbl_PLCCForm_ctcButton')}
              </Button>
            </Anchor>
          </Col>
        </Row>
      ) : null}
      <Row fullBleed className="submit_buttons_set">
        <Col
          ignoreGutter={{ small: true }}
          colSize={{ large: 3, medium: 4, small: 12 }}
          className="existing_continue_button"
        >
          <Anchor asPath="/home">
            <Button
              buttonVariation="fixed-width"
              fill={!bagItems ? 'BLUE' : 'WHITE'}
              type="submit"
              className="existing_continue_button"
            >
              {getLabelValue(labels, 'lbl_PLCCForm_continueShopping')}
            </Button>
          </Anchor>
        </Col>
      </Row>
    </ExistingPLCCUserStyle>
  );
};

ExistingPLCCUserView.propTypes = {
  labels: PropTypes.shape({}).isRequired,
  existingCustomerDetails: PropTypes.string.isRequired,
  isPLCCModalFlow: PropTypes.bool.isRequired,
  bagItems: PropTypes.number.isRequired,
};

export default ExistingPLCCUserView;
