import React from 'react';
import { PropTypes } from 'prop-types';
import { BodyCopyWithSpacing } from '@tcp/core/src/components/common/atoms/styledWrapper';
import { PRODUCT_VALUES, EDIT, PICKUP_LABELS } from '../../../PickUpStoreModal.constants';
import { BOPIS_PRODUCT_INFO_PROP_TYPES } from '../../../PickUpStoreModal.proptypes';
import withStyles from '../../../../../hoc/withStyles';
import styles, {
  Container,
  OfferPriceAndBadge3Container,
  OfferPriceAndBadge2Container,
  InnerContainer,
  ModalButton,
} from '../styles/PickupProductFormPart.style.native';
import ImageComp from '../../../../../atoms/Image';
import Anchor from '../../../../../atoms/Anchor';

class PickupProductFormPart extends React.PureComponent {
  static propTypes = {
    /** the whole product detail to have it engaged on BOPIS form */
    ...BOPIS_PRODUCT_INFO_PROP_TYPES,
    /** This is used to display the correct currency symbol */
    currencySymbol: PropTypes.string.isRequired,
    isPickUpWarningModal: PropTypes.bool,
  };

  static defaultProps = {
    isPickUpWarningModal: false,
  };

  render() {
    const {
      name = `Girls Basic Super Skinny Jeans - Victory Blue Wash`,
      imagePath = 'https://test4.childrensplace.com/wcsstore/GlobalSAS/images/tcp/products/500/2084917_908.jpg',
      onEditSku,
      // eslint-disable-next-line no-unused-vars
      initialValues,
      isPickUpWarningModal,
      currencySymbol = '$',
      listPrice = 14.867,
      offerPrice = 13.868,
      // eslint-disable-next-line no-unused-vars
      colorFitSizeDisplayNames,
    } = this.props;

    const style = { width: 40 };

    return (
      <Container>
        <OfferPriceAndBadge2Container>
          <ImageComp url={imagePath} width={164} height={200} resizeMode="contain" />
          <InnerContainer>
            <BodyCopyWithSpacing
              dataLocator="pdp_product_titles"
              mobileFontFamily="secondary"
              fontSize="fs14"
              fontWeight="semibold"
              color="gray.900"
              text={name}
              spacingStyles="margin-bottom-XS"
            />
            <OfferPriceAndBadge3Container>
              <BodyCopyWithSpacing
                dataLocator="pdp_current_product_price"
                mobileFontFamily="secondary"
                fontSize="fs13"
                fontWeight="semibold"
                color="gray.900"
                text="Color:"
                style={style}
                spacingStyles="margin-top-XXS"
              />
              <BodyCopyWithSpacing
                dataLocator="pdp_current_product_price"
                mobileFontFamily="secondary"
                fontSize="fs13"
                fontWeight="regular"
                color="gray.800"
                text="Color"
                spacingStyles="margin-left-MED margin-top-XXS"
              />
            </OfferPriceAndBadge3Container>
            <OfferPriceAndBadge3Container>
              <BodyCopyWithSpacing
                dataLocator="pdp_current_product_price"
                mobileFontFamily="secondary"
                fontSize="fs13"
                fontWeight="semibold"
                color="gray.900"
                text="Size:"
                style={style}
                spacingStyles="margin-top-XXS"
              />
              <BodyCopyWithSpacing
                dataLocator="pdp_current_product_price"
                mobileFontFamily="secondary"
                fontSize="fs13"
                fontWeight="regular"
                color="gray.800"
                text="Size"
                spacingStyles="margin-left-MED margin-top-XXS"
              />
            </OfferPriceAndBadge3Container>
            <OfferPriceAndBadge3Container>
              <BodyCopyWithSpacing
                dataLocator="pdp_current_product_price"
                mobileFontFamily="secondary"
                fontSize="fs13"
                fontWeight="semibold"
                color="gray.900"
                text={`${PRODUCT_VALUES.quantity}:`}
                style={style}
                spacingStyles="margin-top-XXS"
              />
              <BodyCopyWithSpacing
                dataLocator="pdp_current_product_price"
                mobileFontFamily="secondary"
                fontSize="fs13"
                fontWeight="regular"
                color="gray.800"
                text="Qty"
                spacingStyles="margin-left-MED margin-top-XXS"
              />
            </OfferPriceAndBadge3Container>
            <OfferPriceAndBadge3Container>
              <BodyCopyWithSpacing
                dataLocator="pdp_current_product_price"
                mobileFontFamily="secondary"
                fontSize="fs13"
                fontWeight="semibold"
                color="gray.900"
                text={`${PICKUP_LABELS.PRICE_LABEL}:`}
                style={style}
                spacingStyles="margin-top-XXS"
              />
              <BodyCopyWithSpacing
                dataLocator="pdp_current_product_price"
                mobileFontFamily="secondary"
                fontSize="fs16"
                fontWeight="black"
                color="red.500"
                text={`${currencySymbol}${offerPrice.toFixed(2)}`}
                spacingStyles="margin-left-MED margin-top-XXS"
              />
              {listPrice !== offerPrice && (
                <BodyCopyWithSpacing
                  dataLocator="pdp_current_product_price"
                  textDecoration="line-through"
                  mobileFontFamily="secondary"
                  fontSize="fs13"
                  fontWeight="regular"
                  color="gray.800"
                  text={`${currencySymbol}${listPrice.toFixed(2)}`}
                  spacingStyles="margin-left-XXS margin-top-XS"
                />
              )}
            </OfferPriceAndBadge3Container>
            {!isPickUpWarningModal && (
              <ModalButton>
                <Anchor
                  fontSizeVariation="medium"
                  anchorVariation="custom"
                  colorName="gray.900"
                  underline
                  href="#"
                  locator="pdp_anchor_complete_the_look"
                  onPress={onEditSku}
                  text={EDIT}
                />
              </ModalButton>
            )}
          </InnerContainer>
        </OfferPriceAndBadge2Container>
      </Container>
    );
  }
}

PickupProductFormPart.propTypes = {
  /** This is used to display the correct currency symbol */
  currencySymbol: PropTypes.string.isRequired,

  listPrice: PropTypes.string.isRequired,

  offerPrice: PropTypes.string.isRequired,
};

export default withStyles(PickupProductFormPart, styles);
export { PickupProductFormPart as PickupProductFormPartVanilla };
