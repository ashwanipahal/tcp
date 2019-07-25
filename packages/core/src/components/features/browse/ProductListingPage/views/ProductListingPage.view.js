/* eslint-disable */
import React from 'react';
import ProductListingPageStyle from '../styles/ProductListingPage.style';
import Row from '@tcp/core/src/components/common/atoms/Row';
import { getImgPath } from '../../ProductListingPage/util/utility';
import { parseProductFromAPI } from '../../ProductListingPage/container/ProductListingPage.dataMassage';
import { getCartItemInfo } from '../../../CnC/AddedToBag/util/utility';
import AddedToBagContainer from '../../../CnC/AddedToBag';
import ProductTile from '../molecules/ProductTile.view';

export class ProductListView extends React.Component {
  constructor(props: Props) {
    super(props);
    this.addToBagEcom = this.addToBagEcom.bind(this);
    this.addToBagBossBopis = this.addToBagBossBopis.bind(this);
  }
  getPDPObject(item) {
    const pdpObj = parseProductFromAPI(item, item.uniqueId, false, getImgPath, false, false);
    const {
      product: { colorFitsSizesMap },
    } = pdpObj;
    const { color, fits, hasFits } = colorFitsSizesMap[0];
    const selectedColor = color.name;
    const selectedFit = hasFits ? fits[0].fitName : '';
    const selectedSize = fits[0].sizes[0].sizeName;

    const formData = {
      size: selectedSize,
      fit: selectedFit,
      color: selectedColor,
      wishlistItemId: false,
    };
    return { formData, product: pdpObj.product };
  }

  addToBagEcom(item, quantity, brand) {
    const { addToCartEcom } = this.props;
    let { product, formData } = this.getPDPObject(item);
    formData = {
      ...formData,
      quantity,
      brand,
    };
    const cartItemInfo = getCartItemInfo(product, formData);
    addToCartEcom(cartItemInfo);
  }

  addToBagBossBopis(item, isBoss, quantity, storeId, brand) {
    const { addItemToCartBopis } = this.props;
    let { product, formData } = this.getPDPObject(item);
    formData = {
      ...formData,
      quantity,
      isBoss,
      brand: isBoss ? brand : 'tcp',
      storeLocId: storeId,
    };
    const cartItemInfo = getCartItemInfo(product, formData);
    addItemToCartBopis(cartItemInfo);
  }

  render() {
    const { className, giftCardProducts } = this.props;
    let { data } = this.props;
    let allProducts = [];
    if (giftCardProducts.length && data.length) {
      allProducts = [...data, ...giftCardProducts];
    }
    return (
      <ProductListingPageStyle>
        <h1>PLP Page</h1>
        <Row tagName="ul" className={className}>
          {allProducts &&
            allProducts.map(item => (
              <ProductTile
                item={item}
                addToBagEcom={this.addToBagEcom}
                addToBagBossBopis={this.addToBagBossBopis}
              />
            ))}
        </Row>
        <AddedToBagContainer />
      </ProductListingPageStyle>
    );
  }
}
