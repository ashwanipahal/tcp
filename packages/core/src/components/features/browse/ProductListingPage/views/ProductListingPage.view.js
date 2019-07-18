/* eslint-disable */
import React from 'react';
import ProductListingPageStyle from '../styles/ProductListingPage.style';
import Grid from '@tcp/core/src/components/common/molecules/Grid';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import { Button } from '@tcp/core/src/components/common/atoms';
import { render } from 'enzyme';
import AddedToBag from '../../../CnC/AddedToBag';
import { getImgPath } from '../../ProductListingPage/util/utility';
import { parseProductFromAPI } from '../../ProductListingPage/container/ProductListingPage.dataMassage';
import { getCartItemInfo } from '../../../CnC/AddedToBag/util/utility';

export class ProductListView extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      openQuickViewModal: false,
    };
    this.addToBagEcom = this.addToBagEcom.bind(this);
  }

  openQuickViewModal = item => {
    this.setState({
      openQuickViewModal: true,
    });
  };

  closeQuickViewModal = () => {
    console.log('closed');
    this.setState({
      openQuickViewModal: false,
    });
  };
  addToBagEcom(item) {
    //console.log(item);
    const { data, addToCartEcom } = this.props;
    const pdpObj = parseProductFromAPI(data, item.uniqueId, false, getImgPath, false, false);
    const {
      product: { colorFitsSizesMap },
    } = pdpObj;
    const { color, fits } = colorFitsSizesMap[0];
    const selectedColor = color.name;
    const selectedFit = fits[0].hasFits ? fits[0].fitName : '';
    const selectedSize = fits[0].sizes[0].sizeName;

    const formData = {
      size: selectedSize,
      fit: selectedFit,
      quantity: 1,
      color: selectedColor,
      wishlistItemId: false,
    };
    const cartItemInfo = getCartItemInfo(pdpObj.product, formData);
    let wishlistItemId =
      formData.wishlistItemId || (pdpObj.product.itemInfo && pdpObj.product.itemInfo.itemId);
    console.log(cartItemInfo);

    addToCartEcom({
      sku: cartItemInfo.skuInfo.skuId,
      qty: cartItemInfo.quantity,
      wishlistItemId,
    });

    //this.openQuickViewModal(item);
  }
  render() {
    const { data, className, addToCartEcom } = this.props;
    const { openQuickViewModal } = this.state;
    return (
      <ProductListingPageStyle>
        <h1>PLP Page</h1>
        <Row tagName="ul" className={className}>
          {data &&
            data.map(item => (
              <Col
                tagName="li"
                key={item.productid}
                className="product-item"
                colSize={{ small: 2, medium: 3, large: 4 }}
              >
                <p className="product-name">{item.product_name}</p>
                <p className="product-disc-price">{item.min_offer_price}</p>
                <p className="product-original-price">{`Was ${item.min_list_price}`}</p>
                <Button
                  onClick={() => this.addToBagEcom(item)}
                  buttonVariation="fixed-width"
                  fullWidth
                >
                  Add to Bag
                </Button>
              </Col>
            ))}
        </Row>
        <AddedToBag openState={openQuickViewModal} onRequestClose={this.closeQuickViewModal} />
      </ProductListingPageStyle>
    );
  }
}
