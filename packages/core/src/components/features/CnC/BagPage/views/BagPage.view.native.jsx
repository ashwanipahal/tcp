import React from 'react';
import PropTypes from 'prop-types';
import OrderLedgerContainer from '@tcp/core/src/components/features/CnC/common/organism/OrderLedger';
import { Button } from '@tcp/core/src/components/common/atoms';
import ProductTileWrapper from '../../CartItemTile/organisms/ProductTileWrapper/container/ProductTileWrapper.container';
import CouponAndPromos from '../../common/organism/CouponAndPromos';
import AirmilesBanner from '../../common/organism/AirmilesBanner';

import AddedToBagActions from '../../AddedToBagActions';
import {
  HeadingViewStyle,
  MainSection,
  RowSectionStyle,
  HeadingTextStyle,
  ScrollViewWrapper,
} from '../styles/BagPage.style.native';

const BagPage = ({ labels, totalCount, showAddTobag, navigation, handleCartCheckout }) => {
  return (
    <>
      <ScrollViewWrapper showAddTobag={showAddTobag}>
        <HeadingViewStyle>
          <HeadingTextStyle>{`${labels.bagHeading} (${totalCount})`}</HeadingTextStyle>
        </HeadingViewStyle>
        <MainSection>
          <ProductTileWrapper bagLabels={labels} />
          <RowSectionStyle>
            <OrderLedgerContainer />
          </RowSectionStyle>
          <RowSectionStyle>
            <AirmilesBanner />
          </RowSectionStyle>
          <RowSectionStyle>
            <CouponAndPromos />
          </RowSectionStyle>
          <Button
            fullWidth
            buttonVariation="variable-width"
            text="Pickup"
            onPress={() =>
              navigation.navigate('Checkout', {
                nextToRoot: 'pickupPage',
              })
            }
          />
        </MainSection>
      </ScrollViewWrapper>

      <AddedToBagActions
        handleCartCheckout={handleCartCheckout}
        labels={labels}
        showAddTobag={showAddTobag}
        navigation={navigation}
      />
    </>
  );
};

BagPage.propTypes = {
  labels: PropTypes.shape.isRequired,
  totalCount: PropTypes.number.isRequired,
  showAddTobag: PropTypes.bool.isRequired,
  navigation: PropTypes.shape({}).isRequired,
  handleCartCheckout: PropTypes.func.isRequired,
};

export default BagPage;
