import React from 'react';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import { Image } from '@tcp/core/src/components/common/atoms';
import { getIconPath } from '@tcp/core/src/utils';

import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import styles from '../styles/MiniBagHeader.style';

// @flow

type Props = {
  labels: any,
  cartItemCount: any,
  className: string,
  userName: any,
};
const MiniBagHeader = ({ labels, cartItemCount, className, userName }: Props) => {
  const data = {
    points: 0,
    rewardsPoints: 0,
  };

  return (
    <div className={className}>
      <Row className="mainWrapper">
        <Col className="subHeaderText" colSize={{ small: 4, medium: 6, large: 9 }}>
          {!userName ? (
            <BodyCopy component="span" fontSize="fs12" textAlign="left">
              <Anchor fontSizeVariation="large" anchorVariation="primary" noLink to="">
                {labels.createAccount}
              </Anchor>
              <Anchor
                className="rightLink"
                fontSizeVariation="large"
                anchorVariation="primary"
                noLink
              >
                {labels.logIn}
              </Anchor>
            </BodyCopy>
          ) : (
            <>
              <BodyCopy component="span" fontSize="fs16" fontWeight="semibold" textAlign="left">
                {`${labels.hi} ${userName} `}
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
          <Anchor className="favIcon" fontSizeVariation="small" anchorVariation="primary" noLink>
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
              data-locator="addedtobag-bag-icon"
            />
            <BodyCopy className="cartCount" component="span" fontWeight="semibold" fontSize="fs10">
              {cartItemCount || 0}
            </BodyCopy>
          </Anchor>
        </Col>
      </Row>
    </div>
  );
};
export default withStyles(MiniBagHeader, styles);
