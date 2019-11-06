import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import PromotionalMessage from '@tcp/core/src/components/common/atoms/PromotionalMessage';
import CustomIcon from '@tcp/core/src/components/common/atoms/Icon';
import {
  ICON_NAME,
  ICON_FONT_CLASS,
} from '@tcp/core/src/components/common//atoms/Icon/Icon.constants';
import withStyles from '../../../../../../common/hoc/withStyles.native';
import {
  Container,
  RowContainer,
  BazarVoiceContainer,
  ReviewAndRatingContainer,
  styles,
  EmptyView,
} from '../styles/ProductSummary.style.native';
import LineComp from '../../../../../../common/atoms/Line';
import Anchor from '../../../../../../common/atoms/Anchor';
import { getMapSliceForColorProductId } from '../../../../ProductListing/molecules/ProductList/utils/productsCommonUtils';
import { getPromotionalMessage } from '../../../../ProductListing/molecules/ProductList/utils/utility';

class ProductSummary extends React.PureComponent {
  constructor(props) {
    super(props);
    this.loyaltyPromotionMessage = '';
  }

  onCompleteLook = () => {};

  onWriteReview = () => {};

  renderWriteAReviewAnchor = anchorLabel => {
    const { isBundleProduct } = this.props;
    if (isBundleProduct) {
      return (
        <Anchor
          fontSizeVariation="medium"
          anchorVariation="custom"
          colorName="gray.900"
          underline
          href="#"
          locator="pdp_lbl_write_review"
          className="details-link"
          onPress={this.onCompleteLook}
          text={anchorLabel}
        />
      );
    }
    return <EmptyView width="30%" />;
  };

  renderCompleteTheLookAnchor = anchorLabel => {
    const { isBundleProduct, showCompleteTheLook } = this.props;
    if (showCompleteTheLook && !isBundleProduct) {
      return (
        <Anchor
          fontSizeVariation="medium"
          anchorVariation="custom"
          colorName="gray.900"
          underline
          href="#"
          locator="pdp_anchor_complete_the_look"
          className="details-link"
          onPress={this.onCompleteLook}
          text={anchorLabel}
        />
      );
    }
    return <EmptyView width="30%" />;
  };

  /**
   * @description - This method render star rating icons
   */
  renderStarRating = () => {
    const arr = [1, 2, 3, 4, 5];
    return arr.map((item, index) => {
      const margins = index === 0 ? '0 0 0 0' : '0 0 0 4px';
      return (
        <CustomIcon
          margins={margins}
          iconFontName={ICON_FONT_CLASS.Icomoon}
          name={ICON_NAME.starFilled}
          size="fs14"
          color="gray.500"
        />
      );
    });
  };

  renderBazaarVoiceComponent = () => {
    const { isGiftCard, pdpLabels } = this.props;
    const { completeTheLook, writeAReview } = pdpLabels;
    if (!isGiftCard) {
      return (
        <BazarVoiceContainer>
          <ReviewAndRatingContainer>
            {this.renderStarRating()}
            <BodyCopy
              margin="0 0 0 12px"
              dataLocator="pdp_write_review_icon"
              mobileFontFamily="secondary"
              fontSize="fs12"
              fontWeight="regular"
              color="gray.900"
              text="(0)"
            />
          </ReviewAndRatingContainer>
          {this.renderWriteAReviewAnchor(writeAReview)}
          {this.renderCompleteTheLookAnchor(completeTheLook && completeTheLook.toLowerCase())}
        </BazarVoiceContainer>
      );
    }
    return null;
  };

  renderPromotionalMessage = () => {
    const { productData, isPlcc } = this.props;
    const { promotionalMessage, promotionalPLCCMessage } = productData;
    this.loyaltyPromotionMessage = getPromotionalMessage(isPlcc, {
      promotionalMessage,
      promotionalPLCCMessage,
    });
    if (this.loyaltyPromotionMessage !== '') {
      return (
        <PromotionalMessage
          fontSize="fs12"
          text={this.loyaltyPromotionMessage}
          isPlcc={isPlcc}
          marginTop={8}
          dataLocator="pdp_loyalty_text"
        />
      );
    }
    return null;
  };

  renderTopBadge = badge1Value => {
    if (badge1Value !== '') {
      return (
        <BodyCopy
          dataLocator="pdp_product_badges"
          margin="16px 0 0 0"
          mobileFontFamily="secondary"
          fontSize="fs10"
          fontWeight="regular"
          color="gray.900"
          text={badge1Value}
        />
      );
    }
    return null;
  };

  renderOfferPrice = () => {
    const { productData } = this.props;
    const { highOfferPrice, offerPrice } = productData;
    const offerPriceValue = this.calculatePriceValue(offerPrice);
    const highOfferPriceValue = this.calculatePriceValue(highOfferPrice, null);
    return (
      <BodyCopy
        margin="4px 0 0 0"
        dataLocator="pdp_current_product_price"
        mobileFontFamily="secondary"
        fontSize="fs22"
        fontWeight="black"
        color="red.600"
        text={highOfferPriceValue ? `${offerPriceValue} - ${highOfferPriceValue}` : offerPriceValue}
      />
    );
  };

  renderPricePercentageDiscountLabel = value => {
    if (value) {
      return (
        <BodyCopy
          dataLocator="pdp_discounted_percentage"
          margin="0 0 0 10px"
          mobileFontFamily="secondary"
          fontSize="fs14"
          fontWeight="regular"
          color="red.600"
          text={value}
        />
      );
    }
    return null;
  };

  renderListPriceDash = value => {
    if (value) {
      return (
        <BodyCopy
          dataLocator="pdp_discounted_product_price"
          mobileFontFamily="secondary"
          fontSize="fs14"
          fontWeight="regular"
          color="gray.800"
          text=" - "
        />
      );
    }
    return null;
  };

  renderListPriceLabels = value => {
    if (value) {
      return (
        <BodyCopy
          dataLocator="pdp_discounted_product_price"
          textDecoration="line-through"
          mobileFontFamily="secondary"
          fontSize="fs14"
          fontWeight="regular"
          color="gray.800"
          text={value}
        />
      );
    }
    return null;
  };

  calculatePriceValue = (price, defaultReturn = 0) => {
    let priceValue = defaultReturn;
    const { currencySymbol, currencyExchange } = this.props;
    const currency = currencySymbol === 'USD' ? '$' : currencySymbol;
    if (price && price > 0) {
      priceValue = `${currency}${(price * currencyExchange).toFixed(2)}`;
    }
    return priceValue;
  };

  renderListPrice = badge2 => {
    const { productData } = this.props;
    const { listPrice, offerPrice, highListPrice } = productData;
    const listPriceValue = this.calculatePriceValue(listPrice);
    const highListPriceValue = this.calculatePriceValue(highListPrice, null);
    if (listPrice && offerPrice && listPrice > offerPrice) {
      return (
        <RowContainer>
          {this.renderListPriceLabels(listPriceValue)}
          {this.renderListPriceDash(highListPriceValue)}
          {this.renderListPriceLabels(highListPriceValue)}
          {this.renderPricePercentageDiscountLabel(badge2)}
        </RowContainer>
      );
    }
    return null;
  };

  render() {
    const { productData, selectedColorProductId, isGiftCard } = this.props;

    if (JSON.stringify(productData) !== '{}') {
      const colorFitsSizesMap = get(productData, 'colorFitsSizesMap', null);
      const curentColorEntry =
        colorFitsSizesMap &&
        getMapSliceForColorProductId(colorFitsSizesMap, selectedColorProductId);
      const currentColorMiscInfo = (curentColorEntry && curentColorEntry.miscInfo) || {};
      const { badge1, badge2 } = currentColorMiscInfo;
      let badge1Value;
      if (curentColorEntry) {
        badge1Value = badge1.matchBadge ? badge1.matchBadge : badge1.defaultBadge;
      }
      const { name } = productData;
      return (
        <Container>
          <LineComp marginTop={10} borderColor="gray.500" />
          {this.renderBazaarVoiceComponent()}
          {!isGiftCard ? <LineComp marginTop={0} borderColor="gray.500" /> : null}
          {this.renderTopBadge(badge1Value)}
          <BodyCopy
            dataLocator="pdp_product_titles"
            margin={badge1Value !== '' ? '0px' : '16px 0 0 0'}
            mobileFontFamily="secondary"
            fontSize="fs18"
            fontWeight="extrabold"
            color="gray.900"
            text={name}
            numberOfLines={2}
          />
          {this.renderOfferPrice()}
          {this.renderListPrice(badge2)}
          {this.renderPromotionalMessage()}
          <LineComp marginTop={12} borderColor="gray.500" />
        </Container>
      );
    }
    return null;
  }
}

ProductSummary.propTypes = {
  productData: PropTypes.shape({}).isRequired,
  selectedColorProductId: PropTypes.number.isRequired,
  isPlcc: PropTypes.bool,
  isGiftCard: PropTypes.bool,
  currencyExchange: PropTypes.arrayOf(PropTypes.shape({})),
  currencySymbol: PropTypes.string,
  showCompleteTheLook: PropTypes.bool,
  pdpLabels: PropTypes.shape({}),
  isBundleProduct: PropTypes.bool,
};

ProductSummary.defaultProps = {
  isPlcc: false,
  currencyExchange: 1,
  currencySymbol: '$',
  isGiftCard: false,
  showCompleteTheLook: false,
  pdpLabels: {},
  isBundleProduct: false,
};

export default withStyles(ProductSummary, styles);
export { ProductSummary as ProductSummaryVanilla };
