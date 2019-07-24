/* eslint-disable */
import React from 'react';
import ProductListingPageStyle from '../styles/ProductListingPage.style';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import { Button } from '@tcp/core/src/components/common/atoms';
import { getImgPath } from '../../ProductListingPage/util/utility';
import { parseProductFromAPI } from '../../ProductListingPage/container/ProductListingPage.dataMassage';
import { getCartItemInfo } from '../../../CnC/AddedToBag/util/utility';
import AddedToBagContainer from '../../../CnC/AddedToBag';

export class ProductListView extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      quantity: 1,
    };
    this.addToBagEcom = this.addToBagEcom.bind(this);
    this.selectChange = this.selectChange.bind(this);
    this.addToBagBoss = this.addToBagBoss.bind(this);
    this.addToBagBopis = this.addToBagBopis.bind(this);
  }

  addToBagEcom(item) {
    //console.log(item);
    const { addToCartEcom } = this.props;
    const { quantity } = this.state;
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
      quantity,
      color: selectedColor,
      wishlistItemId: false,
    };
    const cartItemInfo = getCartItemInfo(pdpObj.product, formData);
    addToCartEcom(cartItemInfo);
  }

  addToBagBoss() {}

  addToBagBopis() {}

  selectChange(e, elem) {
    const val = e.target && e.target.value;
    if (val) {
      this.setState({
        [elem]: val,
      });
    }
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
                colSize={{ small: 6, medium: 8, large: 4 }}
              >
                <p className="product-name">{item.product_name}</p>
                <p className="product-disc-price">{item.min_offer_price}</p>
                <p className="product-original-price">{`Was ${item.min_list_price}`}</p>
                <div className="product-quantity">
                  Please select a quantity
                  <select onChange={e => this.selectChange(e, 'quantity')}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                  </select>
                </div>
                <br />
                <Button
                  className="product-button"
                  onClick={() => this.addToBagEcom(item)}
                  buttonVariation="fixed-width"
                  fullWidth
                >
                  Add to Bag
                </Button>
                <br />
                <div className="product-store">
                  Please select a store
                  <select onChange={e => this.selectChange(e, 'store')}>
                    <option value="store 1">store 1</option>
                    <option value="store 2">store 2</option>
                    <option value="store 3">store 3</option>
                    <option value="store 4">store 4</option>
                  </select>
                </div>
                <Button
                  className="product-button"
                  onClick={() => this.addToBagBoss(item)}
                  buttonVariation="fixed-width"
                  fullWidth
                >
                  Add to BOSS
                </Button>
                <br />
                <Button
                  className="product-button"
                  onClick={() => this.addToBagBopis(item)}
                  buttonVariation="fixed-width"
                  fullWidth
                >
                  Add to BOPIS
                </Button>
              </Col>
            ))}
        </Row>
        <AddedToBagContainer />
      </ProductListingPageStyle>
    );
  }
}
