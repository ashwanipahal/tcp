import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import OrderLedgerContainer from '@tcp/core/src/components/features/CnC/common/organism/OrderLedger';
import { isCanada } from '@tcp/core/src/utils';
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
  BonusPointsWrapper,
} from '../styles/BagPage.style.native';
import BonusPointsDays from '../../../../common/organisms/BonusPointsDays';
import InitialPropsHOC from '../../../../common/hoc/InitialPropsHOC/InitialPropsHOC.native';

class BagPage extends React.Component {
  componentDidMount() {
    const { fetchLabels } = this.props;
    fetchLabels();
  }

  render() {
    const {
      labels,
      totalCount,
      showAddTobag,
      navigation,
      handleCartCheckout,
      isUserLoggedIn,
    } = this.props;

    if (!labels.tagLine) {
      return <View />;
    }
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
            {isUserLoggedIn && (
              <RowSectionStyle>
                <BonusPointsWrapper>
                  <BonusPointsDays isBagPage showAccordian={false} />
                </BonusPointsWrapper>
              </RowSectionStyle>
            )}
            {isCanada() && (
              <RowSectionStyle>
                <AirmilesBanner />
              </RowSectionStyle>
            )}
            <RowSectionStyle>
              <CouponAndPromos />
            </RowSectionStyle>
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
  }
}

BagPage.propTypes = {
  labels: PropTypes.shape.isRequired,
  totalCount: PropTypes.number.isRequired,
  showAddTobag: PropTypes.bool.isRequired,
  navigation: PropTypes.shape({}).isRequired,
  isUserLoggedIn: PropTypes.bool.isRequired,
  handleCartCheckout: PropTypes.func.isRequired,
  fetchLabels: PropTypes.func.isRequired,
};

export default InitialPropsHOC(BagPage);
