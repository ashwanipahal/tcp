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

  render() {
    const {
      productData,
      selectedColorProductId,
      isPlcc,
      currencySymbol,
      currencyExchange,
    } = this.props;
    if (JSON.stringify(productData) !== '{}') {
      const colorFitsSizesMap = get(productData, 'colorFitsSizesMap', null);
      const curentColorEntry = getMapSliceForColorProductId(
        colorFitsSizesMap,
        selectedColorProductId
      );
      const { miscInfo } = curentColorEntry;

      const { listPrice, offerPrice } = productData;
      // The PLP badge2 (EXTENDED SIZE etc) are not showing on the PDP as per the production behavior
      const { badge1, badge2 } = miscInfo;
      // get default top badge data
      const badge1Value = badge1.matchBadge ? badge1.matchBadge : badge1.defaultBadge;

      const { promotionalMessage, promotionalPLCCMessage, name } = productData;

      // calculate default list price
      const listPriceForColor = `${currencySymbol}${(
        listPrice * currencyExchange[0].exchangevalue
      ).toFixed(2)}`;
      // calculate default offer price
      const offerPriceForColor = `${currencySymbol}${(
        offerPrice * currencyExchange[0].exchangevalue
      ).toFixed(2)}`;

      // get default Loyalty message
      this.loyaltyPromotionMessage = getPromotionalMessage(isPlcc, {
        promotionalMessage,
        promotionalPLCCMessage,
      });

      return (
        <Container>
          <LineComp marginTop={10} borderColor="gray.500" />
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
          <LineComp marginTop={0} borderColor="gray.500" />
          {badge1Value !== '' && (
            <BodyCopy
              dataLocator="pdp_product_badges"
              margin="16px 0 0 0"
              mobileFontFamily="secondary"
              fontSize="fs10"
              fontWeight="regular"
              color="gray.900"
              text={badge1Value}
            />
          )}
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
            color="red.500"
            text={offerPriceForColor}
          />
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
            <BodyCopy
              dataLocator="pdp_discounted_percentage"
              margin="0 0 0 10px"
              mobileFontFamily="secondary"
              fontSize="fs14"
              fontWeight="regular"
              color="red.500"
              text={badge2}
            />
          </OfferPriceAndBadge3Container>
          {this.loyaltyPromotionMessage && (
            <PromotionalMessage
              fontSize="fs12"
              text={this.loyaltyPromotionMessage}
              isPlcc={isPlcc}
              marginTop={8}
              dataLocator="pdp_loyalty_text"
            />
          )}
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
  currencyExchange: PropTypes.arrayOf(PropTypes.shape({})),
  currencySymbol: PropTypes.string,
};

ProductSummary.defaultProps = {
  isPlcc: false,
  currencyExchange: [{ exchangevalue: 1 }],
  currencySymbol: '$',
};

export default withStyles(ProductSummary, styles);
export { ProductSummary as ProductSummaryVanilla };
