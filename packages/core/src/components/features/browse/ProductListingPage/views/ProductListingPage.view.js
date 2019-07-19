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
import AddedToBagContainer from '../../../CnC/AddedToBag';

export class ProductListView extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {

    };
    this.addToBagEcom = this.addToBagEcom.bind(this);
  }

  addToBagEcom(item) {
    //console.log(item);
    const { addToCartEcom } = this.props;
    const pdpObj = parseProductFromAPI(item, item.uniqueId, false, getImgPath, false, false);
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
    addToCartEcom()
    const cartItemInfo = getCartItemInfo(pdpObj.product, formData);
    addToCartEcom(cartItemInfo);
    //this.openQuickViewModal(item);
  }
  render() {
    const { data, className, addToCartEcom } = this.props;
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
        <AddedToBagContainer />
      </ProductListingPageStyle>
    );
  }
}
