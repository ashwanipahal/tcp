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

  addToBagEcom(product, quantity, brand, formData) {
    const { addToCartEcom } = this.props;
    formData = {
      ...formData,
      quantity,
      brand,
    };
    const cartItemInfo = getCartItemInfo(product, formData);
    addToCartEcom(cartItemInfo);
  }

  addToBagBossBopis(product, isBoss, quantity, storeId, brand, formData) {
    const { addItemToCartBopis } = this.props;
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
            allProducts.map((item, index) => {
              const pdpObj = parseProductFromAPI(
                item,
                item.uniqueId,
                false,
                getImgPath,
                false,
                false
              );
              return (
                <ProductTile
                  item={pdpObj.product}
                  addToBagEcom={this.addToBagEcom}
                  addToBagBossBopis={this.addToBagBossBopis}
                  index={index}
                />
              );
            })}
        </Row>
        <AddedToBagContainer />
      </ProductListingPageStyle>
    );
  }
}
