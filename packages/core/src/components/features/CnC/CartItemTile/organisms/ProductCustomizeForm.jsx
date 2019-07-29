/* eslint-disable no-plusplus */
import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Row from '@tcp/core/src/components/common/atoms/Row';
import Col from '@tcp/core/src/components/common/atoms/Col';
import Button from '@tcp/core/src/components/common/atoms/Button';
import SelectBox from '../../../../common/atoms/Select';

// @flow

type Props = {
  handleSubmit: (itemId, skuId, quantity, itemPartNumber, variantNo) => void,
  colorFitsSizesMap: any,
  initialValues: any,
  item: any,
};

export class ProductCustomizeForm extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedColor: '',
      selectedFit: '',
      selectedSize: '',
      selectedQuantity: '',
    };
  }

  componentDidMount() {
    const { initialValues } = this.props;
    this.setState({
      selectedColor: initialValues.color,
      selectedFit: initialValues.fit,
      selectedSize: initialValues.size,
    });
  }

  getSelectedColorData = (colorFitsSizesMap, color) => {
    return (
      colorFitsSizesMap &&
      colorFitsSizesMap.filter(colorItem => {
        if (colorItem.color.name === color.name) {
          return colorItem;
        }
        return '';
      })
    );
  };

  getColorOptions = colorFitsSizesMap => {
    const colorOptions = [];
    // eslint-disable-next-line no-unused-expressions
    colorFitsSizesMap &&
      colorFitsSizesMap.map(colorItem => {
        colorOptions.push({
          displayName: colorItem.color.name,
          id: colorItem.color.name,
        });
        return '';
      });
    return colorOptions;
  };

  getFitOptions = colorItem => {
    const fitOptions = [];
    colorItem.fits.map(fit => {
      fitOptions.push({
        displayName: fit.fitName,
        id: fit.fitName,
      });
      return '';
    });
    return fitOptions;
  };

  getSizeOptions = (colorItem, selectedFit?) => {
    const sizeOptions = [];
    // eslint-disable-next-line no-unused-expressions
    colorItem &&
      colorItem.fits &&
      colorItem.fits.map(fit => {
        if (selectedFit) {
          if (fit.fitName === selectedFit) {
            fit.sizes.map(size => {
              return sizeOptions.push({
                displayName: size.sizeName,
                id: size.skuId,
              });
            });
          }
        } else {
          // eslint-disable-next-line sonarjs/no-identical-functions
          return fit.sizes.map(size => {
            return sizeOptions.push({
              displayName: size.sizeName,
              id: size.skuId,
            });
          });
        }
        return '';
      });
    return sizeOptions;
  };

  colorChange = e => {
    this.setState({
      selectedColor: { name: e.target.value },
    });
  };

  fitChange = e => {
    this.setState({
      selectedFit: e.target.value,
    });
  };

  sizeChange = e => {
    this.setState({
      selectedSize: e.target.value,
    });
  };

  quantityChange = e => {
    this.setState({
      selectedQuantity: e.target.value,
    });
  };

  getQuantityList = () => {
    const quantityArray = [];
    for (let i = 0; i < 15; i++) {
      let num = i;
      quantityArray.push({
        displayName: ++num,
        id: ++num,
      });
    }
    return quantityArray;
  };

  render() {
    const { colorFitsSizesMap, item } = this.props;
    const { selectedColor, selectedFit, selectedSize, selectedQuantity } = this.state;

    const colorList = this.getColorOptions(colorFitsSizesMap);
    const selectedColorElement = this.getSelectedColorData(colorFitsSizesMap, selectedColor);
    const hasFits =
      selectedColorElement && selectedColorElement[0] && selectedColorElement[0].hasFits;
    const fitList = hasFits && this.getFitOptions(selectedColorElement[0]);
    const sizeList =
      selectedColorElement &&
      (hasFits
        ? this.getSizeOptions(selectedColorElement[0], selectedFit)
        : this.getSizeOptions(selectedColorElement[0]));

    const className = 'CartItemEditableForm';
    const { handleSubmit } = this.props;
    const { itemId } = item.itemInfo;
    const skuId = selectedSize;
    const quantity = selectedQuantity || '3';
    const { itemPartNumber } = item.productInfo;
    const { variantNo } = item.productInfo;

    return (
      <form
        className={className}
        onSubmit={e => {
          e.preventDefault();
          handleSubmit(itemId, skuId, quantity, itemPartNumber, variantNo);
        }}
        noValidate
      >
        <Row fullBleed>
          <Col ignoreGutter={{ small: true }} colSize={{ small: 6, medium: 4, large: 2 }}>
            <Field
              id="color"
              name="Color"
              placeholder="Color"
              component={SelectBox}
              options={colorList}
              onChange={this.colorChange}
              dataLocator="addnewaddress-state"
            />
          </Col>
          {hasFits && (
            <Col colSize={{ small: 6, medium: 4, large: 2 }}>
              <Field
                id="fit"
                name="Fit"
                placeholder="Fit"
                component={SelectBox}
                options={fitList}
                onChange={this.fitChange}
                dataLocator="addnewaddress-state"
              />
            </Col>
          )}
          <Col colSize={{ small: 6, medium: 4, large: 2 }}>
            <Field
              id="size"
              placeholder="Size"
              name="Size"
              component={SelectBox}
              options={sizeList}
              onChange={this.sizeChange}
              dataLocator="addnewaddress-state"
            />
          </Col>
          <Col colSize={{ small: 6, medium: 4, large: 2 }}>
            <Field
              id="quantity"
              placeholder="Quantity"
              name="quantity"
              component={SelectBox}
              options={this.getQuantityList()}
              onChange={this.quantityChange}
              dataLocator="addnewaddress-state"
            />
          </Col>
          <Col colSize={{ small: 6, medium: 4, large: 2 }}>
            <Button type="submit">Update</Button>
            <Button>Cancel</Button>
          </Col>
        </Row>
      </form>
    );
  }
}
export default connect()(
  reduxForm({
    form: 'ProductCustomizeForm',
    enableReinitialize: true,

    // a unique identifier for this form
  })(ProductCustomizeForm)
);
