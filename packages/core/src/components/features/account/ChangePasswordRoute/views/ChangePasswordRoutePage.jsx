import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import { Anchor, Row, Col } from '../../../../common/atoms';
import internalEndpoints from '../../common/internalEndpoints';

export const ChangePasswordRoutePage = ({ labels }) => {
  return (
    <React.Fragment>
      <Row>
        <div className="elem-pb-XXXL">
          {getLabelValue(labels, 'lbl_changePassword_helpText', 'account-common')}
        </div>
      </Row>
      <Row>
        <Col colSize={{ small: 0, medium: 2, large: 4 }}>{labels}</Col>
        <Col colSize={{ small: 6, medium: 4, large: 4 }}>
          <Anchor
            to={internalEndpoints.shopNowPage.link}
            asPath={internalEndpoints.shopNowPage.path}
            anchorVariation="button"
            buttonVariation="fixed-width"
            fill="BLACK"
            centered
            target="_blank"
          >
            {getLabelValue(labels, 'lbl_orders_shopNow', 'orders')}
          </Anchor>
        </Col>
      </Row>
    </React.Fragment>
  );
};

ChangePasswordRoutePage.propTypes = {
  labels: PropTypes.shape({}).isRequired,
};

export default ChangePasswordRoutePage;
