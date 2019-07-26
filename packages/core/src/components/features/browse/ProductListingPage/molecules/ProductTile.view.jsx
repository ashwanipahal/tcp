/* eslint-disable */
/* dummy plp page | TODO: eslint fixes*/

import React from 'react';
import { Button } from '@tcp/core/src/components/common/atoms';
import Col from '@tcp/core/src/components/common/atoms/Col';
import endpoints from '../../../../../service/endpoint';

class ProductTile extends React.Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      quantity: 1,
      storeId: 110715,
      brand: 'tcp',
    };
    this.selectChange = this.selectChange.bind(this);
  }

  selectChange(e, elem) {
    const val = e.target && e.target.value;
    if (val) {
      this.setState({
        [elem]: val,
      });
    }
  }

  render() {
    const { quantity, storeId, brand } = this.state;
    const { item, addToBagEcom, addToBagBossBopis } = this.props;

    const { colorFitsSizesMap, imagesByColor } = item;
    const { color, fits, hasFits } = colorFitsSizesMap[0];
    const selectedColor = color.name;
    const selectedFit = hasFits ? fits[0].fitName : '';
    const selectedSize = fits[0].sizes[0].sizeName;
    console.log('item', item);
    return (
      <Col
        tagName="li"
        key={item.productid}
        className="product-item"
        colSize={{ small: 6, medium: 8, large: 4 }}
      >
        <p className="product-name">{item.name}</p>
        <p className="product-name">{item.shortDescription}</p>
        <div class="product-image">
          <img src={endpoints.global.baseURI + imagesByColor[selectedColor].basicImageUrl} />
        </div>
        <p className="product-name">selectedColor :{selectedColor}</p>
        <p className="product-name">selectedFit :{selectedFit}</p>
        <p className="product-name">selectedSize :{selectedSize}</p>
        <p className="product-disc-price">${item.offerPrice}</p>
        <p className="product-original-price">{`Was $${item.listPrice}`}</p>
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
        <div className="product-quantity">
          Please select brand:
          <select onChange={e => this.selectChange(e, 'brand')}>
            <option value="tcp">TCP</option>
            <option value="gymboree">GYMBOREE</option>
          </select>
        </div>
        <br />
        <Button
          className="product-button"
          onClick={() =>
            addToBagEcom(item, quantity, brand, {
              size: selectedSize,
              fit: selectedFit,
              color: selectedColor,
              wishlistItemId: false,
            })
          }
          buttonVariation="fixed-width"
          fullWidth
        >
          Add to Bag
        </Button>
        <br />
        <div className="product-store">
          Please select a store
          <select onChange={e => this.selectChange(e, 'storeId')}>
            <option value="110715">Newport Center 110715</option>
            <option value="110961">Union Square 110961</option>
            <option value="111287">Bergenline Ave 111287</option>
            <option value="111723">Ferry St Newark 111723</option>
            <option value="111202">Newark 111202</option>
            <option value="111616">Franklin Square Sc 111616</option>
            <option value="110945">The Mills At Jersey Gardens 110945</option>
          </select>
        </div>
        <Button
          className="product-button"
          onClick={() =>
            addToBagBossBopis(item, true, quantity, storeId, brand, {
              size: selectedSize,
              fit: selectedFit,
              color: selectedColor,
              wishlistItemId: false,
            })
          }
          buttonVariation="fixed-width"
          fullWidth
        >
          Add to BOSS
        </Button>
        <br />
        <Button
          className="product-button"
          onClick={() =>
            addToBagBossBopis(item, false, quantity, storeId, brand, {
              size: selectedSize,
              fit: selectedFit,
              color: selectedColor,
              wishlistItemId: false,
            })
          }
          buttonVariation="fixed-width"
          fullWidth
        >
          Add to BOPIS
        </Button>
        <p className="product-name">productId: {item.productId}</p>
      </Col>
    );
  }
}

export default ProductTile;
