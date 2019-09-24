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
  BagHeaderRow,
  SflHeadingViewStyle,
  InActiveBagHeaderText,
  ActiveBagHeaderText,
  ActiveBagHeaderView,
  InActiveBagHeaderView,
} from '../styles/BagPage.style.native';
import BonusPointsDays from '../../../../common/organisms/BonusPointsDays';
import InitialPropsHOC from '../../../../common/hoc/InitialPropsHOC/InitialPropsHOC.native';
import BAGPAGE_CONSTANTS from '../BagPage.constants';

class BagPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeSection: null,
    };
  }

  componentDidMount() {
    const { fetchLabels, totalCount, sflItems } = this.props;
    fetchLabels();

    this.setState({
      activeSection:
        !totalCount && sflItems.size ? BAGPAGE_CONSTANTS.SFL_STATE : BAGPAGE_CONSTANTS.BAG_STATE,
    });
  }

  componentDidUpdate() {
    const { toastMessage, isCartItemSFL, labels } = this.props;
    const { sflSuccess } = labels;
    if (isCartItemSFL) {
      toastMessage(sflSuccess);
    }
  }

  handleChangeActiveSection = sectionName => {
    this.setState({
      activeSection: sectionName,
    });
  };

  renderBagHeading() {
    const { activeSection } = this.state;
    const { labels, totalCount } = this.props;
    const { bagHeading } = labels;
    const bagHeadingTexts = `${bagHeading} (${totalCount})`;
    return (
      <HeadingTextStyle>
        {activeSection === BAGPAGE_CONSTANTS.SFL_STATE ? (
          <InActiveBagHeaderText>{bagHeadingTexts}</InActiveBagHeaderText>
        ) : (
          <ActiveBagHeaderText>{bagHeadingTexts}</ActiveBagHeaderText>
        )}
      </HeadingTextStyle>
    );
  }

  renderSflHeading() {
    const { activeSection } = this.state;
    const { labels, sflItems } = this.props;
    const { savedLaterButton } = labels;
    const headingTexts = `${savedLaterButton} (${sflItems.size})`;
    return (
      <HeadingTextStyle>
        {activeSection === BAGPAGE_CONSTANTS.BAG_STATE ? (
          <InActiveBagHeaderText>{headingTexts}</InActiveBagHeaderText>
        ) : (
          <ActiveBagHeaderText>{headingTexts}</ActiveBagHeaderText>
        )}
      </HeadingTextStyle>
    );
  }

  renderOrderLedgerContainer = isNoNEmptyBag => {
    if (isNoNEmptyBag) {
      return (
        <RowSectionStyle>
          <OrderLedgerContainer />
        </RowSectionStyle>
      );
    }
    return <></>;
  };

  render() {
    const {
      labels,
      showAddTobag,
      navigation,
      handleCartCheckout,
      isUserLoggedIn,
      orderItemsCount,
      sflItems,
    } = this.props;
    const isNoNEmptyBag = orderItemsCount > 0;
    const { activeSection } = this.state;
    if (!labels.tagLine) {
      return <View />;
    }
    return (
      <>
        <ScrollViewWrapper showAddTobag={showAddTobag}>
          <BagHeaderRow>
            <HeadingViewStyle
              onPress={() => {
                this.handleChangeActiveSection(BAGPAGE_CONSTANTS.BAG_STATE);
              }}
            >
              {activeSection === BAGPAGE_CONSTANTS.BAG_STATE ? (
                <ActiveBagHeaderView>{this.renderBagHeading()}</ActiveBagHeaderView>
              ) : (
                <InActiveBagHeaderView>{this.renderBagHeading()}</InActiveBagHeaderView>
              )}
            </HeadingViewStyle>
            <SflHeadingViewStyle
              onPress={() => {
                this.handleChangeActiveSection(BAGPAGE_CONSTANTS.SFL_STATE);
              }}
            >
              {activeSection === BAGPAGE_CONSTANTS.SFL_STATE ? (
                <ActiveBagHeaderView>{this.renderSflHeading()}</ActiveBagHeaderView>
              ) : (
                <InActiveBagHeaderView>{this.renderSflHeading()}</InActiveBagHeaderView>
              )}
            </SflHeadingViewStyle>
          </BagHeaderRow>

          <MainSection>
            {activeSection === BAGPAGE_CONSTANTS.BAG_STATE && (
              <ProductTileWrapper bagLabels={labels} />
            )}
            {activeSection === BAGPAGE_CONSTANTS.SFL_STATE && (
              <ProductTileWrapper bagLabels={labels} sflItems={sflItems} isBagPageSflSection />
            )}
            {this.renderOrderLedgerContainer(isNoNEmptyBag)}
            {isUserLoggedIn && isNoNEmptyBag && (
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
            {isNoNEmptyBag && (
              <RowSectionStyle>
                <CouponAndPromos showAccordian={false} />
              </RowSectionStyle>
            )}
          </MainSection>
        </ScrollViewWrapper>

        <AddedToBagActions
          handleCartCheckout={handleCartCheckout}
          labels={labels}
          showAddTobag={showAddTobag}
          navigation={navigation}
          isNoNEmptyBag={isNoNEmptyBag}
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
  orderItemsCount: PropTypes.number.isRequired,
  sflItems: PropTypes.shape([]).isRequired,
  toastMessage: PropTypes.func.isRequired,
  isCartItemSFL: PropTypes.bool.isRequired,
};

export default InitialPropsHOC(BagPage);
