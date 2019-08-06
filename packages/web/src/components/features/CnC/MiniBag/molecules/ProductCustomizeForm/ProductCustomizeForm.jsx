/* eslint-disable no-plusplus */
import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Row, Button } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import MiniBagSelect from '@tcp/web/src/components/features/CnC/MiniBag/molecules/MiniBagSelectBox/MiniBagSelectBox';
import ColorSelector from '@tcp/web/src/components/features/CnC/MiniBag/molecules/ColorSelect/views/ColorSelect.view';
import style, { buttonCustomStyles } from './ProductCustomizeForm.style';

// @flow

type Props = {
  handleSubmit: (itemId, skuId, quantity, itemPartNumber, variantNo) => void,
  colorFitsSizesMap: any,
  initialValues: any,
  item: any,
  className: any,
  labels: any,
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

  getSelectedColorData = () => {
    const colorFitsSizesMap = [{ name: '123', id: '123' }];
    const colorOptions = [];
    // eslint-disable-next-line no-unused-expressions

    colorFitsSizesMap.map(colorItem => {
      colorOptions.push({
        displayName: colorItem.name,
        id: colorItem.name,
      });
      return '';
    });
    return colorOptions;
  };

  getColorOptions = () => {
    const colorFitsSizesMap = [
      { name: 'Blue', id: 'blue' },
      { name: 'Red', id: 'red' },
      { name: 'OrangeOrangeOrangeOrange', id: 'orange' },
    ];
    const colorOptions = [];
    // eslint-disable-next-line no-unused-expressions

    colorFitsSizesMap.map(colorItem => {
      colorOptions.push({
        value: colorItem.id,
        title: (
          <span>
            <img
              alt=""
              className="selected-color-image"
              src="https://dummyimage.com/600x400/000/fff"
            />
            {colorItem.name}
          </span>
        ),
        content: (
          <span>
            <img alt="" src="https://dummyimage.com/600x400/000/fff" />
            {colorItem.name}
          </span>
        ),
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
    const { colorFitsSizesMap, item, labels } = this.props;
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

    const { className } = this.props;
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
        <Row className="edit-form-css">
          <div className="select-value-wrapper">
            <div>
              <Field
                width={112}
                id="color"
                name="Color"
                placeholder="Color"
                component={ColorSelector}
                options={colorList}
                onChange={this.colorChange}
                dataLocator="addnewaddress-state"
              />
            </div>
            {hasFits && (
              <div>
                <Field
                  width={69}
                  id="fit"
                  name="Fit"
                  placeholder="Fit"
                  component={MiniBagSelect}
                  options={fitList}
                  onChange={this.fitChange}
                  dataLocator="addnewaddress-state"
                />
              </div>
            )}
            <div>
              <Field
                width={39}
                id="size"
                placeholder="Size"
                name="Size"
                component={MiniBagSelect}
                options={sizeList}
                onChange={this.sizeChange}
                dataLocator="addnewaddress-state"
              />
            </div>
            <div>
              <Field
                width={32}
                id="quantity"
                placeholder="Qty"
                name="quantity"
                component={MiniBagSelect}
                options={this.getQuantityList()}
                onChange={this.quantityChange}
                dataLocator="addnewaddress-state"
              />
            </div>
          </div>
          <div className="button-wrapper">
            <Button inheritedStyles={buttonCustomStyles} type="submit">
              <u>{labels.update}</u>
            </Button>
            <Button inheritedStyles={buttonCustomStyles} fill="RED">
              <u>{labels.cancel}</u>
            </Button>
          </div>
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
  })(withStyles(ProductCustomizeForm, style))
);
