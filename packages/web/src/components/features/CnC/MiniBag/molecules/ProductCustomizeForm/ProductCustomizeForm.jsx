/* eslint-disable no-plusplus */
import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Row, Button } from '@tcp/core/src/components/common/atoms';
import withStyles from '@tcp/core/src/components/common/hoc/withStyles';
import MiniBagSelect from '@tcp/web/src/components/features/CnC/MiniBag/molecules/MiniBagSelectBox/MiniBagSelectBox';
import ColorSelector from '@tcp/web/src/components/features/CnC/MiniBag/molecules/ColorSelect/views/ColorSelect.view';
import endpoints from '@tcp/core/src/service/endpoint';
import style, { buttonCustomStyles } from './ProductCustomizeForm.style';

// @flow

type Props = {
  handleSubmit: (itemId, skuId, quantity, itemPartNumber, variantNo) => void,
  colorFitsSizesMap: any,
  initialValues: any,
  item: any,
  className: any,
  labels: any,
  formVisiblity: () => void,
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
    console.log('initialValues', initialValues);
    this.setState({
      selectedColor: initialValues.color,
      selectedFit: initialValues.fit,
      selectedSize: initialValues.size,
      selectedQuantity: initialValues.qty,
    });
  }

  getSelectedColorData = (colorFitsSizesMap, color) => {
    return (
      colorFitsSizesMap &&
      colorFitsSizesMap.filter(colorItem => {
        if (colorItem.getIn(['color', 'name']) === color.name) {
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
          title: (
            <span>
              <img
                alt=""
                className="selected-color-image"
                src={endpoints.global.baseURI + colorItem.getIn(['color', 'imagePath'])}
              />
              {colorItem.getIn(['color', 'name'])}
            </span>
          ),
          content: (
            <span>
              <img
                alt=""
                src={endpoints.global.baseURI + colorItem.getIn(['color', 'imagePath'])}
              />
              {colorItem.getIn(['color', 'name'])}
            </span>
          ),
          value: colorItem.getIn(['color', 'name']),
        });
        return '';
      });
    return colorOptions;
  };

  getFitOptions = colorItem => {
    const fitOptions = [];
    // eslint-disable-next-line no-unused-expressions
    colorItem &&
      colorItem.fits.map(fit => {
        fitOptions.push({
          displayName: fit.get('fitName'),
          id: fit.get('fitName'),
        });
        return '';
      });
    return fitOptions;
  };

  getSizeOptions = (colorItem, selectedFit?) => {
    const sizeOptions = [];
    // eslint-disable-next-line no-unused-expressions
    colorItem &&
      colorItem.get('fits').map(fit => {
        if (selectedFit) {
          if (fit.get('fitName') === selectedFit) {
            fit.get('sizes').map(size => {
              return sizeOptions.push({
                displayName: size.get('sizeName'),
                id: size.get('skuId'),
              });
            });
          }
        } else {
          // eslint-disable-next-line sonarjs/no-identical-functions
          return fit.get('sizes').map(size => {
            return sizeOptions.push({
              displayName: size.get('sizeName'),
              id: size.get('skuId'),
            });
          });
        }
        return '';
      });
    return sizeOptions;
  };

  colorChange = e => {
    this.setState({
      selectedColor: { name: e },
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
    const { colorFitsSizesMap, item, labels, formVisiblity } = this.props;
    const { selectedColor, selectedFit, selectedSize, selectedQuantity } = this.state;

    const colorList = this.getColorOptions(colorFitsSizesMap);
    const selectedColorElement = this.getSelectedColorData(colorFitsSizesMap, selectedColor);
    // eslint-disable-next-line prefer-destructuring
    const hasFits = selectedColorElement && selectedColorElement.getIn([0, 'hasFits']);
    const fitList = hasFits && this.getFitOptions(selectedColorElement[0]);
    const sizeList =
      selectedColorElement &&
      (hasFits
        ? this.getSizeOptions(selectedColorElement.get(0), selectedFit)
        : this.getSizeOptions(selectedColorElement.get(0)));

    const { className } = this.props;
    const { handleSubmit } = this.props;
    const { itemId } = item.itemInfo;
    const skuId = selectedSize;
    const quantity = selectedQuantity || '3';
    const { itemPartNumber } = item.productInfo;
    const { variantNo } = item.productInfo;

    return (
      <form className={className} noValidate>
        <Row className="edit-form-css">
          <div className="select-value-wrapper">
            <div className="color-selector">
              <Field
                width={112}
                id="color"
                name={selectedColor}
                component={ColorSelector}
                options={colorList}
                onChange={this.colorChange}
                dataLocator="addnewaddress-state"
              />
            </div>
            {hasFits && (
              <div className="fit-selector">
                <Field
                  width={112}
                  id="fit"
                  name="Fit"
                  component={MiniBagSelect}
                  options={fitList}
                  onChange={this.fitChange}
                  dataLocator="addnewaddress-state"
                />
              </div>
            )}
            <div className="size-selector">
              <Field
                width={39}
                id="size"
                name="Size"
                component={MiniBagSelect}
                options={sizeList}
                onChange={this.sizeChange}
                dataLocator="addnewaddress-state"
              />
            </div>
            <div className="qty-selector">
              <Field
                width={32}
                id="quantity"
                name="Qty"
                component={MiniBagSelect}
                options={this.getQuantityList()}
                onChange={this.quantityChange}
                dataLocator="addnewaddress-state"
              />
            </div>
          </div>
          <div className="button-wrapper">
            <Button
              inheritedStyles={buttonCustomStyles}
              type="submit"
              onClick={e => {
                e.preventDefault();
                handleSubmit(itemId, skuId, quantity, itemPartNumber, variantNo);
              }}
            >
              {/* <u>{labels.update}</u> */}
              <u>Update</u>
            </Button>
            <Button
              inheritedStyles={buttonCustomStyles}
              onClick={() => {
                formVisiblity();
              }}
            >
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
