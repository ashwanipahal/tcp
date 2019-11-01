import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import BodyCopy from '@tcp/core/src/components/common/atoms/BodyCopy';
import PromotionalMessage from '@tcp/core/src/components/common/atoms/PromotionalMessage';
import withStyles from '../../../../../../common/hoc/withStyles.native';
// import { getLabelValue } from '@tcp/core/src/utils/utils';
import {
  Container,
  BazarVoiceContainer,
  ReviewAndRatingContainer,
  OfferPriceAndBadge3Container,
  styles,
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

  onCompletLook = () => {};

  getBadgeAndListPrice = (offerPriceForColor, listPriceForColor, badge2) => {
    return (
      <OfferPriceAndBadge3Container>
        {listPriceForColor !== offerPriceForColor && (
          <BodyCopy
            dataLocator="pdp_discounted_product_price"
            textDecoration="line-through"
            mobileFontFamily="secondary"
            fontSize="fs14"
            fontWeight="regular"
            color="gray.800"
            text={listPriceForColor}
          />
        )}
        {badge2 ? (
          <BodyCopy
            dataLocator="pdp_discounted_percentage"
            margin="0 0 0 10px"
            mobileFontFamily="secondary"
            fontSize="fs14"
            fontWeight="regular"
            color="red.600"
            text={badge2}
          />
        ) : null}
      </OfferPriceAndBadge3Container>
    );
  };

  renderBazarVoiceComponent = () => {
    const { isGiftCard } = this.props;
    if (!isGiftCard) {
      return (
        <BazarVoiceContainer>
          <ReviewAndRatingContainer>
            <BodyCopy
              dataLocator="pdp_write_review_icon"
              mobileFontFamily="secondary"
              fontSize="fs22"
              fontWeight="regular"
              color="gray.500"
              text="* * * * *"
            />
            <BodyCopy
              margin="0 0 0 20px"
              dataLocator="pdp_write_review_icon"
              mobileFontFamily="secondary"
              fontSize="fs12"
              fontWeight="regular"
              color="gray.900"
              text="(0)"
            />
          </ReviewAndRatingContainer>
          <Anchor
            fontSizeVariation="medium"
            anchorVariation="custom"
            colorName="gray.900"
            underline
            href="#"
            locator="pdp_anchor_complete_the_look"
            className="details-link"
            onPress={this.onCompletLook}
            text="Complete The Look"
          />
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

  render() {
    const {
      productData,
      selectedColorProductId,
      currencySymbol,
      currencyExchange,
      listPrice,
      offerPrice,
      isGiftCard,
    } = this.props;

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
      const currency = currencySymbol === 'USD' ? '$' : currencySymbol;
      const listPriceForColor = `${currency}${(listPrice * currencyExchange).toFixed(2)}`;
      const offerPriceForColor = `${currency}${(offerPrice * currencyExchange).toFixed(2)}`;
      return (
        <Container>
          <LineComp marginTop={10} borderColor="gray.500" />
          {this.renderBazarVoiceComponent()}
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
          <BodyCopy
            dataLocator="pdp_current_product_price"
            margin="4px 0 0 0"
            mobileFontFamily="secondary"
            fontSize="fs22"
            fontWeight="black"
            color="red.600"
            text={offerPriceForColor}
          />
          {this.getBadgeAndListPrice(offerPriceForColor, listPriceForColor, badge2)}
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
  listPrice: PropTypes.number.isRequired,
  offerPrice: PropTypes.number.isRequired,
  currencyExchange: PropTypes.arrayOf(PropTypes.shape({})),
  currencySymbol: PropTypes.string,
};

ProductSummary.defaultProps = {
  isPlcc: false,
  currencyExchange: 1,
  currencySymbol: '$',
  isGiftCard: false,
};

export default withStyles(ProductSummary, styles);
export { ProductSummary as ProductSummaryVanilla };
