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
  SuccessTickImage,
  SuccessMessageContainer,
} from '../styles/BagPage.style.native';
import BonusPointsDays from '../../../../common/organisms/BonusPointsDays';
import InitialPropsHOC from '../../../../common/hoc/InitialPropsHOC/InitialPropsHOC.native';
import BAGPAGE_CONSTANTS from '../BagPage.constants';
import BodyCopy from '../../../../common/atoms/BodyCopy';

const tickIcon = require('../../../../../assets/circle-check-fill.png');

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
    const { toastMessage, isCartItemSFL, labels, isSflItemRemoved } = this.props;
    const { sflSuccess, sflDeleteSuccess } = labels;
    if (isCartItemSFL) {
      toastMessage(sflSuccess);
    } else if (isSflItemRemoved) {
      toastMessage(sflDeleteSuccess);
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

  /**
   *@function //responsible for rendering of success message with tick icon
   * @memberof BagPage
   */
  renderSuccessMessage = () => {
    const {
      isCartItemsUpdating: { isDeleting },
      labels,
    } = this.props;
    return (
      isDeleting && (
        <SuccessMessageContainer>
          <SuccessTickImage source={tickIcon} />
          <BodyCopy
            component="span"
            fontSize="fs12"
            mobilefontFamily={['secondary']}
            fontWeight="extrabold"
            text={labels.itemDeleted}
          />
        </SuccessMessageContainer>
      )
    );
  };

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
    const { labels, showAddTobag, navigation, orderItemsCount } = this.props;
    const { handleCartCheckout, isUserLoggedIn, sflItems } = this.props;
    const isNoNEmptyBag = orderItemsCount > 0;
    const { activeSection } = this.state;
    if (!labels.tagLine) {
      return <View />;
    }
    const isBagStage = activeSection === BAGPAGE_CONSTANTS.BAG_STATE;
    const isSFLStage = activeSection === BAGPAGE_CONSTANTS.SFL_STATE;
    return (
      <>
        <ScrollViewWrapper showAddTobag={showAddTobag}>
          <BagHeaderRow>
            <HeadingViewStyle
              onPress={() => {
                this.handleChangeActiveSection(BAGPAGE_CONSTANTS.BAG_STATE);
              }}
            >
              {isBagStage ? (
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
              {isSFLStage ? (
                <ActiveBagHeaderView>{this.renderSflHeading()}</ActiveBagHeaderView>
              ) : (
                <InActiveBagHeaderView>{this.renderSflHeading()}</InActiveBagHeaderView>
              )}
            </SflHeadingViewStyle>
          </BagHeaderRow>
          {this.renderSuccessMessage()}
          <MainSection>
            {isBagStage && <ProductTileWrapper bagLabels={labels} />}
            {isSFLStage && (
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
  isCartItemsUpdating: PropTypes.shape({ isDeleting: PropTypes.bool.isRequired }).isRequired,
  fetchLabels: PropTypes.func.isRequired,
  orderItemsCount: PropTypes.number.isRequired,
  sflItems: PropTypes.shape([]).isRequired,
  toastMessage: PropTypes.func.isRequired,
  isCartItemSFL: PropTypes.bool.isRequired,
  isSflItemRemoved: PropTypes.bool.isRequired,
};

export default InitialPropsHOC(BagPage);
