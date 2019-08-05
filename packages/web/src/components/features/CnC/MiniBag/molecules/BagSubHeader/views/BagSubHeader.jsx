import React from 'react';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';

import BagSubHeaderStyle from '../styles/BagSubHeader.style';

const ProductTile = () => {
  const data = {
    isLoggedIn: true,
    qty: 5,
    savedforLaterQty: 1,
  };
  const labels = {
    viewBagLabel: 'View Bag',
    saveForLaterLabel: 'View Saved for Later',
  };
  return (
    <BagSubHeaderStyle>
      <Row className="mainWrapper">
        <Col className="subHeaderText" colSize={{ small: 6, medium: 8, large: 12 }}>
          {data.isLoggedIn === true ? (
            <BodyCopy component="span" fontSize="fs12" textAlign="left">
              <Anchor
                fontSizeVariation="small"
                underline
                anchorVariation="primary"
                noLink
                to=""
                data-locator="addressbook-makedefault"
              >
                {`${labels.viewBagLabel}(${data.qty})`}
              </Anchor>
              {` `}
              <Anchor
                fontSizeVariation="small"
                underline
                anchorVariation="primary"
                noLink
                data-locator="addressbook-makedefault"
              >
                {`${labels.saveForLaterLabel}(${data.savedforLaterQty})`}
              </Anchor>
            </BodyCopy>
          ) : (
            <BodyCopy component="span" fontSize="fs12" textAlign="left">
              <Anchor
                fontSizeVariation="small"
                underline
                anchorVariation="primary"
                noLink
                to=""
                data-locator="addressbook-makedefault"
              >
                {`${labels.viewBagLabel}(${data.qty})`}
              </Anchor>
            </BodyCopy>
          )}
        </Col>
      </Row>
    </BagSubHeaderStyle>
  );
};

export default ProductTile;
