import React from 'react';
import PropTypes from 'prop-types';
import OrderLedgerContainer from '@tcp/core/src/components/features/CnC/common/organism/OrderLedger';
// import ProductTileWrapper from '../../CartItemTile/organisms/ProductTileWrapper/container/ProductTileWrapper.container';
import CouponAndPromos from '../../common/organism/CouponAndPromos';
import AddedToBagActions from '../../AddedToBagActions';
import {
  HeadingViewStyle,
  MainSection,
  RowSectionStyle,
  HeadingTextStyle,
  ScrollViewWrapper,
  BonusPointsWrapper,
} from '../styles/BagPage.style.native';
import BonusPointsDays from '../../../../common/organisms/BonusPointsDays';

const BagPage = ({ labels, totalCount, showAddTobag, navigation, isUserLoggedIn }) => {
  return (
    <>
      <ScrollViewWrapper showAddTobag={showAddTobag}>
        <HeadingViewStyle>
          <HeadingTextStyle>{`${labels.bagHeading} (${totalCount})`}</HeadingTextStyle>
        </HeadingViewStyle>
        <MainSection>
          {/* <ProductTileWrapper bagLabels={labels} /> */}
          <RowSectionStyle>
            <OrderLedgerContainer />
          </RowSectionStyle>
          {isUserLoggedIn && (
            <RowSectionStyle>
              <BonusPointsWrapper>
                <BonusPointsDays />
              </BonusPointsWrapper>
            </RowSectionStyle>
          )}
          <RowSectionStyle>
            <CouponAndPromos />
          </RowSectionStyle>
        </MainSection>
      </ScrollViewWrapper>
      <AddedToBagActions labels={labels} showAddTobag={showAddTobag} navigation={navigation} />
    </>
  );
};

BagPage.propTypes = {
  labels: PropTypes.shape.isRequired,
  totalCount: PropTypes.number.isRequired,
  showAddTobag: PropTypes.bool.isRequired,
  navigation: PropTypes.shape({}).isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
};

export default BagPage;
