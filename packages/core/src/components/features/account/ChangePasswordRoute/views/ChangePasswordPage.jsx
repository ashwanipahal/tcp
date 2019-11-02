import React from 'react';
import PropTypes from 'prop-types';
import { getLabelValue } from '@tcp/core/src/utils/utils';
import { Anchor, BodyCopy, Row, Col } from '../../../../common/atoms';
import internalEndpoints from '../../common/internalEndpoints';

export const ChangePasswordPage = ({ labels }) => {
  return (
    <React.Fragment>
      <Row>
        <div className="elem-pb-XXXL">
          <BodyCopy
            fontSize="fs28"
            fontWeight="extrabold"
            fontFamily="secondary"
            className="product-name"
          >
            {getLabelValue(labels, 'lbl_changePassword_helpText', 'common')}
          </BodyCopy>
        </div>
      </Row>
      <Row>
        <Col colSize={{ small: 0, medium: 2, large: 4 }}>{}</Col>
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
            {getLabelValue(labels, 'lbl_changePassword_shopNow', 'common')}
          </Anchor>
        </Col>
      </Row>
    </React.Fragment>
  );
};

ChangePasswordPage.propTypes = {
  labels: PropTypes.shape({}).isRequired,
};

export default ChangePasswordPage;
