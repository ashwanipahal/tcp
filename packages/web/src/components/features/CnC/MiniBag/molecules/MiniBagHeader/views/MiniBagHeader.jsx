import React from 'react';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import { Image } from '@tcp/core/src/components/common/atoms';
import { getIconPath } from '@tcp/core/src/utils';

import MiniBagHeaderStyle from '../styles/MiniBagHeader.style';

const ProductTile = () => {
  const data = {
    isLoggedIn: true,
    userName: 'Christine',
    points: 50,
    rewardsPoints: 0,
  };
  const labels = {
    createAccountLabel: 'Create Account',
    logInLabel: 'Log In',
    points: 'Points',
    inRewards: 'in Rewards',
  };
  return (
    <MiniBagHeaderStyle>
      <Row className="mainWrapper">
        <Col className="subHeaderText" colSize={{ small: 4, medium: 6, large: 9 }}>
          {data.isLoggedIn === false ? (
            <BodyCopy component="span" fontSize="fs12" textAlign="left">
              <Anchor fontSizeVariation="small" anchorVariation="primary" noLink to="">
                {labels.createAccountLabel}
              </Anchor>
              {` | `}
              <Anchor fontSizeVariation="small" anchorVariation="primary" noLink>
                {labels.logInLabel}
              </Anchor>
            </BodyCopy>
          ) : (
            <>
              <BodyCopy component="span" fontSize="fs16" fontWeight="semibold" textAlign="left">
                {`Hi ${data.userName} `}
              </BodyCopy>
              <BodyCopy
                className="pointsRewards"
                component="span"
                fontSize="fs14"
                fontWeight="semibold"
                textAlign="left"
              >
                {`(${data.points} ${labels.points}, $${data.rewardsPoints} ${labels.inRewards} )`}
              </BodyCopy>
            </>
          )}
        </Col>
        <Col className="subHeaderText" colSize={{ small: 2, medium: 2, large: 3 }}>
          <Anchor fontSizeVariation="small" anchorVariation="primary" noLink>
            <Image
              alt="Product"
              className="product-image"
              src={getIconPath('fav-icon')}
              data-locator="addedtobag-fav-icon"
            />
          </Anchor>
          {'  '}
          <Anchor fontSizeVariation="small" anchorVariation="primary" noLink>
            <Image
              alt="Product"
              className="product-image"
              src={getIconPath('cart-icon')}
              data-locator="addedtobag-bag0-icon"
            />
          </Anchor>
          <BodyCopy component="span" fontSize="fs12" textAlign="left" text="2" />
        </Col>
      </Row>
    </MiniBagHeaderStyle>
  );
};

export default ProductTile;
