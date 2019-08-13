import React from 'react';
import PropTypes from 'prop-types';
import OrderLedgerContainer from '@tcp/core/src/components/features/CnC/BagPage/organisms/OrderLedger';
import ProductTileWrapper from '../../CartItemTile/organisms/ProductTileWrapper/container/ProductTileWrapper.container';
import CouponAndPromos from '../../common/organism/CouponAndPromos';
import {
  WrapperStyle,
  HeadingViewStyle,
  MainSection,
  RowSectionStyle,
  HeadingTextStyle,
} from '../styles/BagPage.style.native';

const BagPage = ({ labels, totalCount }) => {
  return (
    <WrapperStyle>
      <HeadingViewStyle>
        <HeadingTextStyle>{`${labels.bagHeading} (${totalCount})`}</HeadingTextStyle>
      </HeadingViewStyle>
      <MainSection>
        <ProductTileWrapper bagLabels={labels} />
        <RowSectionStyle>
          <OrderLedgerContainer />
        </RowSectionStyle>
        <RowSectionStyle>
          <CouponAndPromos />
        </RowSectionStyle>
      </MainSection>
    </WrapperStyle>
  );
};

BagPage.propTypes = {
  labels: PropTypes.shape.isRequired,
  totalCount: PropTypes.number.isRequired,
};

export default BagPage;
